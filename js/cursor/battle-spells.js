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
    self.registeredKeys = [KeyPressNotifier.Enter, KeyPressNotifier.Space, KeyPressNotifier.Esc];
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var columnChanged = function(x) {
    var $spells = $cursor.closest(".level").find(".spell");
    var spellIndex = $spells.index($cursor);
    spellIndex += x;
    if (spellIndex < 0) {
      spellIndex = $spells.length - 1;
    } else if (spellIndex >= $spells.length) {
      spellIndex = 0;
    }
    return $spells.eq(spellIndex);
  };
  
  var getFirstSpell = function() {
    var $levels = $container.find(".spell.level");
    var $spell = $levels.find(".spell").eq(0);
    if ($levels.index($spell.closest(".level")) > 3) {
      $levels.slice(0, 4).toggleClass("hidden");
    }
    return $spell;
  }
  
  var hideSpellList = function() {
    $container.addClass("hidden");
  };
  
  var moveCursor = function(x, y) {
    Cursor.clear($cursor);
    if (!(x || y)) {
      $cursor = getFirstSpell();
    } else if (x) {
      $cursor = columnChanged(x);
    } else if (y) {
      $cursor = rowChanged(y);
    }
    
    if ($cursor) {
      $cursor.append(Cursor.createCursor());
    }
  };
  
  var rowChanged = function(y) {
    var $level = $cursor.closest(".level");
    var $levels = $container.find(".level");
    var levelIndex = $levels.index($level);
    var $spells = $level.find(".spell");
    var spellIndex = $spells.index($cursor);
    
    var $newSpells = [];
    var newLevelIndex = levelIndex;
    var newSpellIndex = spellIndex;
    
    while ($newSpells.length <= 0) {
      newLevelIndex += y;
      if (newLevelIndex < 0 || newLevelIndex >= $levels.length) {
        newLevelIndex = levelIndex;
      } 
      $newSpells = $levels.eq(newLevelIndex).find(".spell");
    }
    
    if (newLevelIndex == levelIndex) {
      return $cursor;
    }
    
    if (newSpellIndex >= $newSpells.length) {
      newSpellIndex = $newSpells.length - 1;
    }
    
    if (newLevelIndex < 4 && levelIndex >= 4 || newLevelIndex >= 4 && levelIndex < 4) {
      $levels.slice(0, 4).toggleClass("hidden");
    }
    
    return $newSpells.eq(newSpellIndex);
  };
  
  var selectSpell = function() {
    if (!($cursor) || $cursor.length == 0) {
      return false;
    }
    
    var $level = $cursor.closest(".level");
    var $levels = $container.find(".level");
    var levelIndex = $levels.index($level);
    var spellIndex = $level.find(".spell").index($cursor);
    var char = Party.getChar(BattleCommands.getCharIndex());
    var spellId = char.knownSpells[levelIndex][spellIndex]; 
    var spell = Spell.lookup(spellId);
    if (char.canCastSpell(spell)) {
      BattleCommands.party({spellId:spellId});

      var target = null;
      
      if (spell.isSingleTarget()) {
        Cursor.hide($cursor);
        hideSpellList();
        if (spell.isSameTargetGroup()) { 
          BattlePartyCursor.startListening(self);
          return false;
        } else if (spell.isOtherTargetGroup()) { 
          BattleEnemyCursor.startListening(self); 
          return false;
        }
      } else if (spell.isSelfTarget()) {
        target = {type:BattleCommands.Party, char:char};
      } else {
        if (spell.isSameTargetGroup()) { 
          target = {type:BattleCommands.Party, affects:BattleCommands.All}; 
        } else if (spell.isOtherTargetGroup()) { 
          target = {type:BattleCommands.Enemy, affects:BattleCommands.All};
        }
      }
      
      if (target) {
        BattleCommands.party({target:target});
      }
      return true;
    }
    
    return false;
  };
  
  var showSpellList = function() {
    $container.removeClass("hidden");
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
          Cursor.clear($cursor);
          Battle.nextChar();
        }
        return false;
      case KeyPressNotifier.Esc:
        Cursor.clear($cursor);
        hideSpellList();
        BattleMenuCursor.startListening({reset:false});
        return false;
      default:
        console.log("Unhandled key press in spell selection: " + key);
    }
  };
  
  self.selectCharAsTarget = function(char) {
    BattleCommands.party({target:{type:BattleCommands.Party, char:char}});
    Cursor.clear($cursor);
    Battle.nextChar();
  };
  
  self.startListening = function(opt) { 
    opt = jQuery.extend(true, {reset:true}, opt);
    KeyPressNotifier.setListener(BattleSpellCursor);
    if (opt.reset) {
      Battle.populateSpellList();
      moveCursor(0, 0);
    } else {
      showSpellList();
      Cursor.show($cursor);
    }
  };
  
  self.toString = function() { return "BattleSpells"; };
  
  Cursor.register(self);
  
  return this;  
}).call({});