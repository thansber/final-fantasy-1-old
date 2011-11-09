var BattleEnemyCursor = (function() {
  
  var self = this;
  var $container = null;
  var $cursor = null;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function() {
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
  
  var columnChange = function(x) {
    var $columns = $container.find(".column");
    var $enemies = $cursor.closest(".column").find(".enemy");
    var columnIndex = $columns.index($cursor.closest(".column"));
    var enemyIndex = $enemies.index($cursor);
    
    var numAliveEnemies = -1;
    var newColumnIndex = columnIndex;
    while (numAliveEnemies <= 0) {
      newColumnIndex += x;
      if (newColumnIndex < 0) {
        newColumnIndex = $columns.length - 1;
      } else if (newColumnIndex >= $columns.length) {
        newColumnIndex = 0;
      }
      numAliveEnemies = $columns.eq(newColumnIndex).find(".enemy").not(".dead").length;
    }
    
    // We tried going left/right, but no other columns, left/right movement
    // goes nowhere
    if (newColumnIndex == columnIndex) {
      return $cursor;
    }
    
    // If we were originally on a single enemy (4 small, on the 4th enemy)
    // treat the enemy index as 1 (would be 0 otherwise)
    if ($columns.eq(columnIndex).is(".single")) {
      enemyIndex = 1;
    }
    
    var newEnemyIndex = enemyIndex;
    
    // Going to a column with a single enemy, the index should be 0
    // we've already handled the case where this single enemy is dead above
    if ($columns.eq(newColumnIndex).is(".single")) {
      newEnemyIndex = 0;
    }
    
    var $newEnemies = $columns.eq(newColumnIndex).find(".enemy");
    
    // First check is for starting at the 3rd enemy and going to a column
    // with only 2 enemies (i.e. 5 starting enemies)
    // Second check is for trying to go to a dead enemy
    if ($newEnemies.length - 1 < newEnemyIndex || $newEnemies.eq(newEnemyIndex).is(".dead")) {
      if ($newEnemies.not(".dead").length == 1) {
        newEnemyIndex = $newEnemies.index($newEnemies.not(".dead"));
      } else {
        var prefs = [];
        if (enemyIndex == 0) {
          prefs = [1, 2];
        } else if (enemyIndex == 1) {
          prefs = [0, 2];
        } else {
          prefs = [1, 0];
        }
        
        var $newEnemy = null;
        var i = 0;
        do {
          newEnemyIndex = prefs[i++];
          $newEnemy = $newEnemies.eq(newEnemyIndex);
        } while (i < prefs.length && $newEnemy.is(".dead"));
      }
    }
    
    return $columns.eq(newColumnIndex).find(".enemy").eq(newEnemyIndex);
  };
  
  var enemyChange = function(y) {
    var $enemies = $cursor.closest(".column").find(".enemy").not(".dead");
    var enemyIndex = $enemies.index($cursor);
    enemyIndex += y;
    if (enemyIndex < 0) {
      enemyIndex = $enemies.length - 1;
    } else if (enemyIndex >= $enemies.length) {
      enemyIndex = 0;
    } 
    return $enemies.eq(enemyIndex);
  };
  
  var getFirstAliveEnemy = function() {
    return $container.find(".enemy").not(".dead").eq(0);
  };
  
  var moveCursor = function(x, y) {
    clearCursor();
    if (!(x || y)) {
      $cursor = getFirstAliveEnemy();
    } else if (x) {
      $cursor = columnChange(x);
    } else if (y) {
      $cursor = enemyChange(y);
    }
    
    if ($cursor) {
      $cursor.append(Cursor.createCursor());
    }
  };
  
  var selectEnemyAsTarget = function() {
    var monsterCss = Util.getCssClass($cursor, "last");
    var monster = Monster.lookupByCss(monsterCss);
    var $enemies = $cursor.closest(".enemies").find("." + monsterCss);
    var monsterIndex = $enemies.index($cursor);
  
    BattleCommands.party({source:Party.getChar(BattleCommands.getCharIndex()), target:{name:monster.name, index:monsterIndex, type:BattleCommands.Enemy}});
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
        moveCursor(-1, 0);
        return false;
      case KeyPressNotifier.Up:
        moveCursor(0, -1);
        return false;
      case KeyPressNotifier.Right: 
        moveCursor(1, 0);
        return false;
      case KeyPressNotifier.Down: 
        moveCursor(0, 1);
        return false;
      case KeyPressNotifier.Enter:
      case KeyPressNotifier.Space:
        KeyPressNotifier.clearListener();
        selectEnemyAsTarget();
        Battle.nextChar();
        clearCursor();
        return false;
      case KeyPressNotifier.Esc:
        KeyPressNotifier.clearListener();
        clearCursor();
        KeyPressNotifier.setListener(BattleMenuCursor);
        BattleMenuCursor.startListening();
        return false;
      default:
        console.log("Unhandled key press in enemy selection: " + key);
    }
  };
  
  self.startListening = function() { 
    KeyPressNotifier.setListener(BattleEnemyCursor);
    moveCursor(0, 0);
  };
  
  return this;
}).call({});
  