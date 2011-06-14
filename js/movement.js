var Movement = (function() {
  
  var moveDistance = 16;
  var $view = null;
  var isMoving = false;
  var nextMove = null;
  var keysPressed = {};
  
  var Transportation = {
    FOOT: "foot"
   ,SHIP: "ship"
   ,CANOE: "canoe"
   ,AIRSHIP: "airship"
  };

  var TIMER_LABEL = "movement";
  var MOVE_SCROLL_SPEEDS = {};
  MOVE_SCROLL_SPEEDS[Transportation.Foot] = 250;

  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
    $view = $("#view");
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
    var speed = MOVE_SCROLL_SPEEDS[Party.getTransportation()];
    $view.stop().animate({backgroundPosition:newPos}, speed, "linear", function() { isMoving = false; });
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
          case KeyPressNotifier.Left: left(); return false;
          case KeyPressNotifier.Up: up(); return false;
          case KeyPressNotifier.Right: right(); return false;
          case KeyPressNotifier.Down: down(); return false;
        }
      }
    }
  };
  
  var startListening = function() {
    KeyPressNotifier.setListener(Movement);
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
   
   ,Transportation: Transportation
  };
  
})();