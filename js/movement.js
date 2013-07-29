define( /* Movement */
["jquery", "events", "key-press-notifier", "logger", "constants/movement", "js/lib/jquery.timer.js"],
function($, Event, KeyPressNotifier, Logger, MovementConstants) {
return (function() {

  var self = this;

  var moving = false;
  var listening = false;
  var moveCallback = null;
  var keysPressed = {};
  var TIMER_LABEL = "movement";
  var LOG_ID = "Movement";

  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function(opt) {
    Event.listen(Event.Types.MovingChange, self.setMoving);
    Event.listen(Event.Types.MovementStart, self.startListening);
    Event.listen(Event.Types.MovementStop, self.stopListening);

    self.registeredKeys = [KeyPressNotifier.I, KeyPressNotifier.M];
  };

  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.keyPressChange = function(key, isPressed) {
    keysPressed[key] = isPressed;

    if (!isPressed) {
      switch (key) {
        case KeyPressNotifier.I:
        case KeyPressNotifier.M:
          KeyPressNotifier.clearListener();
          Event.transmit(Event.Types.CharMenu, self);
          break;
      }
    }
  };
  self.isListening = function() { return listening; };
  self.isMoving = function() { return moving; };
  self.move = function(xChange, yChange) {
    Event.transmit(Event.Types.Moving, yChange, xChange);
  };

  self.moveDown = function() { self.move(0, 1); };
  self.moveLeft = function() { self.move(-1, 0); };
  self.moveRight = function() { self.move(1, 0); };
  self.moveUp = function() { self.move(0, -1); };
  self.setMoving = function(m) { moving = m; };

  self.refresh = function() {
    for (var k in keysPressed) {
      if (keysPressed[k] && !moving) {
        switch (k) {
          case KeyPressNotifier.Left: self.moveLeft(); return false;
          case KeyPressNotifier.Up: self.moveUp(); return false;
          case KeyPressNotifier.Right: self.moveRight(); return false;
          case KeyPressNotifier.Down: self.moveDown(); return false;
        }
      }
    }
  };

  self.startListening = function() {
    Logger.debug(LOG_ID, "listening for movement");
    listening = true;
    KeyPressNotifier.setListener(self);
    $(document).everyTime("30ms", TIMER_LABEL, function() {
      self.refresh();
    });
  };

  self.stopListening = function() {
    Logger.debug(LOG_ID, "NOT listening for movement");
    listening = false;
    $(document).stopTime(TIMER_LABEL);
    for (var k in keysPressed) {
      keysPressed[k] = false;
    }
  };

  return this;
}).call({})
});