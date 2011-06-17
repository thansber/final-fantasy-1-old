var Animation = (function() {
  
  var Queues = {
    Attack : "attack"
   ,BattleWalk : "walkInBattle"
   ,CastSpell : "castSpell"
   ,SlideChar : "slideChar"
   ,SpellEffect : "spellEffect"
   ,SwingWeapon : "swingWeapon"
  };
  
  var CHAR_AT_REST_CLASSES = ["critical"];
  
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
  
  return {
    attack: attack
   ,castSpell: castSpell
   ,slideChar: slideChar
   ,spellEffect: spellEffect
   ,swingWeapon: swingWeapon
   ,walkInBattle: walkInBattle
   ,walkAndMoveInBattle: walkAndMoveInBattle
    
   ,Queues: Queues
  };
})();