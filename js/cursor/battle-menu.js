var BattleMenuCursor = (function() {
  
  var self = this;
  var $container = null;
  var $cursor = null;
  var columnIndex = -1;
  var messageIndex = -1;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function() {
    $container = $("#battle .input .commands");
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var drink = function() {
    BattleCommands.party({action:BattleCommands.Drink, source:BattleCommands.getCurrentChar()});
    console.log("drink action not supported yet");
  };
  
  var executeCommand = function($command) {
    if ($command.is(".fight")) { fight(); } 
    else if ($command.is(".magic")) { magic(); }
    else if ($command.is(".drink")) { drink(); } 
    else if ($command.is(".item")) { item(); } 
    else if ($command.is(".run")) { run(); }
  };
  
  var fight = function() { 
    BattleCommands.party({action:BattleCommands.Attack, source:BattleCommands.getCurrentChar()});
    Cursor.hide($cursor);
    BattleEnemyCursor.startListening(self);
  };
  
  var getColumnMessage = function(columnNum, messageNum) {
    var numColumns = $container.find(".column").size();
    columnIndex = columnNum < 0 ? numColumns - 1 : columnNum % numColumns;
    var $column = $container.find(".column").eq(columnIndex);

    var numMessages = $column.find(".text").size();
    messageIndex = messageNum < 0 ? numMessages - 1 : messageNum % numMessages;
    var $message = $column.find(".text").eq(messageIndex);
    
    return $message;
  };
  
  var item = function() {
    BattleCommands.party({action:BattleCommands.UseItem, source:BattleCommands.getCurrentChar()});
    console.log("item action not supported yet");
  };
  
  var magic = function() {
    var currentChar = BattleCommands.getCurrentChar();
    if (!currentChar.canUseMagic()) {
      KeyPressNotifier.setListener(self);
      return;
    }
    BattleCommands.party({action:BattleCommands.CastSpell, source:currentChar});
    BattleSpellCursor.startListening();
    Cursor.hide($cursor);
  };
  
  var moveCursor = function(columnNum, messageNum) {
    Cursor.clear($cursor);
    $cursor = getColumnMessage(columnNum, messageNum);
    $cursor.append(Cursor.createCursor());
  };
  
  var run = function() {
    BattleCommands.party({action:BattleCommands.Run, source:BattleCommands.getCurrentChar()});
    console.log("run action not supported yet");
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.keyPressChange = function(key, isPressed) {
    if (!isPressed) { 
      return false; 
    }
    switch (key) {
      case KeyPressNotifier.Left: 
        moveCursor(--columnIndex, messageIndex);
        return false;
      case KeyPressNotifier.Up:
        moveCursor(columnIndex, --messageIndex);
        return false;
      case KeyPressNotifier.Right: 
        moveCursor(++columnIndex, messageIndex);
        return false;
      case KeyPressNotifier.Down: 
        moveCursor(columnIndex, ++messageIndex);
        return false;
      case KeyPressNotifier.Enter:
      case KeyPressNotifier.Space:
        KeyPressNotifier.clearListener();
        executeCommand($cursor);
        return false;
      case KeyPressNotifier.Esc:
        KeyPressNotifier.clearListener();
        Battle.prevChar();
        return false;
      case KeyPressNotifier.F:
        fight();
        return false;
      case KeyPressNotifier.M:
        magic();
        return false;
      case KeyPressNotifier.D:
        drink();
        return false;
      case KeyPressNotifier.I:
        item();
        return false;
      case KeyPressNotifier.R:
        run();
        return false;
      default:
        console.log("Unhandled key press in menu selection: " + key);
    }
  };
  
  self.startListening = function(opt) {
    opt = jQuery.extend(true, {reset:true}, opt);
    KeyPressNotifier.setListener(BattleMenuCursor);
    if (opt.reset) {
      moveCursor(0, 0);
    } else {
      Cursor.show($cursor);
    }
  };
  
  self.registeredKeys = [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc];
  
  self.toString = function() { return "BattleMenu"; };
  
  Cursor.register(self);
  
  return this;
}).call({});
  