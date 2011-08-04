var Animation = (function() {
  
  var Queues = {
    Attack : "attack"
   ,BattleWalk : "walkInBattle"
   ,CastSpell : "castSpell"
   ,CharFlicker : "charFlicker"
   ,ResultMessages : "resultMessages"
   ,ResultMessagesPostSplash : "resultMessagesPostSplash"
   ,SlideChar : "slideChar"
   ,SpellEffect : "spellEffect"
   ,ShowSplash : "showSplash"
   ,SwingWeapon : "swingWeapon"
   ,WindowShake : "windowShake"
  };
  
  var betweenMessagePause = 300;
  var CHAR_AT_REST_CLASSES = ["critical"];
  var SPLASH_ORDINALS = ["one", "two", "three"];
  
  /* ======================================================== */
  /* QUEUE object ------------------------------------------- */ 
  /* ======================================================== */
  var Queue = function(name) {
    this.theQueue = $({});
    this.name = name;
  };
  
  Queue.prototype.add = function(f) {
    if (f && typeof f === "function") {
      this.theQueue.queue(this.name, function(next) { 
        f();
        next(); 
      });
    }
  };
  
  Queue.prototype.delay = function(delayTime) { this.theQueue.delay(delayTime, this.name); };
  Queue.prototype.start = function() { this.theQueue.dequeue(this.name); };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var moveBattleWindow = function($battle, opt, left, top) {
    $battle.animate({
      marginLeft : "-=" + (left * opt.numPixels) + "px"
     ,marginTop : "-=" + (top * opt.numPixels) + "px"
    }, opt.speed);
  };
  
  var walkAndMoveBackwards = function(char, callback) {
    return function() {
      walkInBattle(char, {autoStart:true});
      slideChar(char, {autoStart:true, direction:"backward", callback:callback});
    };
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var attack = function(char, callback) {
    var swinging = function() {
      swingWeapon(char, {autoStart:true, callback:walkAndMoveBackwards(char, callback)});
    };
    
    walkInBattle(char, {autoStart:true});
    slideChar(char, {autoStart:true, callback:swinging});
  };
  
  var castSpell = function(char, spell) {
    var casting = function() {
      spellEffect(char, spell, {autoStart:true, callback:walkAndMoveBackwards(char)});
    };
    
    walkInBattle(char, {autoStart:true});
    slideChar(char, {autoStart:true, callback:casting});
  };
    
  var charFlicker = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, flickerPause:60, initialPause:200, autoStart:false, callback:null, $char:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var q = new Queue(Queues.CharFlicker);
    
    q.delay(settings.initialPause);
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.animate({opacity:0}, 0); });
      q.delay(settings.flickerPause);
      q.add(function() { $char.animate({opacity:1}, 0); });
      q.delay(settings.flickerPause);
    }
    q.delay(settings.initialPause);
    
    q.add(settings.callback);
    
    if (settings.autoStart) {
      q.start();
    }
    
    return q;
  };
  
  var resultFromAttack = function(command, result) {
    var q = new Queue(Queues.ResultMessages);
    var isParty = (command.type == BattleCommands.Party);
    
    if (result.source) { 
      q.add(function() { Message.source(result.source.getName()); }); 
    }
    if (result.target) { 
      q.delay(betweenMessagePause);
      q.add(function() { Message.target(result.target.getName()); }); 
    }

    // Need to build this first since we need it as a callback (same for chars and enemies)
    var postAttackAnimationQueue = resultFromAttackDamage(command, result);
    var postAttackAnimationCallback = function() { postAttackAnimationQueue.start(); };
    
    if (isParty) {
      // Char doing the attacking
      // TODO: Ensure splash works for BB/MA punch (equipped weapon may be null)
      var splashCallback = function() {
        var $enemy = Battle.getEnemyUI(command.target, command.targetIndex);
        var weaponSplash = command.source.equippedWeapon.splash; 
        splash($enemy, weaponSplash, {autoStart:true, callback:postAttackAnimationCallback});
      };
      
      q.add(function() { attack(command.source, splashCallback); });
    } else {
      // Enemy doing the attacking
      var charFlickerCallback = function() {
        charFlicker(command.target, {autoStart:true, callback:postAttackAnimationCallback}); 
      };
      q.add(function() { windowShake({autoStart:true, callback:charFlickerCallback}); });
    }
    
    q.start();
  };
  
  var resultFromAttackDamage = function(command, result) {
    var q = new Queue(Queues.ResultMessagesPostSplash);
    var isParty = (command.type == BattleCommands.Party);

    if (result.hits && result.hits > 1) { 
      q.add(function() { Message.action(result.hits + "Hits!"); }); 
    }
    if (result.dmg != null) {
      if (result.dmg == 0) {
        q.add(function() { Message.damage("Missed!"); });
      } else {
        q.delay(betweenMessagePause);
        q.add(function() { Message.damage(result.dmg + "DMG"); });
      }
    }
    
    if (result.crit) {
      q.delay(betweenMessagePause);
      q.add(function() { Message.desc("Critical hit!!"); });
    }
    
    if (result.status) {
      q.delay(result.critical ? Message.getPostActionPause() : betweenMessagePause);
      q.add(function() { Message.desc(result.status.desc); });
    }
    
    if (result.died) {
      q.delay(result.crit || result.status ? Message.getPostActionPause() : betweenMessagePause);
      if (isParty) {
        q.add(function() { Message.desc("Terminated"); });
        q.add(function() { Battle.killEnemyUI(command.target, command.targetIndex); });
      } else {
        q.add(function() { Message.desc("Slain.."); });
        q.add(function() { Battle.killEnemyUI(command.target, command.targetIndex); });
      }
    }
    
    if (!isParty) {
      q.add(function() { Battle.resetCharUI(command.target); });
    }

    q.delay(Message.getPostActionPause());
    q.add(function() { Message.hideAllBattleMessages(); });
    
    return q;
  };
  
  var splash = function($enemy, splashColors, opt) {
    var settings = jQuery.extend({}, {pause:100, autoStart:false, callback:null}, opt);
    if (!settings.numAnimations) {
      var $parent = $enemy.parent();
      
      if ($parent.is(".small")) { settings.numAnimations = RNG.randomUpTo(5, 3); } 
      else if ($parent.is(".large")) { settings.numAnimations = RNG.randomUpTo(6, 4); } 
      else if ($parent.is(".fiend,.chaos")) { settings.numAnimations = RNG.randomUpTo(7, 5); } 
    }
    var q = new Queue(Queues.ShowSplash);
    
    for (var n = 0; n < settings.numAnimations; n++) {
      q.add(function() { 
        $("#battle .enemies .splash").each(function() {
          var $splash = $(this);
          var randomSplashIndex = RNG.randomArrayElement(SPLASH_ORDINALS);
          $splash.removeClass().addClass("splash hidden").addClass(randomSplashIndex).addClass(splashColors);
          
          var splashX = RNG.randomUpTo($enemy.width() - 20, 0);
          var splashY = RNG.randomUpTo(Math.floor($enemy.height() - ($enemy.height() * 0.33)), 0);
          var enemyPos = $enemy.position();
          
          $splash.css({
            left : enemyPos.left + splashX
           ,top : enemyPos.top + splashY
          });
          
          $splash.removeClass("hidden");
        });
      });
      q.delay(settings.pause);
      q.add(function() { $("#battle .enemies .splash").addClass("hidden"); });
    }
    
    q.add(settings.callback);
    
    if (settings.autoStart) {
      q.start();
    }
    
    return q;
  };
  
  var spellEffect = function(char, spell, opt) {
    var settings = jQuery.extend({}, {numAnimations:4, pause:100, autoStart:false, callback:null, $char:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var $spell = Battle.createSpellUI(spell);
    var q = new Queue(Queues.SpellEffect);
    
    q.add(function() { $char.append($spell); $char.addClass("casting arms up"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.delay(settings.pause);
      q.add(function() { $spell.toggleClass("animate"); });
    }
    
    q.add(function() { $(".spell", $char).remove(); $char.removeClass("casting arms up"); });
    q.add(settings.callback);
    
    if (settings.autoStart) {
      q.start();
    }
    
    return q;
  };
  
  var slideChar = function(char, opt) {
    var settings = jQuery.extend({}, {speed:350, direction:"forward", autoStart:false, callback:null}, opt);
    var $char = Battle.getCharUI(char);
    var q = new Queue(Queues.SlideChar);
    
    q.add(function() {
      switch (settings.direction) {
        case "forward":
          $char.addClass("advance", settings.speed, settings.callback);
          break;
        case "backward":
          $char.removeClass("advance", settings.speed, settings.callback);
          break;
      };
    });
    
    if (settings.autoStart) {
      q.start();
    }
    
    return q;
  };
  
  var swingWeapon = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:60, autoStart:false, $char:null, callback:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var q = new Queue(Queues.SwingWeapon);

    q.add(function() { $char.addClass("attack swing"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.removeClass("forward").addClass("back"); });
      q.delay(settings.pause);
      q.add(function() { $char.removeClass("back").addClass("forward"); });
      q.delay(settings.pause);
    }

    q.add(function() { $char.removeClass("attack swing forward back"); });
    q.add(settings.callback);
    
    if (settings.autoStart) {
      q.start();
    }
    return q;
  };
  
  var walkInBattle = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:70, autoStart:false}, opt);
    var $char = Battle.getCharUI(char);
    var q = new Queue(Queues.BattleWalk);
    
    q.add(function() { $char.removeClass(CHAR_AT_REST_CLASSES.join(" ")); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.addClass("swing forward"); });
      q.delay(settings.pause);
      q.add(function() { $char.removeClass("swing forward"); });
      q.delay(settings.pause);
    }
    
    if (settings.autoStart) {
      q.start();
    }
    return q;
  };
  
  var walkAndMoveInBattle = function(char, opt) {
    opt = opt || {};
    opt.autoStart = true;
    walkInBattle(char, opt);
    slideChar(char, opt);
  };
  
  var windowShake = function(opt) {
    var settings = jQuery.extend({}, {numPixels:3, speed:30, pause:50, autoStart:false, callback:null}, opt);
    var $battle = $("#battle");
    var q = new Queue(Queues.WindowShake);
    
    q.add(function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, 0), 1); });
    q.delay(settings.pause);
    q.add(function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, -1), RNG.randomUpTo(1, 0)); });
    q.delay(settings.pause);
    q.add(function() { $battle.animate({marginLeft:0, marginTop:0}, 0); });
    q.add(settings.callback);
    
    if (settings.autoStart) {
      q.start();
    }
    
    return q;
  };
  
  return {
    attack : attack
   ,castSpell : castSpell
   ,charFlicker : charFlicker
   ,resultFromAttack : resultFromAttack
   ,slideChar : slideChar
   ,spellEffect : spellEffect
   ,splash : splash
   ,swingWeapon : swingWeapon
   ,walkInBattle : walkInBattle
   ,walkAndMoveInBattle : walkAndMoveInBattle
   ,windowShake : windowShake
    
   ,Queues : Queues
  };
})();