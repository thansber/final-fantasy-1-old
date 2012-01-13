define(
/* CursorBattleEnemy */ 
["jquery", "battle", "battle-commands", "constants/battle", "cursor", "constants/cursor", "events", "logger", "monster", "party", "util"],
function($, Battle, BattleCommands, BattleConstants, Cursor, CursorConstants, Event, Logger, Monster, Party, Util) {
  
  var setup = function() {
    /* --------------------- */
    /* BATTLE ENEMIES cursor */
    /* --------------------- */
    var BattleEnemyCursor = function() {};
    BattleEnemyCursor.prototype = Cursor.create(CursorConstants.BATTLE_ENEMIES)
      .setContainer("#battle .enemies");
    
    BattleEnemyCursor.prototype.back = function() {
      this.clear();
      if (this.previousListener) {
        Event.transmit(Event.Types.CursorStart, null, {cursor:this.previousListener, reset:false});
      }
    };
    BattleEnemyCursor.prototype.columnChanged = function(x) {
      var $columns = this.$container.find(".column");
      var $enemies = this.$cursor.closest(".column").find(".enemy");
      var columnIndex = $columns.index(this.$cursor.closest(".column"));
      var enemyIndex = $enemies.index(this.$cursor);
      
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
        return this.$cursor;
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
    
    BattleEnemyCursor.prototype.initialCursor = function() { return this.$container.find(".enemy").not(".dead").eq(0); };
    BattleEnemyCursor.prototype.next = function() {
      this.selectEnemyAsTarget();
      this.clear();
      Event.transmit(Event.Types.NextChar);
    };
    BattleEnemyCursor.prototype.selectEnemyAsTarget = function() {
      var monsterCss = Util.getCssClass(this.$cursor, "last");
      var monster = Monster.lookupByCss(monsterCss);
      var $enemies = this.$cursor.closest(".enemies").find("." + monsterCss);
      var monsterIndex = $enemies.index(this.$cursor);
    
      BattleCommands.party({target:{name:monster.name, index:monsterIndex, type:BattleConstants.Commands.Enemy}});
    };
    BattleEnemyCursor.prototype.yDestinations = function() { return this.$cursor.closest(".column").find(".enemy").not(".dead"); };
  };
  
  return {
    setup : setup
  };
});