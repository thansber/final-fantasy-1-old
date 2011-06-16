var Animation = (function() {
  
  var Queues = {
    BattleWalk : "walkInBattle"
   ,SlideChar : "slideChar"
   ,SwingWeapon : "swingWeapon"
  };
  
  var CHAR_AT_REST_CLASSES = ["critical"];
  
  var start = function(obj) {
    obj.queue.dequeue(obj.name);
  };
  
  var slideChar = function(char, opt) {
    var defaults = {speed:320, amount:40, direction:"forward"};
    var settings = jQuery.extend({}, defaults, opt);
    var q = $({}), queueName = Queues.SlideChar;
    var $char = Battle.getCharUI(char);
    
    q.queue(queueName, function(next) {
      switch (settings.direction) {
        case "forward":
          $char.addClass("advance", settings.speed);
          break;
        case "backward":
          $char.removeClass("advance", settings.speed);
          break;
      };
      next(); 
    });
    
    if (settings.autoStart) {
      q.dequeue(queueName);
    }
    
    return {name:queueName, queue:q};
  };
  
  var swingWeapon = function(char, opt) {
    var defaults = {numAnimations:3, pause:60, autoStart:false, $char:null};
    var settings = jQuery.extend({}, defaults, opt);
    var q = $({}), queueName = Queues.SwingWeapon;
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);

    q.queue(queueName, function(next) { $char.addClass("swing"); next(); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.queue(queueName, function(next) { $char.removeClass("forward").addClass("back"); next(); });
      q.delay(settings.pause, queueName);
      q.queue(queueName, function(next) { $char.removeClass("back").addClass("forward"); next(); });
      q.delay(settings.pause, queueName);
    }

    q.queue(queueName, function(next) { $char.removeClass("swing forward back"); next(); });
    
    if (settings.autoStart) {
      q.dequeue(queueName);
    }
    return {name:queueName, queue:q};
  };
  
  var walkInBattle = function(char, opt) {
    var defaults = {numAnimations:3, pause:70, autoStart:false};
    var settings = jQuery.extend({}, defaults, opt);
    var q = $({}), queueName = Queues.BattleWalk;
    var $char = Battle.getCharUI(char);
    
    q.queue(queueName, function(next) { $char.removeClass(CHAR_AT_REST_CLASSES.join(" ")); next(); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.queue(queueName, function(next) { $char.addClass("swing forward"); next(); });
      q.delay(settings.pause, queueName);
      q.queue(queueName, function(next) { $char.removeClass("swing forward"); next(); });
      q.delay(settings.pause, queueName);
    }
    
    if (settings.autoStart) {
      q.dequeue(queueName);
    }
    return {name:queueName, queue:q};
  };
  
  var walkAndMoveInBattle = function(char, opt) {
    opt = opt || {};
    opt.autoStart = false;
    var walking = walkInBattle(char, opt);
    var sliding = slideChar(char, opt);
    start(walking);
    start(sliding);
  };
  
  return {
    slideChar: slideChar
   ,start: start
   ,swingWeapon: swingWeapon
   ,walkInBattle: walkInBattle
   ,walkAndMoveInBattle: walkAndMoveInBattle
    
   ,Queues: Queues
  };
})();