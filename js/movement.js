var Movement = (function() {
  
  var moveDistance = 16;
  var $view = null;
  var isMoving = false;
  var nextMove = null;
  var keysPressed = {};
  
  var TIMER_LABEL = "movement";
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
    $view = $(opt.view);
  };

  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  var move = function(xChange, yChange) {
    if (isMoving) {
      return;
    }
    var moveValid = Party.isDestinationPassable(yChange, xChange);
    if (!moveValid) {
      return;
    }
    isMoving = true;
    var oldPos = $view.css("backgroundPosition").split(" ");
    var oldX = parseInt(oldPos[0].replace("px", ""));
    var oldY = parseInt(oldPos[1].replace("px", ""));
    var newPos = (oldX + (xChange * moveDistance * -1)) + "px " + (oldY + (yChange * moveDistance * -1)) + "px";
    $view.stop().animate({backgroundPosition:newPos}, 250, "linear", function() { isMoving = false; });
  };
  
  var left = function() { move(-1, 0); };
  var right = function() { move(1, 0); };
  var up = function() { move(0, -1); };
  var down = function() { move(0, 1); };
  var moving = function() { return isMoving; };
  
  var keyPressChange = function(key, isPressed) {
    keysPressed[key] = isPressed;
  };
  
  var refresh = function() {
    for (var k in keysPressed) {
      if (keysPressed[k]) {
        switch (k) {
          case "37": left(); return false;
          case "38": up(); return false;
          case "39": right(); return false;
          case "40": down(); return false;
        }
      }
    }
  };
  
  var startListening = function() {
    $(document).everyTime("30ms", TIMER_LABEL, function() {
      Movement.refresh();
    });
  };
  
  var stopListening = function() {
    $(document).stopTime(TIMER_LABEL);
    for (var k in keysPressed) {
      keysPressed[k] = false;
    }
  };
  
  return {
    init: init
   
   ,left: left
   ,right: right
   ,down: down
   ,up: up
   
   ,moving: moving
   ,keyPressChange: keyPressChange
   ,startListening: startListening
   ,stopListening: stopListening
   ,refresh: refresh
  };
  
})();