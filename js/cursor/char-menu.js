var CharMenuCursor = (function() {
  
  var self = this;
  var $container = null;
  var $cursor = null;
  var previousListener = null;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function() {
    $container = $("#charMenu .options");
    self.registeredKeys = [
      KeyPressNotifier.I
     ,KeyPressNotifier.M
     ,KeyPressNotifier.W
     ,KeyPressNotifier.A
     ,KeyPressNotifier.S
    ];
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var item = function() { console.log("TODO: implement item menu"); };
  var magic = function() { console.log("TODO: implement magic menu"); };
  var weapon = function() { console.log("TODO: implement weapon menu"); };
  var armor = function() { console.log("TODO: implement armor menu"); };
  var status = function() { console.log("TODO: implement status menu"); };
  
  var menuChange = function(y) {
    var $options = $container.find(".option");
    var index = $options.index($cursor);
    
    index += y;
    if (index < 0) {
      index = $options.length - 1;
    } else if (index >= $options.length) {
      index = 0;
    }
    
    return $options.eq(index);
  };
  
  var moveCursor = function(y) {
    Cursor.clear($cursor);
    if (!y) {
      $cursor = $container.find(".option").eq(0);
    } else {
      $cursor = menuChange(y);
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
        //executeCommand($cursor);
        return false;
      case KeyPressNotifier.Esc:
        KeyPressNotifier.clearListener();
        Cursor.clear($cursor);
        Party.switchView(Party.WORLD_MAP);
        previousListener.startListening();
        return false;
      case KeyPressNotifier.I:
        item();
        return false;
      case KeyPressNotifier.M:
        magic();
        return false;
      case KeyPressNotifier.W:
        weapon();
        return false;
      case KeyPressNotifier.A:
        armor();
        return false;
      case KeyPressNotifier.S:
        status();
        return false;
      default:
        console.log("Unhandled key press in char menu: " + key);
    }
  };
  
  self.startListening = function(prevListener) { 
    previousListener = prevListener;
    KeyPressNotifier.setListener(self);
    moveCursor(0);
  };
  
  self.toString = function() { return "CharMenu"; };
  
  Cursor.register(self);
  
  return this;
}).call({});