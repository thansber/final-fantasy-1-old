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
  
  var executeCommand = function($command) {
    if ($command.is(".fight")) {
      BattleEnemyCursor.startListening();
    } else if ($command.is(".magic")) {
      console.log("magic");
    } else if ($command.is(".drink")) {
      console.log("drink");
    } else if ($command.is(".item")) {
      console.log("item");
    } else if ($command.is(".run")) {
      console.log("run");
    }
  }
  
  var getColumnMessage = function(columnNum, messageNum) {
    var numColumns = $container.find(".column").size();
    columnIndex = columnNum < 0 ? numColumns - 1 : columnNum % numColumns;
    var $column = $container.find(".column").eq(columnIndex);

    var numMessages = $column.find(".message").size();
    messageIndex = messageNum < 0 ? numMessages - 1 : messageNum % numMessages;
    var $message = $column.find(".message").eq(messageIndex);
    
    return $message;
  };
  
  var moveCursor = function(columnNum, messageNum) {
    clearCursor();
    $cursor = getColumnMessage(columnNum, messageNum);
    $cursor.append(Cursor.createCursor());
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
   ,registeredKeys: [KeyPressNotifier.Enter, KeyPressNotifier.Space]
  }
})();
  