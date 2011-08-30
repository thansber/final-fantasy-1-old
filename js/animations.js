var Animation = (function() {
  
  var Queues = {
    Attack : "attack"
   ,BattleWalk : "walkInBattle"
   ,CastSpell : "castSpell"
   ,CharFlicker : "charFlicker"
   ,HideAllMessages : "hideAllMessages"
   ,ResultMessages : "resultMessages"
   ,ResultMessagesPostSplash : "resultMessagesPostSplash"
   ,ResultSpellTarget : "resultSpellTarget"
   ,SlideChar : "slideChar"
   ,SpellBackground : "spellBackground"
   ,SpellEffect : "spellEffect"
   ,ShowSplash : "showSplash"
   ,SwingWeapon : "swingWeapon"
   ,WindowShake : "windowShake"
  };
  
  var CHAR_AT_REST_CLASSES = ["critical"];
  var SPLASH_ORDINALS = ["one", "two", "three"];
  var ENEMY_DIED_MSG = "Terminated";
  var CHAR_DIED_MSG = "Slain..";
  var DAMAGE_MSG = "DMG";
  var CRITICAL_HIT_MSG = "Critical hit!!";
  var NUM_HITS_MSG = "Hits!";
  var MISSED_MSG = "Missed!";
  var INEFFECTIVE_MSG = "Ineffective";
  
  var quickPause = 100;
  
  /* ======================================================== */
  /* QUEUE object ------------------------------------------- */ 
  /* ======================================================== */
  var Queue = function(name) {
    this.theQueue = $({});
    this.name = name + (+new Date());
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
  
  Queue.prototype.insertAt = function(f, index) {
    this.theQueue.queue(this.name).splice(index, 0, function(next) {
      f();
      next();
    });
  };
  
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
  
  var spellBackgroundFlicker = function(spell, opt) {
    var settings = jQuery.extend({}, {numAnimations:4, flickerPause:50, autoStart:false}, opt);
    var $background = $("#battle .main .border, .stats .border");
    var q = new Queue(Queues.SpellBackground);
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $background.css("backgroundColor", Spell.lookup(spell.spellId).backgroundColor); });
      q.delay(settings.flickerPause);
      q.add(function() { $background.css("backgroundColor", "black"); });
      q.delay(settings.flickerPause);
    }
    
    if (settings.autoStart) {
      q.start();
    }
  };
  
  var spellMessages = function(q, spell) {
    if (spell.message) { 
      var afterFirstMessage = false;
      var spellMessages = jQuery.isArray(spell.message) ? spell.message : [spell.message];
      for (var m in spellMessages) {
        if (afterFirstMessage) {
          q.delay(Message.getBattlePause());
        }
        q.add(function(message) { 
          return function() { 
            Message.desc(message); 
          }; 
        }(spellMessages[m]));
        afterFirstMessage = true;
      }
    }
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
  
  var castSpell = function(char, spell, callback) {
    var casting = function() {
      spellEffect(char, spell, {autoStart:true, callback:walkAndMoveBackwards(char, callback)});
      spellBackgroundFlicker(spell, {autoStart:true});
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
      q.delay(quickPause);
      q.add(function() { Message.target(result.target.getName()); }); 
    }

    // Need to build this first since we need it as a callback (same for chars and enemies)
    var postAttackAnimationQueue = resultFromAttackDamage(command, result);
    var postAttackAnimationCallback = function() { postAttackAnimationQueue.start(); };
    
    if (isParty) {
      // Char doing the attacking
      var splashCallback = function() {
        var $enemy = Battle.getEnemyUI(command.target, command.targetIndex);
        // unequipped chars using their fists get a gold splash effect
        var weaponSplash = (command.source.equippedWeapon ? command.source.equippedWeapon.splash : "gold"); 
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
    var messageHider = new Queue(Queues.HideAllMessages);
    var isParty = (command.type == BattleCommands.Party);

    if (result.hits && result.hits > 1) { 
      q.add(function() { Message.action(result.hits + Animation.NUM_HITS_MSG); });
    }
    
    if (result.dmg != null) {
      if (result.dmg == 0) {
        q.add(function() { Message.damage(Animation.MISSED_MSG); });
      } else {
        q.delay(quickPause);
        q.add(function() { Message.damage(result.dmg + Animation.DAMAGE_MSG); });
      }
    }
    
    if (result.crit) {
      q.delay(quickPause);
      q.add(function() { Message.desc(Animation.CRITICAL_HIT_MSG); });
    }
    
    if (result.status) {
      q.delay(result.crit ? Message.getBattlePause() : quickPause);
      q.add(function() { Message.desc(result.status.desc); });
    }
    
    if (result.died) {
      q.delay(result.crit || result.status ? Message.getBattlePause() : quickPause);
      if (isParty) {
        q.add(function() { Message.desc(Animation.ENEMY_DIED_MSG); });
        q.add(function() { Battle.killEnemyUI(command.target, command.targetIndex); });
      } else {
        q.add(function() { Message.desc(Animation.CHAR_DIED_MSG); });
        q.delay(quickPause);
      }
    }
    
    if (!isParty) {
      q.add(function() { Battle.resetCharUI(command.target); });
    }

    q.delay(Message.getBattlePause());
    
    if (result.crit || result.status || result.died) {
      messageHider.add(function() { Message.desc({show:false}); });
      messageHider.delay(quickPause);
    }
    
    if (result.dmg != null) {
      messageHider.add(function() { Message.damage({show:false}); });
      messageHider.delay(quickPause);
    }

    messageHider.add(function() { Message.target({show:false}); });
    messageHider.delay(quickPause);
    
    if (result.hits && result.hits > 1) { 
      messageHider.add(function() { Message.action({show:false}); });
      messageHider.delay(quickPause);
    }

    messageHider.add(function() { Message.source({show:false}); });
    
    q.add(function() { messageHider.start(); });
    
    return q;
  };
  
  var resultFromSpell = function(command, result) {
    var q = new Queue(Queues.ResultMessages);
    var isParty = (command.type == BattleCommands.Party);
    
    if (result.source) { 
      q.add(function() { Message.source(result.source.getName()); }); 
    }
    
    if (result.spell) {
      q.delay(quickPause);
      q.add(function() { Message.action(result.spell.spellId); });
    }

    var spellResultQueue = resultFromSpellTarget(command, result);
    var spellResultCallback = function() { spellResultQueue.start(); };

    if (isParty) {
      q.add(function() { castSpell(command.source, result.spell, spellResultCallback); });
    } else {
      q.add(spellResultCallback);
    }
    
    q.start();
  };
  
  var resultFromSpellTarget = function(command, result) {
    var spell = Spell.lookup(command.spellId);
    var targetQueues = [];
    
    switch (command.targetType) {
      case BattleCommands.Party:
        for (var i = 0; i < result.target.length; i++) {
          targetQueues.push(resultFromSpellPartyTarget(result, i, spell, result.target[i]));
        }
        break;
      case BattleCommands.Enemy:
        for (var i = 0; i < result.target.length; i++) {
          var target = result.target[i];
          var $target = (result.target.length == 1 ? Battle.getEnemyUI(target, command.targetIndex) : Battle.getEnemyUIByIndex(i));
          if (!($target.is(".dead"))) {
            targetQueues.push(resultFromSpellEnemyTarget(result, i, spell, target, $target));
          }
        }
        break;
    };
    
    // Hide the source/spell at the very end
    var lastQueue = targetQueues[targetQueues.length - 1];
    lastQueue.add(function() { Message.action({show:false}); });
    lastQueue.delay(quickPause);
    lastQueue.add(function() { Message.source({show:false}); });
    
    // Chain all the target queues so they run serially and run after the previous one finishes
    if (targetQueues.length > 1) {
      for (var i = 0; i < targetQueues.length - 1; i++) {
        targetQueues[i].add(
          function(nextQueue) { 
            return function() { nextQueue.start(); };
          }(targetQueues[i + 1]));
      }
    }
    
    return targetQueues[0];
  };
  
  var resultFromSpellEnemyTarget = function(result, resultIndex, spell, target, $target) {
    var dmgShown = false, descShown = false;
    var q = splash($target, spell.splash, {overlay:spell.overlay});

    q.insertAt(function() { Message.target(target.getName()); }, 0);
    
    var resultDamage = result.dmg[resultIndex];
    if (resultDamage != null) {
      q.delay(quickPause);
      q.add(function() { Message.damage(resultDamage + Animation.DAMAGE_MSG); });
      dmgShown = true;
    }
    
    if (result.success.length > 0) {
      q.delay(quickPause);
      if (!!result.success[resultIndex]) {
        spellMessages(q, spell);
      } else {
        q.add(function() { Message.desc(Animation.INEFFECTIVE_MSG); });
      }
      descShown = true;
    }
    
    if (!!result.died[resultIndex]) {
      q.delay(!!result.success[resultIndex] ? Message.getBattlePause() : quickPause);
      q.add(function() { Message.desc(Animation.ENEMY_DIED_MSG); });
      q.add(function() { Battle.killEnemyUI($target); });
      descShown = true;
    }
    q.delay(Message.getBattlePause());
    
    if (descShown) {
      q.add(function() { Message.desc({show:false}); });
      q.delay(quickPause);
    }
    
    if (dmgShown) {
      q.add(function() { Message.damage({show:false}); });
      q.delay(quickPause);
    }
    
    q.add(function() { Message.target({show:false}); });
    q.delay(quickPause);
    
    return q;
  };
  
  var resultFromSpellPartyTarget = function(result, resultIndex, spell, target) {
    var q = charFlicker(target);
    var charDied = false, dmgShown = false;
    q.insertAt(function() { Message.target(target.getName()); }, 0);
    
    var resultDamage = result.dmg[resultIndex];
    if (resultDamage != null) {
      q.delay(quickPause);
      q.add(function() { Message.damage(resultDamage + Animation.DAMAGE_MSG); });
      dmgShown = true;
    }
    
    spellMessages(q, spell);
    if (!!result.died[resultIndex]) {
      q.delay(!!result.success[resultIndex] ? Message.getBattlePause() : quickPause);
      q.add(function() { Message.desc(Animation.CHAR_DIED_MSG); });
      charDied = true;
    }
    q.add(function() { Battle.resetCharUI(target); });
    q.delay(Message.getBattlePause());
    if (spell.message || charDied) {
      q.add(function() { Message.desc({show:false}); });
      q.delay(quickPause);
    }
    if (dmgShown) {
      q.add(function() { Message.damage({show:false}); });
      q.delay(quickPause);
    }
    q.add(function() { Message.target({show:false}); });
    q.delay(quickPause);
    
    return q;
  };
  
  var splash = function($enemy, splashColors, opt) {
    var settings = jQuery.extend({}, {pause:80, overlay:false, autoStart:false, callback:null}, opt);
    if (!settings.numAnimations) {
      var $parent = $enemy.parent();
      
      if ($parent.is(".small")) { settings.numAnimations = RNG.randomUpTo(5, 3); } 
      else if ($parent.is(".large")) { settings.numAnimations = RNG.randomUpTo(6, 4); } 
      else if ($parent.is(".fiend,.chaos")) { settings.numAnimations = RNG.randomUpTo(7, 5); } 
    }
    var q = new Queue(Queues.ShowSplash);
    
    for (var n = 0; n < settings.numAnimations; n++) {
      q.add(function() { 
        $("#battle .enemies .splash:not(.overlay)").each(function(i) {
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
          
          if (settings.overlay) {
            var $overlay = $splash.siblings(".overlay").eq(i);
            $overlay.css({
              left : enemyPos.left + splashX
             ,top : enemyPos.top + splashY
            });
            $overlay.removeClass().addClass("splash overlay").addClass(randomSplashIndex);
          }
          
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
   ,resultFromSpell : resultFromSpell
   ,slideChar : slideChar
   ,spellEffect : spellEffect
   ,splash : splash
   ,swingWeapon : swingWeapon
   ,walkInBattle : walkInBattle
   ,walkAndMoveInBattle : walkAndMoveInBattle
   ,windowShake : windowShake
    
   ,Queues : Queues
   ,ENEMY_DIED_MSG : ENEMY_DIED_MSG
   ,CHAR_DIED_MSG : CHAR_DIED_MSG
   ,DAMAGE_MSG : DAMAGE_MSG
   ,CRITICAL_HIT_MSG : CRITICAL_HIT_MSG
   ,NUM_HITS_MSG : NUM_HITS_MSG
   ,MISSED_MSG : MISSED_MSG
   ,INEFFECTIVE_MSG : INEFFECTIVE_MSG
  };
})();