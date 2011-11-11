var BattlePartyCursor = (function() {
  
  var self = this;
  var $container = null;
  var $cursor = null;
  var previousListener = null;
  
  self.init = function() {
    $container = $("#battle .party");
    self.registeredKeys = [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc];
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var charChange = function(y) {
    var $chars = $container.find(".char");
    var charIndex = $chars.index($cursor);
    var newCharIndex = charIndex + y;
    
    if (newCharIndex < 0) {
      newCharIndex = $chars.length - 1;
    } else if (newCharIndex >= $chars.length) {
      newCharIndex = 0;
    }
    
    return $chars.eq(newCharIndex);
  };
  
  var getFirstChar = function() {
    return $container.find(".char").eq(0);
  };
  
  var getSelectedChar = function() {
    var $chars = $container.find(".char");
    var charIndex = $chars.index($cursor);
    return Party.getChar(charIndex);
  };
  
  var moveCursor = function(y) {
    Cursor.clear($cursor);
    if (!y) {
      $cursor = getFirstChar();
    } else {
      $cursor = charChange(y);
    }
    
    if ($cursor) {
      $cursor.append(Cursor.createCursor());
    }
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.keyPressChange = function(key, isPressed) {
    if (!isPressed) {
      return false; 
    }
    switch (key) {
      case KeyPressNotifier.Up:
        moveCursor(-1);
        return false;
      case KeyPressNotifier.Down: 
        moveCursor(1);
        return false;
      case KeyPressNotifier.Enter:
      case KeyPressNotifier.Space:
        KeyPressNotifier.clearListener();
        previousListener.selectCharAsTarget(getSelectedChar());
        Cursor.clear($cursor);
        return false;
      case KeyPressNotifier.Esc:
        KeyPressNotifier.clearListener();
        Cursor.clear($cursor);
        previousListener.startListening({reset:false});
        return false;
      default:
        console.log("Unhandled key press in char selection: " + key);
    }
  };
  
  self.startListening = function(prevListener) { 
    previousListener = prevListener;
    KeyPressNotifier.setListener(self);
    moveCursor(0);
  };
  
  self.toString = function() { return "BattleParty"; };
  
  Cursor.register(self);
  
  return this;
}).call({});