var Animation = (function() {
  
  var Queues = {
    Attack : "attack"
   ,BattleWalk : "walkInBattle"
   ,CastSpell : "castSpell"
   ,CharFlicker : "charFlicker"
   ,SlideChar : "slideChar"
   ,SpellEffect : "spellEffect"
   ,ShowSplash : "showSplash"
   ,SwingWeapon : "swingWeapon"
   ,WindowShake : "windowShake"
  };
  
  var CHAR_AT_REST_CLASSES = ["critical"];
  var SPLASH_ORDINALS = ["one", "two", "three"];
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var addToQueue = function(q, f) {
    if (f && typeof f === "function") {
      q.theQueue.queue(q.queueName, function(next) { 
        f();
        next(); 
      });
    }
  };
  
  var createQueue = function(name) {
    return {theQueue:$({}), queueName:name};
  };
  
  var delay = function(q, delayTime) {
    q.theQueue.delay(delayTime, q.queueName);
  };
  
  var moveBattleWindow = function($battle, opt, left, top) {
    $battle.animate({
      marginLeft : "-=" + (left * opt.numPixels) + "px"
     ,marginTop : "-=" + (top * opt.numPixels) + "px"
    }, opt.speed);
  };
  
  var start = function(q) {
    q.theQueue.dequeue(q.queueName);
  };
  
  var walkAndMoveBackwards = function(char) {
    return function() {
      walkInBattle(char, {autoStart:true});
      slideChar(char, {autoStart:true, direction:"backward"});
    };
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var attack = function(char) {
    var swinging = function() {
      swingWeapon(char, {autoStart:true, callback:walkAndMoveBackwards(char)});
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
    var q = createQueue(Queues.CharFlicker);
    
    delay(q, settings.initialPause);
    for (var i = 0; i < settings.numAnimations; i++) {
      addToQueue(q, function() { $char.animate({opacity:0}, 0); });
      delay(q, settings.flickerPause);
      addToQueue(q, function() { $char.animate({opacity:1}, 0); });
      delay(q, settings.flickerPause);
    }
    delay(q, settings.initialPause);
    
    addToQueue(q, settings.callback);
    
    if (settings.autoStart) {
      start(q);
    }
    
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
    var q = createQueue(Queues.ShowSplash);
    
    for (var n = 0; n < settings.numAnimations; n++) {
      addToQueue(q, function() { 
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
      delay(q, settings.pause);
      addToQueue(q, function() { $("#battle .enemies .splash").addClass("hidden"); });
    }
    
    addToQueue(q, settings.callback);
    
    if (settings.autoStart) {
      start(q);
    }
    
    return q;
  };
  
  var spellEffect = function(char, spell, opt) {
    var settings = jQuery.extend({}, {numAnimations:4, pause:100, autoStart:false, callback:null, $char:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var $spell = Battle.createSpellUI(spell);
    var q = createQueue(Queues.SpellEffect);
    
    addToQueue(q, function() { $char.append($spell); $char.addClass("casting arms up"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      delay(q, settings.pause);
      addToQueue(q, function() { $spell.toggleClass("animate"); });
    }
    
    addToQueue(q, function() { $(".spell", $char).remove(); $char.removeClass("casting arms up"); });
    addToQueue(q, settings.callback);
    
    if (settings.autoStart) {
      start(q);
    }
    
    return q;
  };
  
  var slideChar = function(char, opt) {
    var settings = jQuery.extend({}, {speed:350, direction:"forward", autoStart:false, callback:null}, opt);
    var $char = Battle.getCharUI(char);
    var q = createQueue(Queues.SlideChar);
    
    addToQueue(q, function() {
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
      start(q);
    }
    
    return q;
  };
  
  var swingWeapon = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:60, autoStart:false, $char:null, callback:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var q = createQueue(Queues.SwingWeapon);

    addToQueue(q, function() { $char.addClass("attack swing"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      addToQueue(q, function() { $char.removeClass("forward").addClass("back"); });
      delay(q, settings.pause);
      addToQueue(q, function() { $char.removeClass("back").addClass("forward"); });
      delay(q, settings.pause);
    }

    addToQueue(q, function() { $char.removeClass("attack swing forward back"); });
    addToQueue(q, settings.callback);
    
    if (settings.autoStart) {
      start(q);
    }
    return q;
  };
  
  var walkInBattle = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:70, autoStart:false}, opt);
    var $char = Battle.getCharUI(char);
    var q = createQueue(Queues.BattleWalk);
    
    addToQueue(q, function() { $char.removeClass(CHAR_AT_REST_CLASSES.join(" ")); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      addToQueue(q, function() { $char.addClass("swing forward"); });
      delay(q, settings.pause);
      addToQueue(q, function() { $char.removeClass("swing forward"); });
      delay(q, settings.pause);
    }
    
    if (settings.autoStart) {
      start(q);
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
    var q = createQueue(Queues.WindowShake);
    
    addToQueue(q, function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, 0), 1); });
    delay(q, settings.pause);
    addToQueue(q, function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, -1), RNG.randomUpTo(1, 0)); });
    delay(q, settings.pause);
    addToQueue(q, function() { $battle.animate({marginLeft:0, marginTop:0}, 0); });
    addToQueue(q, settings.callback);
    
    if (settings.autoStart) {
      start(q);
    }
    
    return q;
  };
  
  return {
    attack : attack
   ,castSpell : castSpell
   ,charFlicker : charFlicker
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