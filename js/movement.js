var Movement = (function() {
  
  var self = this;
    
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

  self.Transportation = Transportation;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function(opt) {
    $view = $("#view");
  };

  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.move = function(xChange, yChange) {
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
  
  self.left = function() { self.move(-1, 0); };
  self.right = function() { self.move(1, 0); };
  self.up = function() { self.move(0, -1); };
  self.down = function() { self.move(0, 1); };
  self.moving = function() { return isMoving; };
  
  self.keyPressChange = function(key, isPressed) {
    keysPressed[key] = isPressed;
  };
  
  self.refresh = function() {
    for (var k in keysPressed) {
      if (keysPressed[k]) {
        switch (k) {
          case KeyPressNotifier.Left: self.left(); return false;
          case KeyPressNotifier.Up: self.up(); return false;
          case KeyPressNotifier.Right: self.right(); return false;
          case KeyPressNotifier.Down: self.down(); return false;
        }
      }
    }
  };
  
  self.startListening = function() {
    KeyPressNotifier.setListener(Movement);
    $(document).everyTime("30ms", TIMER_LABEL, function() {
      Movement.refresh();
    });
  };
  
  self.stopListening = function() {
    $(document).stopTime(TIMER_LABEL);
    for (var k in keysPressed) {
      keysPressed[k] = false;
    }
  };
  
  return this;
}).call({});