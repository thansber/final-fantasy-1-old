var BattleEnemyCursor = (function() {
  
  var $container = null;
  var $cursor = null;
  var columnIndex = -1;
  var enemyIndex = -1;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function() {
    $container = $("#battle .enemies");
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var clearCursor = function() {
    if ($cursor && $cursor.size() > 0) {
      $cursor.find(".cursor").remove();
    }
  };
  
  var getEnemy = function(columnNum, enemyNum) {
    var $columns = $container.find(".column");
    var numColumns = $columns.size();
    columnIndex = columnNum < 0 ? numColumns - 1 : columnNum % numColumns;
    var $column = $columns.eq(columnIndex);

    var $enemies = $column.find(".enemy");
    var numEnemies = $enemies.size();
    enemyIndex = enemyNum < 0 ? numEnemies - 1 : enemyNum % numEnemies;
    
    if ($cursor) { 
      // If the cursor is on a single enemy in a column, pressing left should go to the middle enemy, not the top
      // but only if there are more than 1 enemy (i.e. multiple columns)
      if (numEnemies > 1 && $cursor.parent().is(".single") && enemyIndex == 0) {
        enemyIndex = 1;
      }

      // If the cursor is moving left from the small to large and is on the last enemy, go to the bottom large enemy
      // unless there is only 1 large enemy
      if ($cursor.parent().is(".mixed.small") && enemyNum > 1 && enemyIndex == 0 && columnIndex == 0) {
        enemyIndex = numEnemies - 1;
      }
    }
    var $enemy = $enemies.eq(enemyIndex);
    
    return $enemy;
  };
  
  var moveCursor = function(columnNum, enemyNum) {
    clearCursor();
    $cursor = getEnemy(columnNum, enemyNum);
    $cursor.append(Cursor.createCursor());
  };
  
  var selectEnemyAsTarget = function() {
    var monsterCss = Util.getCssClass($cursor, "last");
    var monster = Monster.lookupByCss(monsterCss);
    var $enemies = $cursor.closest(".enemies").find("." + monsterCss);
    var monsterIndex = $enemies.index($cursor);
  
    BattleCommands.party({source:Party.getChar(BattleCommands.getCharIndex()), target:{name:monster.name, index:monsterIndex}});
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
        moveCursor(--columnIndex, enemyIndex);
        return false;
      case KeyPressNotifier.Up:
        moveCursor(columnIndex, --enemyIndex);
        return false;
      case KeyPressNotifier.Right: 
        moveCursor(++columnIndex, enemyIndex);
        return false;
      case KeyPressNotifier.Down: 
        moveCursor(columnIndex, ++enemyIndex);
        return false;
      case KeyPressNotifier.Enter:
      case KeyPressNotifier.Space:
        selectEnemyAsTarget();
        Battle.moveCurrentCharBackwardAndNextCharForward();
        BattleCommands.changeCharIndex(1);
        clearCursor();
        if (BattleCommands.isAllPartyCommandsEntered()) {
          BattleCommands.generateEnemyCommands();
        } else {
          KeyPressNotifier.setListener(BattleMenuCursor);
        }
        return false;
      case KeyPressNotifier.Esc:
        clearCursor();
        KeyPressNotifier.setListener(BattleMenuCursor);
        return false;
      default:
        console.log("Unhandled key press in enemy selection: " + key);
    }
  };
  
  var startListening = function() { 
    KeyPressNotifier.setListener(BattleEnemyCursor);
    moveCursor(0, 0);
  };
  
  return {
    init: init
   ,keyPressChange: keyPressChange
   ,startListening: startListening
   ,registeredKeys: [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc]
  }
})();
  