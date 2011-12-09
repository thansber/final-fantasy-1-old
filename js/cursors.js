var Cursors = (function() {
  
  var self = this;
  
  var ALL = [];
  var ALL_BY_ID = {};
  
  var IDS = {
    ABSTRACT_EQUIPMENT : "abstractEquipment"
   ,ABSTRACT_EQUIPMENT_ACTIONS : "abstractEquipmentActions"
   ,ARMOR_ACTIONS_MENU : "armorActions"
   ,ARMOR_MENU : "armor"
   ,BATTLE_ENEMIES : "battleEnemies"
   ,BATTLE_MENU : "battleMenu"
   ,BATTLE_PARTY : "battleParty"
   ,BATTLE_SPELLS : "battleSpells"
   ,CHAR_MENU : "charMenu"
   ,CHAR_SELECTION_MENU : "charSelectionMenu"
   ,CLINIC : "clinic"
   ,EQUIPMENT_SHOP : "equipmentShop"
   ,INN : "inn"
   ,ITEM_SHOP : "itemShop"
   ,MAGIC_MENU : "magicMenu"
   ,MAGIC_SHOP : "magicShop"
   ,STATUS_MENU : "statusMenu"
   ,WEAPON_ACTIONS_MENU : "weaponActions"
   ,WEAPONS_MENU : "weapons"
  };

  for (var i in IDS) {
    self[i] = IDS[i];
  }
  
  self.init = function() {
    for (var c = 0; c < ALL.length; c++) {
      ALL[c].init();
    }
  };
  
  self.lookup = function(id) { return ALL_BY_ID[id]; };
  
  /* ======================= */
  /* CURSOR class definition */
  /* ======================= */
  var Cursor = function(id, opt) {
    this.id = id;
    
    opt = jQuery.extend({container:null}, opt);
    
    opt.nextKeys = opt.nextKeys || [KeyPressNotifier.Enter, KeyPressNotifier.Space];
    opt.backKeys = opt.backKeys || [KeyPressNotifier.Esc];
    opt.otherKeys = jQuery.extend({}, opt.otherKeys);

    this.$cursor = null;
    this.previousListener = null;
    this.container = opt.container;
    this.$container = null;
    
    this.registeredKeys = [];
    this.nextKeys = {};
    this.backKeys = {};
    this.otherKeys = {};
    
    for (var k = 0; k < opt.nextKeys.length; k++) {
      this.nextKeys[opt.nextKeys[k]] = true;
      this.registeredKeys.push(opt.nextKeys[k]);
    }
    for (var k = 0; k < opt.backKeys.length; k++) {
      this.backKeys[opt.backKeys[k]] = true;
      this.registeredKeys.push(opt.backKeys[k]);
    }
    this.otherKeys = jQuery.extend(true, {}, opt.otherKeys);
    
    for (var k in this.otherKeys) {
      this.registeredKeys.push(k);
    }
    
    ALL.push(this);
    ALL_BY_ID[id] = this;
  };
  
  /* Abstract methods, intended to be overridden */
  /* abstract */ Cursor.prototype.back = function(x) {};
  /* abstract */ Cursor.prototype.initialCursor = function() {};
  /* abstract */ Cursor.prototype.next = function(x) {};
  /* abstract */ Cursor.prototype.reset = function(fullReset) {};
  /* abstract */ Cursor.prototype.xDestinations = function() { return []; };
  /* abstract */ Cursor.prototype.yDestinations = function() { return []; };

  
  Cursor.prototype.clear = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").remove();
    }
  };
  Cursor.prototype.columnChanged = function(x) { return this.wrappingMovement(x, this.xDestinations()); };
  Cursor.prototype.create = function(extra) { return $("<div/>").addClass("cursor").addClass(extra ? extra : ""); };
  Cursor.prototype.hide = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").hide();
    }
  };
  Cursor.prototype.init = function() {
    this.$container = $(this.container);
  };
  Cursor.prototype.isValid = function() { return this.$cursor && this.$cursor.length > 0; };
  Cursor.prototype.keyPressChange = function(key, isPressed) {
    if (!isPressed) {
      return false; 
    }
    switch (key) {
      case KeyPressNotifier.Left: 
        this.move(0, -1);
        return false;
      case KeyPressNotifier.Up:
        this.move(-1, 0);
        return false;
      case KeyPressNotifier.Right: 
        this.move(0, 1);
        return false;
      case KeyPressNotifier.Down: 
        this.move(1, 0);
        return false;
    }
    
    if (this.nextKeys[key]) {
      this.next();
    } else if (this.backKeys[key]) {
      this.back();
    } else if (this.otherKeys[key]) {
      this.otherKeys[key].call(this);
    } else {
      Logger.debug("Cursor [" + this.id + "] received an unhandled key press: " + key);
    }
  };
  Cursor.prototype.move = function(y, x) {
    this.clear();
    if (!(x || y)) {
      this.$cursor = this.initialCursor();
    } else if (x) {
      this.$cursor = this.columnChanged(x);
    } else if (y) {
      this.$cursor = this.rowChanged(y);
    }
       
    if (this.$cursor) {
      this.$cursor.append(this.create());
    }
  };
  Cursor.prototype.rowChanged = function(y) { return this.wrappingMovement(y, this.yDestinations())};
  Cursor.prototype.show = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").show();
    }
  };
  Cursor.prototype.startListening = function(opt) {
    opt = jQuery.extend({prevListener:null, reset:true}, opt);
    this.previousListener = opt.prevListener;
    KeyPressNotifier.setListener(this);
    
    if (opt.reset) {
      this.reset(true, opt);
      this.move(0, 0);
    } else {
      this.reset(false, opt);
      this.show();
    }
  };
  Cursor.prototype.stopListening = function(opt) {};
  Cursor.prototype.wrappingMovement = function(change, $options) {
    if (!($options) || $options.length == 0) {
      return this.$cursor;
    }
    var index = $options.index(this.$cursor);
    
    index += change;
    if (index < 0) {
      index = $options.length - 1;
    } else if (index >= $options.length) {
      index = 0;
    }
    
    return $options.eq(index);
  };
  
  /* ------------------ */
  /* BATTLE MENU cursor */
  /* ------------------ */
  var BattleMenuCursor = function() {};
  var battleMenuCursorOpt = {container: "#battle .input .commands", otherKeys:{}};
  battleMenuCursorOpt.otherKeys[KeyPressNotifier.F] = function() { this.fight(); };
  battleMenuCursorOpt.otherKeys[KeyPressNotifier.M] = function() { this.magic(); };
  battleMenuCursorOpt.otherKeys[KeyPressNotifier.D] = function() { this.drink(); };
  battleMenuCursorOpt.otherKeys[KeyPressNotifier.I] = function() { this.item(); };
  battleMenuCursorOpt.otherKeys[KeyPressNotifier.R] = function() { this.run(); };
  
  BattleMenuCursor.prototype = new Cursor(self.BATTLE_MENU, battleMenuCursorOpt);
  BattleMenuCursor.prototype.back = function() {
    KeyPressNotifier.clearListener();
    Battle.prevChar();
  };
  BattleMenuCursor.prototype.columnChanged = function(y) {
    var $columns = this.$container.find(".column");
    var $column = this.$cursor.closest(".column");
    var index = $columns.index($column);
    index = Math.abs(index + y) % $columns.length;
    return $columns.eq(index).find(".text").eq(0);
  };
  BattleMenuCursor.prototype.initialCursor = function() { return this.$container.find(".text").eq(0); };
  BattleMenuCursor.prototype.next = function() {
    if (this.$cursor.is(".fight")) { this.fight(); } 
    else if (this.$cursor.is(".magic")) { this.magic(); }
    else if (this.$cursor.is(".drink")) { this.drink(); } 
    else if (this.$cursor.is(".item")) { this.item(); } 
    else if (this.$cursor.is(".run")) { this.run(); }
  };
  BattleMenuCursor.prototype.yDestinations = function() { return this.$cursor.closest(".column").find(".text"); };
  
  BattleMenuCursor.prototype.drink = function() {
    BattleCommands.party({action:BattleCommands.Drink, source:BattleCommands.getCurrentChar()});
    console.log("drink action not supported yet");
  };
  BattleMenuCursor.prototype.fight = function() { 
    BattleCommands.party({action:BattleCommands.Attack, source:BattleCommands.getCurrentChar()});
    this.hide();
    Cursors.lookup(Cursors.BATTLE_ENEMIES).startListening({prevListener:this});
  };
  BattleMenuCursor.prototype.item = function() {
    BattleCommands.party({action:BattleCommands.UseItem, source:BattleCommands.getCurrentChar()});
    console.log("item action not supported yet");
  };
  BattleMenuCursor.prototype.magic = function() {
    var currentChar = BattleCommands.getCurrentChar();
    if (!currentChar.canUseMagic()) {
      KeyPressNotifier.setListener(self);
      return;
    }
    BattleCommands.party({action:BattleCommands.CastSpell, source:currentChar});
    Cursors.lookup(Cursors.BATTLE_SPELLS).startListening();
    this.hide();
  };
  BattleMenuCursor.prototype.run = function() {
    BattleCommands.party({action:BattleCommands.Run, source:BattleCommands.getCurrentChar(), target:{type:BattleCommands.Party}});
    this.clear();
    Battle.nextChar();
  };
  
  
  /* --------------------- */
  /* BATTLE ENEMIES cursor */
  /* --------------------- */
  var BattleEnemyCursor = function() {};
  BattleEnemyCursor.prototype = new Cursor(self.BATTLE_ENEMIES, {container: "#battle .enemies"});
  
  BattleEnemyCursor.prototype.back = function() {
    KeyPressNotifier.clearListener();
    this.clear();
    if (this.previousListener) {
      this.previousListener.startListening({reset:false});
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
    KeyPressNotifier.clearListener();
    this.selectEnemyAsTarget();
    this.clear();
    Battle.nextChar();
  };
  BattleEnemyCursor.prototype.selectEnemyAsTarget = function() {
    var monsterCss = Util.getCssClass(this.$cursor, "last");
    var monster = Monster.lookupByCss(monsterCss);
    var $enemies = this.$cursor.closest(".enemies").find("." + monsterCss);
    var monsterIndex = $enemies.index(this.$cursor);
  
    BattleCommands.party({target:{name:monster.name, index:monsterIndex, type:BattleCommands.Enemy}});
  };
  BattleEnemyCursor.prototype.yDestinations = function() { return this.$cursor.closest(".column").find(".enemy").not(".dead"); };
  
  /* -------------------- */
  /* BATTLE SPELLS cursor */
  /* -------------------- */
  var BattleSpellCursor = function() {};
  BattleSpellCursor.prototype = new Cursor(self.BATTLE_SPELLS, {container: "#battle .input .spells"});
  BattleSpellCursor.prototype.back = function() {
    this.clear();
    this.toggleSpellList(false);
    Cursors.lookup(Cursors.BATTLE_MENU).startListening({reset:false});
  };
  BattleSpellCursor.prototype.hideSpellList = function() { this.$container.addClass("hidden"); };
  BattleSpellCursor.prototype.initialCursor = function() {
    var $levels = this.$container.find(".spell.level");
    var $spell = $levels.find(".spell").eq(0);
    if ($levels.index($spell.closest(".level")) > 3) {
      $levels.slice(0, 4).toggleClass("hidden");
    }
    return $spell;
  };
  BattleSpellCursor.prototype.next = function() {
    if (this.selectSpell()) {
      this.toggleSpellList(false);
      this.clear();
      Battle.nextChar();
    }
  };
  BattleSpellCursor.prototype.reset = function(fullReset) { fullReset ? Battle.populateSpellList() : this.toggleSpellList(true); };
  BattleSpellCursor.prototype.rowChanged = function(y) {
    var $level = this.$cursor.closest(".level");
    var $levels = this.$container.find(".level");
    var levelIndex = $levels.index($level);
    var $spells = $level.find(".spell");
    var spellIndex = $spells.index(this.$cursor);
    
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
      return this.$cursor;
    }
    
    if (newSpellIndex >= $newSpells.length) {
      newSpellIndex = $newSpells.length - 1;
    }
    
    if (newLevelIndex < 4 && levelIndex >= 4 || newLevelIndex >= 4 && levelIndex < 4) {
      $levels.slice(0, 4).toggleClass("hidden");
    }
    
    return $newSpells.eq(newSpellIndex);
  };
  BattleSpellCursor.prototype.selectCharAsTarget = function(char) {
    BattleCommands.party({target:{type:BattleCommands.Party, char:char}});
    this.clear();
    Battle.nextChar();
  };
  BattleSpellCursor.prototype.selectSpell = function() {
    if (!(this.$cursor) || this.$cursor.length == 0) {
      return false;
    }
    
    var $level = this.$cursor.closest(".level");
    var $levels = this.$container.find(".level");
    var levelIndex = $levels.index($level);
    var spellIndex = $level.find(".spell").index(this.$cursor);
    var char = Party.getChar(BattleCommands.getCharIndex());
    var spellId = char.knownSpells[levelIndex][spellIndex]; 
    var spell = Spell.lookup(spellId);
    if (char.canCastSpell(spell)) {
      BattleCommands.party({spellId:spellId});

      var target = null;
      
      if (spell.isSingleTarget()) {
        this.hide();
        this.hideSpellList();
        if (spell.isSameTargetGroup()) {
          Cursors.lookup(Cursors.BATTLE_PARTY).startListening({prevListener:this});
          return false;
        } else if (spell.isOtherTargetGroup()) { 
          Cursors.lookup(Cursors.BATTLE_ENEMIES).startListening({prevListener:this}); 
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
  BattleSpellCursor.prototype.toggleSpellList = function(shown) { this.$container.toggleClass("hidden", !shown); };
  BattleSpellCursor.prototype.xDestinations = function() { return this.$cursor.closest(".level").find(".spell"); };
  
  
  /* ------------------- */
  /* BATTLE PARTY cursor */
  /* ------------------- */
  var BattlePartyCursor = function() {};
  BattlePartyCursor.prototype = new Cursor(self.BATTLE_PARTY, {container: "#battle .party"});
  BattlePartyCursor.prototype.back = function() {
    KeyPressNotifier.clearListener();
    this.clear();
    this.previousListener.startListening({reset:false});
  }; 
  BattlePartyCursor.prototype.getSelectedChar = function() {
    var $chars = this.$container.find(".char");
    var charIndex = $chars.index(this.$cursor);
    return Party.getChar(charIndex);
  };
  BattlePartyCursor.prototype.initialCursor = function() { return this.$container.find(".char").eq(0); };
  BattlePartyCursor.prototype.next = function() { 
    KeyPressNotifier.clearListener();
    this.previousListener.selectCharAsTarget(this.getSelectedChar());
    this.clear();
  };
  BattlePartyCursor.prototype.yDestinations = function() { return this.$container.find(".char"); };
  
  
  /* --------------------- */
  /* CHARACTER MENU cursor */
  /* --------------------- */
  var CharMenuCursor = function() { this.mode = null; };
  var charMenuCursorOpt = {container: "#charMenu .options", otherKeys:{}};
  charMenuCursorOpt.otherKeys[KeyPressNotifier.I] = function() { this.item(); };
  charMenuCursorOpt.otherKeys[KeyPressNotifier.M] = function() { this.magic(); };
  charMenuCursorOpt.otherKeys[KeyPressNotifier.W] = function() { this.weapon(); };
  charMenuCursorOpt.otherKeys[KeyPressNotifier.A] = function() { this.armor(); };
  charMenuCursorOpt.otherKeys[KeyPressNotifier.S] = function() { this.status(); };
  
  CharMenuCursor.prototype = new Cursor(self.CHAR_MENU, charMenuCursorOpt);
  CharMenuCursor.prototype.back = function() {
    KeyPressNotifier.clearListener();
    this.clear();
    Party.switchView(Party.WORLD_MAP);
    if (this.previousListener) {
      this.previousListener.startListening();
    }
  };
  CharMenuCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
  CharMenuCursor.prototype.next = function() {
    KeyPressNotifier.clearListener();
    this.clear();
    if (this.$cursor.is(".item")) { this.item(); }
    else if (this.$cursor.is(".magic")) { this.magic(); }
    else if (this.$cursor.is(".weapon")) { this.weapon(); }
    else if (this.$cursor.is(".armor")) { this.armor(); }
    else if (this.$cursor.is(".status")) { this.status(); }
  };
  CharMenuCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
  
  CharMenuCursor.prototype.item = function() { Logger.debug("TODO: implement item menu"); };
  CharMenuCursor.prototype.magic = function() { 
    this.clear();
    this.mode = "magic";
    Cursors.lookup(Cursors.CHAR_SELECTION_MENU).startListening({prevListener:this});
  };
  CharMenuCursor.prototype.weapon = function() { 
    Menus.Weapon.load();
    Party.switchView(Party.WEAPON_MENU);
    Cursors.lookup(Cursors.WEAPON_ACTIONS_MENU).startListening();
  };
  CharMenuCursor.prototype.armor = function() {
    Menus.Armor.load();
    Party.switchView(Party.ARMOR_MENU);
    Cursors.lookup(Cursors.ARMOR_ACTIONS_MENU).startListening();
  };
  CharMenuCursor.prototype.status = function() {
    this.clear();
    this.mode = "status";
    Cursors.lookup(Cursors.CHAR_SELECTION_MENU).startListening({prevListener:this});
  };
  
  /* --------------------- */
  /* CHAR SELECTION cursor */
  /* --------------------- */
  var CharSelectionMenuCursor = function() {};
  CharSelectionMenuCursor.prototype = new Cursor(self.CHAR_SELECTION_MENU, {container: "#charMenu .party", otherKeys:{}});
  CharSelectionMenuCursor.prototype.back = function() { 
    KeyPressNotifier.clearListener();
    this.clear();
    Cursors.lookup(Cursors.CHAR_MENU).startListening();
  };
  CharSelectionMenuCursor.prototype.getCursorIndex = function() { return this.$container.find(".char.profile").index(this.$cursor); };
  CharSelectionMenuCursor.prototype.initialCursor = function() { return this.$container.find(".char.profile").eq(0); };
  CharSelectionMenuCursor.prototype.next = function() { 
    KeyPressNotifier.clearListener();
    if (this.previousListener.mode == "magic") {
      Menus.Magic.load(Party.getChar(this.getCursorIndex()));
      Party.switchView(Party.MAGIC_MENU);
      Cursors.lookup(Cursors.MAGIC_MENU).startListening({prevListener:this});
    } else if (this.previousListener.mode == "status") {
      Menus.Status.load(Party.getChar(this.getCursorIndex()));
      Party.switchView(Party.STATUS_MENU);
      Cursors.lookup(Cursors.STATUS_MENU).startListening({prevListener:this});
    }
  };
  CharSelectionMenuCursor.prototype.xDestinations = function() {
    var startIndex = Math.floor(this.getCursorIndex() / 2) * 2; 
    return this.$container.find(".char.profile").slice(startIndex, startIndex + 2); 
  };
  CharSelectionMenuCursor.prototype.yDestinations = function() { return this.$container.find(".char.profile:" + (this.getCursorIndex() % 2 == 0 ? "even" : "odd")); };
  
  /* ------------------------ */
  /* EQUIPMENT ACTIONS cursor */
  /* ------------------------ */
  // base class for weapons/armor
  var EquipmentActionMenuCursor = function(id, opt) { 
    this.id = id; 
    this.action = null;
    this.opt = {otherKeys:{}};
    this.opt.otherKeys[KeyPressNotifier.E] = function() { this.equip(); };
    this.opt.otherKeys[KeyPressNotifier.T] = function() { this.trade(); };
    this.opt.otherKeys[KeyPressNotifier.D] = function() { this.drop(); };
    jQuery.extend(true, this.opt, opt);
    
    var baseCursor = new Cursor(this.id, this.opt);
    jQuery.extend(baseCursor, {
      back : function() {
        KeyPressNotifier.clearListener();
        this.clear();
        Party.switchView(Party.MENU);
        Cursors.lookup(Cursors.CHAR_MENU).startListening();
      },
      initialCursor : function() { return this.$container.find(".text").eq(0); },
      next : function() {
        KeyPressNotifier.clearListener();
        if (this.$cursor.is(".equip")) { this.equip(); }
        else if (this.$cursor.is(".trade")) { this.trade(); }
        else if (this.$cursor.is(".drop")) { this.drop(); }
      },
      nextCursor : opt.nextCursor,
      toNextCursor : function() { 
        KeyPressNotifier.clearListener();
        this.clear();
        Cursors.lookup(this.nextCursor).startListening({action:this.action});
      },
      xDestinations : function() { return this.$container.find(".text"); },
      
      equip : function() { this.action = "equip"; this.toNextCursor(); },
      trade : function() { this.action = "trade"; this.toNextCursor(); },
      drop : function() { this.action = "drop"; this.toNextCursor(); }
    });
    return baseCursor;
  };
  EquipmentActionMenuCursor.prototype = new Cursor(self.ABSTRACT_EQUIPMENT_ACTIONS);
  
  /* --------------------- */
  /* WEAPON ACTIONS cursor */
  /* --------------------- */
  var WeaponActionMenuCursor = function() {};
  WeaponActionMenuCursor.prototype = new EquipmentActionMenuCursor(self.WEAPON_ACTIONS_MENU, {container: "#weaponMenu .actions", nextCursor:self.WEAPONS_MENU});
  
  /* -------------------- */
  /* ARMOR ACTIONS cursor */
  /* -------------------- */
  var ArmorActionMenuCursor = function() {};
  ArmorActionMenuCursor.prototype = new EquipmentActionMenuCursor(self.ARMOR_ACTIONS_MENU, {container: "#armorMenu .actions", nextCursor:self.ARMOR_MENU});
  
  
  /* ---------------- */
  /* EQUIPMENT cursor */
  /* ---------------- */
  // base class for weapons/armor
  var EquipmentMenuCursor = function(id, opt) {
    this.id = id;
    this.opt = {};
    this.action = null;
    this.trading = false;
    this.dropping = false;
    
    jQuery.extend(true, this.opt, opt);
    
    var baseCursor = new Cursor(this.id, this.opt);
    jQuery.extend(baseCursor, {
      addToChar : function(equipment, targetCharIndex, targetEquipmentIndex) {
        if (!equipment) {
          return null;
        }
        var char = Party.getChar(targetCharIndex);
        if (!char) {
          return null;
        }
        
        char.add(equipment.name, targetEquipmentIndex);
      }
     ,back : function() {
        if (this.dropping) {
          this.dropping = false;
          this.toggleFlicker();
          return false;
        } else if (this.trading) {
          this.trading = false;
          this.clear();
          this.stopFlicker();
          
          var $oldCursor = this.$container.find(".originalCursor");
          this.$cursor = $oldCursor.closest(".slot");
          this.$cursor.append(this.create());
          $oldCursor.remove();
          return false;
        }
        KeyPressNotifier.clearListener();
        this.clear();
        Cursors.lookup(this.prevCursor).startListening();
      }
     ,columnChanged : function(y) { 
        var $options = this.$container.find(".slot");
        var index = $options.index(this.$cursor);
       
        if (y > 0) {
          index = (index % 2 == 1) ? index - 1 : index + 1;
        } else {
          index = (index % 2 == 0) ? index + 1 : index - 1;
        }
        
        var $newCursor = $options.eq(index);
        if (this.trading) {
          $newCursor.addClass("flicker");
        }
        
        return $newCursor;
      }
     ,dropConfirm : function(char, index) {
       if (char.lookup(index)) {
         if (char.isEquipped(index)) {
           char.unequip(index);
         }
         char.drop(index);
         this.toggleFlicker();
         this.$cursor
           .find(".equipped").empty().end()
           .find(".equippable").empty();
         this.dropping = false;
       }       
     }
     ,getCharFromCursor : function($cursor) { return this.$chars.index($cursor.closest(".char")); }
     ,getEquipment : function(charIndex) { return this.$chars.eq(charIndex).find(".slot"); }
     ,getEquipmentFromCursor : function($cursor, charIndex) { return this.getEquipment(charIndex).index($cursor); }
     ,init : function() {
       this.$container = $(this.container);
       this.$chars = this.$container.find(".char");
       this.menu = Menus[this.menuId];
      }
     ,initialConfirm : function(charIndex, index) {
       switch (this.action) {
         case "equip":
           var char = Party.getChar(charIndex);
           if (char && char.lookup(index)) {
             var $equipped = this.getEquipment(charIndex).eq(index).find(".equipped");
             char.equippedWeaponIndex == index ? char.unequip(index) : char.equip(index);
             this.menu.reloadChar(Party.getChar(charIndex), this.$chars.eq(charIndex));
             this.rebuildCursor(charIndex, index);
           }
           break;
         case "trade":
           this.trading = true;
           this.$cursor.find(".cursor").removeClass("cursor").addClass("originalCursor");
           this.$cursor.append(this.create());
           this.toggleFlicker();
           break;
         case "drop":
           var char = Party.getChar(charIndex);
           if (char && char.lookup(index)) {
             this.dropping = true;
             this.toggleFlicker();
           }
           break;
       }
     }
     ,initialCursor : function() { return this.$container.find(".slot").eq(0); }
     ,menuId : opt.menuId
     ,next : function() {
        var charIndex = this.getCharFromCursor(this.$cursor); 
        var index =  this.getEquipmentFromCursor(this.$cursor, charIndex);
        var char = Party.getChar(charIndex);
      
        this.switchMode.call(this, char);

        if (char) {
          if (this.dropping) {
            this.dropConfirm(char, index);
          } else if (this.trading) {
            this.tradeConfirm(charIndex, index);
          } else {
            this.initialConfirm(charIndex, index);
          }
        }
      }
     ,prevCursor : opt.prevCursor
     ,rebuildCursor : function(charIndex, equipmentIndex) {
       this.$cursor = this.getEquipment(charIndex).eq(equipmentIndex);
       this.$cursor.append(this.create());
     }
     ,removeFromChar : function(charIndex, equipmentIndex) {
       var char = Party.getChar(charIndex);
       if (!char) {
         return null;
       }
       var equipment = char.lookup(equipmentIndex);
       if (!equipment) {
         return null;
       }
       Logger.debug("unequipped/removed " + equipment.name + " from " + char.getName());
       if (char.isEquipped(equipmentIndex)) {
         char.unequip(equipmentIndex);
       }
       char.drop(equipmentIndex);
       
       return equipment;
     }
     ,reset : function(fullReset, opt) { 
        this.action = opt.action;
        this.trading = false;
        this.dropping = false;
      }
     ,rowChanged : function(x) {
        var $options = this.$container.find(".slot");
        var index = $options.index(this.$cursor);
      
        if (x > 0) {
          index += 2;
        } else {
          index -= 2;
        }
      
        if (index < 0) {
          index = $options.length + index;
        } else if (index >= $options.length) {
          index = index % $options.length;
        }
      
        var $newCursor = $options.eq(index);
        if (this.trading) {
          $newCursor.addClass("flicker");
        }
        
        return $newCursor;
      }
     ,stopFlicker : function() { this.$container.find(".flicker").removeClass("flicker"); }
     ,switchMode : opt.switchMode
     ,toggleFlicker : function() { this.$cursor.toggleClass("flicker"); }
     ,tradeConfirm : function(targetCharIndex, targetEquipmentIndex) {
       var $sourceCursor = this.$container.find(".originalCursor");
       var sourceCharIndex = this.getCharFromCursor($sourceCursor);
       var sourceEquipmentIndex = this.getEquipmentFromCursor($sourceCursor.closest(".slot"), sourceCharIndex);
       
       var sourceEquipment = this.removeFromChar(sourceCharIndex, sourceEquipmentIndex);
       var targetEquipment = this.removeFromChar(targetCharIndex, targetEquipmentIndex);
       
       this.addToChar(sourceEquipment, targetCharIndex, targetEquipmentIndex);
       this.addToChar(targetEquipment, sourceCharIndex, sourceEquipmentIndex);
       
       $sourceCursor.remove();
       this.stopFlicker();
       
       this.menu.reloadChar(Party.getChar(sourceCharIndex), this.$chars.eq(sourceCharIndex));
       this.menu.reloadChar(Party.getChar(targetCharIndex), this.$chars.eq(targetCharIndex));
       
       this.rebuildCursor(targetCharIndex, targetEquipmentIndex);
       
       this.trading = false;
      }
    });
    return baseCursor;
  };
  EquipmentMenuCursor.prototype = new Cursor(self.ABSTRACT_EQUIPMENT);
  
  /* -------------------------------------------- */
  /* ARMOR MENU cursor - handles equip/trade/drop */
  /* -------------------------------------------- */
  var ArmorMenuCursor = function() {};
  ArmorMenuCursor.prototype = new EquipmentMenuCursor(self.ARMOR_MENU, {
    container:"#armorMenu"
   ,menuId:"Armor"
   ,prevCursor:self.ARMOR_ACTIONS_MENU
   ,switchMode:function(char) { char.armor(); }
  });
  
  /* --------------------------------------------- */
  /* WEAPON MENU cursor - handles equip/trade/drop */
  /* --------------------------------------------- */
  var WeaponMenuCursor = function() {};
  WeaponMenuCursor.prototype = new EquipmentMenuCursor(self.WEAPONS_MENU, {
    container:"#weaponMenu"
   ,menuId:"Weapon"
   ,prevCursor:self.WEAPON_ACTIONS_MENU
   ,switchMode:function(char) { char.weapons(); }
  });

  /* ----------------- */
  /* MAGIC MENU cursor */
  /* ----------------- */
  var MagicMenuCursor = function() {};
  MagicMenuCursor.prototype = new Cursor(self.MAGIC_MENU, {container: "#magicMenu .magic", otherKeys:{}});
  MagicMenuCursor.prototype.back = function() { 
    KeyPressNotifier.clearListener();
    this.clear();
    Party.switchView(Party.MENU);
    if (this.previousListener) {
      this.previousListener.startListening({prevListener:this.previousListener.previousListener, reset:false});
    }
  };
  MagicMenuCursor.prototype.initialCursor = function() { return this.$container.find(".spell").eq(0); };
  MagicMenuCursor.prototype.xDestinations = function() { return this.$cursor.closest(".spells").find(".spell"); };
  MagicMenuCursor.prototype.yDestinations = function() { 
    var indexInLevel = this.xDestinations().index(this.$cursor);
    // Yeah this is some crazy selection, but it works
    return this.$container.find(".spell:nth-child(3n - " + (Character.MAX_SPELLS_PER_LEVEL - 1 - indexInLevel) + ")");
  };
  
  /* ------------------ */
  /* STATUS MENU cursor */
  /* ------------------ */
  var StatusMenuCursor = function() {};
  StatusMenuCursor.prototype = new Cursor(self.STATUS_MENU, {otherKeys:{}});
  StatusMenuCursor.prototype.back = function() { 
    KeyPressNotifier.clearListener();
    this.clear();
    Party.switchView(Party.MENU);
    if (this.previousListener) {
      this.previousListener.startListening({prevListener:this.previousListener.previousListener, reset:false});
    }
  };
  StatusMenuCursor.prototype.next = function() { this.back(); } 
  
  /* --------------------- */
  /* EQUIPMENT SHOP cursor */
  /* --------------------- */
  var EquipmentShopCursor = function() {};
  var equipmentShopCursorOpt = {container: "#shop .menu", otherKeys:{}};
  equipmentShopCursorOpt.otherKeys[KeyPressNotifier.B] = function() { this.buy(); };
  equipmentShopCursorOpt.otherKeys[KeyPressNotifier.E] = function() { this.exit(); };
  equipmentShopCursorOpt.otherKeys[KeyPressNotifier.S] = function() { this.sell(); };
  equipmentShopCursorOpt.otherKeys[KeyPressNotifier.X] = function() { this.exit(); };
  EquipmentShopCursor.prototype = new Cursor(self.EQUIPMENT_SHOP, equipmentShopCursorOpt);
  EquipmentShopCursor.prototype.back = function() { 
    KeyPressNotifier.clearListener();
    this.clear();
    Party.exitShop();
  };
  EquipmentShopCursor.prototype.buy = function() { this.back(); }
  EquipmentShopCursor.prototype.exit = function() { this.back(); }
  EquipmentShopCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
  EquipmentShopCursor.prototype.next = function() { this.back(); } 
  EquipmentShopCursor.prototype.sell = function() { this.back(); }
  EquipmentShopCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };

  
  return this;
}).call({});