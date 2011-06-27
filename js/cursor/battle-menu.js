var BattleMenuCursor = (function() {
  
  var $container = null;
  var $cursor = null;
  var columnIndex = -1;
  var messageIndex = -1;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function() {
    $container = $("#battle .input .commands");
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var clearCursor = function() {
    if ($cursor && $cursor.size() > 0) {
      $cursor.find(".cursor").remove();
    }
  };
  
  var drink = function() {
    BattleCommands.party({action:BattleCommands.Drink});
    console.log("drink");
  };
  
  var executeCommand = function($command) {
    if ($command.is(".fight")) { fight(); } 
    else if ($command.is(".magic")) { magic(); }
    else if ($command.is(".drink")) { drink(); } 
    else if ($command.is(".item")) { item(); } 
    else if ($command.is(".run")) { run(); }
  };
  
  var fight = function() { 
    BattleCommands.party({action:BattleCommands.Attack});
    BattleEnemyCursor.startListening();
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
    BattleCommands.party({action:BattleCommands.UseItem});
    console.log("item");
  };
  
  var magic = function() {
    BattleCommands.party({action:BattleCommands.CastSpell});
    console.log("magic");
  };
  
  var moveCursor = function(columnNum, messageNum) {
    clearCursor();
    $cursor = getColumnMessage(columnNum, messageNum);
    $cursor.append(Cursor.createCursor());
  };
  
  var run = function() {
    BattleCommands.party({action:BattleCommands.Run});
    console.log("run");
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  var keyPressChange = function(key, isPressed) {
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
        executeCommand($cursor);
        return false;
      case KeyPressNotifier.Esc:
        BattleCommands.clearPartyCommand();
        Battle.moveCurrentCharBackwardAndPreviousCharForward();
        BattleCommands.changeCharIndex(-1);
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
        console.log(key);
    }
  };
  
  var startListening = function() { 
    KeyPressNotifier.setListener(BattleMenuCursor);
    moveCursor(0, 0);
  };
  
  return {
    init: init
   ,keyPressChange: keyPressChange
   ,startListening: startListening
   ,registeredKeys: [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc]
  }
})();
  