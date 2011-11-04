var BattleSpellCursor = (function () {
  
  var self = this;
  var $container = null;
  var $cursor = null;
  var columnIndex = 0;
  var rowIndex = 0;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function() {
    $container = $("#battle .input .spells");
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var clearCursor = function() {
    if ($cursor && $cursor.size() > 0) {
      $cursor.find(".cursor").remove();
    }
  };
  
  var getSpell = function(columnChange, rowChange) {
    var rowChanged = (rowChange != 0);
    var isTransition = (rowIndex == 3 && rowChange == 1) || (rowIndex == 4 && rowChange == -1);
    var $rows = $container.find(".spell.level");
    rowIndex += rowChange;
    rowIndex = rowIndex < 0 ? 0 : rowIndex;
    var $row = $rows.eq(rowIndex);
    
    // Transition between spell levels 4 and 5
    if (isTransition) {
      $rows.slice(0, 4).toggleClass("hidden");
    }
    
    var $columns = $row.find(".spell");
    if ($columns.size() == 0) {
      $columns = $rows.eq(--rowIndex).find(".spell"); 
    }
    columnIndex += columnChange
    if (rowChanged && columnIndex > $columns.size() - 1) {
      columnIndex = $columns.size() - 1;
    } else {
      columnIndex = columnIndex < 0 ? $columns.size() - 1 : columnIndex % $columns.size();
    }
    var $column = $columns.eq(columnIndex);
    
    return $column;
  };
  
  var hideSpellList = function() {
    $container.addClass("hidden");
  };
  
  var moveCursor = function(columnNum, rowNum) {
    clearCursor();
    $cursor = getSpell(columnNum, rowNum);
    $cursor.append(Cursor.createCursor());
  };
  
  var selectSpell = function() {
    var char = Party.getChar(BattleCommands.getCharIndex());
    var spellId = char.knownSpells[rowIndex][columnIndex]; 
    var spell = Spell.lookup(spellId);
    if (char.canCastSpell(spell)) {
      BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:spellId});
      if (spell.isSameTargetGroup()) { 
        BattleCommands.party({target:{type:BattleCommands.Party}}); 
      } else if (spell.isOtherTargetGroup()) { 
        BattleCommands.party({target:{type:BattleCommands.Enemy}}); 
      }

      if (spell.isSingleTarget()) {
        clearCursor();
        hideSpellList();
        if (spell.isSameTargetGroup()) { 
          // TODO: add cursor for chars
        } else if (spell.isOtherTargetGroup()) { 
          BattleEnemyCursor.startListening(); 
        }
      } else if (spell.isSelfTarget()) {
        BattleCommands.party({target:{type:BattleCommands.Party, char:char}});
      } 
      return true;
    }
    
    return false;
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.keyPressChange = function(key, isPressed) {
    if (!isPressed) {
      return false; 
    }
    switch (key) {
      case KeyPressNotifier.Left: moveCursor(-1, 0); return false;
      case KeyPressNotifier.Up: moveCursor(0, -1); return false;
      case KeyPressNotifier.Right: moveCursor(1, 0); return false;
      case KeyPressNotifier.Down: moveCursor(0, 1); return false;
      case KeyPressNotifier.Enter:
      case KeyPressNotifier.Space:
        if (selectSpell()) {
          hideSpellList();
          clearCursor();
          if (BattleCommands.isAllPartyCommandsEntered()) {
            BattleCommands.generateEnemyCommands();
          } else {
            KeyPressNotifier.setListener(BattleMenuCursor);
          }
        }
        return false;
      case KeyPressNotifier.Esc:
        clearCursor();
        hideSpellList();
        KeyPressNotifier.setListener(BattleMenuCursor);
        return false;
      default:
        console.log("Unhandled key press in spell selection: " + key);
    }
  };
  
  self.startListening = function() { 
    KeyPressNotifier.setListener(BattleSpellCursor);
    moveCursor(0, 0);
  };
  
  self.registeredKeys = [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc];
  
  return this;  
}).call({});