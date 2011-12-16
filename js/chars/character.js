var Character = (function() {

  var self = this;
  self.MAX_WEAPONS = 4;
  self.MAX_ARMOR = 4;
  self.MAX_SPELLS_PER_LEVEL = 3;
  self.MAX_SPELL_LEVELS = 8;
  
  var state = "";
  var States = {
    WEAPONS: "weapons"
   ,ARMOR: "armor"
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var addArmor = function(char, armorName, index) {
    var armor = Equipment.Armor.lookup(armorName);
    if (char.allArmor.length == self.MAX_ARMOR) {
      Logger.debug(char.getName() + " already has " + self.MAX_ARMOR + " armor pieces, cannot accept more");
      return false;
    }
    
    if (typeof(index) === "undefined") {
      for (var a = 0; a < self.MAX_ARMOR; a++) {
        if (!char.allArmor[a]) {
          char.allArmor[a] = armor;
          break;
        }
      }
    } else {
      char.allArmor[index] = armor;
    }
    return true;
  };
  
  var addWeapon = function(char, weaponName, index) {
    var weapon = Equipment.Weapon.lookup(weaponName);
    if (char.allWeapons.length == self.MAX_WEAPONS) {
      Logger.debug(char.getName() + " already has " + self.MAX_WEAPONS + " weapons, cannot accept more");
      return false;
    }
    
    if (typeof(index) === "undefined") {
      for (var w = 0; w < self.MAX_WEAPONS; w++) {
        if (!char.allWeapons[w]) {
          char.allWeapons[w] = weapon;
          break;
        }
      }
    } else {
      char.allWeapons[index] = weapon;
    }
    return true;
  };
  
  var equipArmorToggle = function(char, index) {
    var armor = char.allArmor[index];
    if (!armor) {
      return false;
    }
    if (!char.canEquip(armor.name)) {
      alert(char.getName() + " with a class of [" + char.currentClass.name + "] is not allowed to equip " + armor.name);
      return false;
    }
    
    // Only unequip other armor of the same type if we are equipping something
    if (!char.isEquipped(index)) {
      unequipArmorOfType(char, armor.type);
    }
    char.equippedArmorIndexes ^= Math.pow(2, index);
    resetArmorResistances(char);
  };
  
  var equipWeapon = function(char, index) {
    var weapon = char.allWeapons[index];
    if (!weapon) {
      return false;
    }
    if (!char.canEquip(weapon.name)) {
      Logger.debug(char.getName() + " with a class of [" + char.currentClass.name + "] is not allowed to equip a " + weapon.name);
      return false;
    }
    
    char.equippedWeaponIndex = index;
    return true;
  };
  
  var resetArmorResistances = function(char) {
    for (var e in char.resistedElements) {
      char.resistedElements[e] = false;
    }
    var armor = char.equippedArmor();
    for (var a = 0, n = armor.length; a < n; a++) {
      for (var e = 0; e < armor[a].element.length; e++) {
        char.resistedElements[armor[a].element[e]] = true;
      }
    }
  };
  
  var unequipArmorOfType = function(char, armorType) {
    for (var a = 0; a < self.MAX_ARMOR; a++) {
      var armor = char.allArmor[a];
      if (armor && armor.type == armorType && char.isEquipped(a)) {
        equipArmorToggle(char, a);
      }
    }
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  function Char() {
    this.currentClass = null;
    this.charName = "";
    this.charLevel = 1;
    this.hitPoints = 0;
    this.maxHitPoints = 0;
    this.strength = 0;
    this.agility = 0;
    this.vitality = 0;
    this.intelligence = 0;
    this.luck = 0;
    this.baseHit = 0;
    this.magicDef = 0;
    this.hitMultiplier = 1;  // can be manipulated by SLOW/FAST
    this.spellDef = 0; // can be manipulated by FOG/FOG2
    this.spellAttack = 0; // can be manipulated by TMPR/SABR
    this.spellEvasion = 0; // can be manipulated by RUSE/LOCK/LOK2/INVS/INV2
    this.spellHit = 0; // can be manipulated by SABR
    this.charges = [0,0,0,0,0,0,0,0];
    this.maxCharges = [0,0,0,0,0,0,0,0];
    this.knownSpells = [];
    this.equippedWeaponIndex = -1;
    this.allWeapons = [];
    this.equippedArmorIndexes = 0;
    this.allArmor = [];
    this.resistedElements = {};
    this.weakElements = {};
    this.currentStatuses = {};
    this.experience = 0;
    this.charIndex = -1;
  };
  
  // This is a sub-class of Target
  Char.prototype = Target.create();
  
  // --------------------------------
  // Overridden methods (from Target)
  // --------------------------------
  Char.prototype.addStatus = function(status) { 
    if (status.id == Status.Dead.id) {
      this.hitPoints = 0;
      for (var s in this.currentStatuses) {
        this.currentStatuses[s] = false;
      }
    }
    this.currentStatuses[status.id] = true;
    return this; 
  };
  Char.prototype.applyDamage = function(dmg) {
    this.hitPoints -= dmg;
    if (this.hitPoints <= 0) {
      this.addStatus(Status.Dead);
    } else if (this.hitPoints > this.maxHitPoints) {
      this.hitPoints = this.maxHitPoints;
    }
  };
  Char.prototype.attack = function() { return this.currentClass.attack(this); };
  Char.prototype.attacksWithElement = function(element) { 
    if (this.equippedWeapon()) {
      return jQuery.inArray(element, this.equippedWeapon().elements) > -1;
    }
    return false;
  };
  Char.prototype.critical = function() { return this.currentClass.critical(this); };
  Char.prototype.defense = function() { return this.currentClass.defense(this); };
  Char.prototype.evasion = function() { return this.currentClass.evasion(this); };
  Char.prototype.getMaxHitPoints = function() { return this.maxHitPoints; };
  Char.prototype.getName = function() { return this.charName; };
  Char.prototype.getStatusAttack = function() { return null; };
  Char.prototype.hasStatus = function(status) { return this.currentStatuses[status.id]; };
  Char.prototype.hitPercent = function() { return this.currentClass.hitPercent(this); };
  Char.prototype.isDead = function() { 
    var d = this.hasStatus(Status.Dead); 
    return (d == null ? false : d); 
  };
  Char.prototype.isMonsterType = function(type) { return false; };
  Char.prototype.isProtectedFrom = function(element) { return this.resistedElements[element]; };
  Char.prototype.isStrongAgainstMonsterType = function(type) { 
    if (this.equippedWeapon()) {
      return jQuery.inArray(type, this.equippedWeapon().monsterTypes) > -1;
    }
    return false;
  };
  Char.prototype.isWeakToElement = function(element) { return this.weakElements[element]; };
  Char.prototype.magicDefense = function() { return this.magicDef; };
  Char.prototype.numHits = function() { return this.currentClass.numHits(this); };
  Char.prototype.removeStatus = function(status) { 
    this.currentStatuses[status.id] = false;
    return this;
  };
  
  var setStats = function(currentChar, stats) {
    if (!stats) {
      return;
    }
    currentChar.strength = stats.str;
    currentChar.agility = stats.agi;
    currentChar.vitality = stats.vit;
    currentChar.intelligence = stats.int;
    currentChar.luck = stats.luck;
    currentChar.baseHit = stats.hit;
    currentChar.magicDef = stats.magicDef;
  };
  
  var equippedToString = function(a) {
    var s = "";
    jQuery(a).each(function(i) { s += (i > 0 ? "," : "") + this.name; });
    return s;
  };
    
  // ----------------------------------
  // SETTER methods - supports chaining 
  // ----------------------------------
  Char.prototype.name = function(n) { this.charName = n; return this; };
  Char.prototype.level = function(l) { this.charLevel = l; return this; };
  Char.prototype.hp = function(max, h) { 
    this.maxHitPoints = max; 
    this.hitPoints = (h == null ? this.maxHitPoints : h); 
    return this; 
  };
  Char.prototype.healFully = function() { this.hitPoints = this.maxHitPoints; return this; };
  Char.prototype.resurrect = function() {
    this.removeStatus(Status.Dead);
    this.hitPoints = 1;
    return this;
  };
  Char.prototype.stats = function(s) { setStats(this, s); return this; };
  Char.prototype.spellCharges = function(c) { this.charges = c; return this; };
  Char.prototype.addSpellCharge = function(level) { this.charges[level - 1]++; return this; };
  Char.prototype.maxSpellCharges = function(c) { this.maxCharges = c; return this; };
  Char.prototype.addMaxSpellCharge = function(level) { this.maxCharges[level - 1]++; return this; };
  Char.prototype.useSpellCharge = function(spellLevel) {
    if (this.hasSpellCharge(spellLevel)) {
      this.charges[spellLevel - 1]--;
    }
  };
  Char.prototype.refillSpellCharges = function() { this.charges = jQuery.merge([], this.maxCharges); return this; };
  Char.prototype.charClass = function(c) { this.currentClass = CharacterClass.lookup(c); return this; };
  Char.prototype.addExperience = function(exp) { this.experience += exp; return this; };
  Char.prototype.index = function(i) { this.charIndex = i; return this; };

  /* ------------------------------------- */
  /* EQUIPMENT methods - supports chaining */
  /* ------------------------------------- */
  Char.prototype.weapons = function() { state = States.WEAPONS; return this; };
  Char.prototype.armor = function() { state = States.ARMOR; return this; };
  Char.prototype.lookup = function(index) {
    switch (state) {
      case States.WEAPONS: return this.allWeapons[index];
      case States.ARMOR: return this.allArmor[index];
    }
    return null;
  };
  Char.prototype.add = function(name, index) {
    switch (state) {
      case States.WEAPONS:
        addWeapon(this, name, index);
        break;
      case States.ARMOR:
        addArmor(this, name, index);
        break;
    }
    return this;
  };
  Char.prototype.drop = function(index) {
    var equipment = null;
    switch (state) {
      case States.WEAPONS: equipment = this.allWeapons[index] = null; break;
      case States.ARMOR: equipment = this.allArmor[index] = null; break;
    }
    return this;
  };
  Char.prototype.equip = function(index) {
    switch (state) {
      case States.WEAPONS:
        equipWeapon(this, index);
        break;
      case States.ARMOR:
        equipArmorToggle(this, index);
        break;
    }
    return this;
  };
  Char.prototype.equipAll = function() {
    switch (state) {
      case States.WEAPONS: // nothing to do 
        break;
      case States.ARMOR:
        for (var a = 0; a < this.allArmor.length; a++) {
          equipArmorToggle(this, a);
        }
        break;
    }
  return this;
  };
  Char.prototype.unequip = function(index) {
    switch (state) {
      case States.WEAPONS:
        this.equippedWeaponIndex = -1;
        break;
      case States.ARMOR:
        equipArmorToggle(this, index);
        break;
    }
    return this;
  };
  Char.prototype.canEquip = function(name) {
    var equippable = null;
    switch (state) {
      case States.WEAPONS:
        equippable = Equipment.Weapon.lookup(name);
        break;
      case States.ARMOR:
        equippable = Equipment.Armor.lookup(name);
        break;
    }
    return (jQuery.inArray(this.currentClass.name, equippable.allowedClasses) > -1);
  };
  
  Char.prototype.equippedWeapon = function() {
    return this.equippedWeaponIndex < 0 ? null : this.weapons().lookup(this.equippedWeaponIndex);
  };
  Char.prototype.equippedArmor = function() {
    var armor = [];
    for (var a = 0; a < self.MAX_ARMOR; a++) {
      if (this.isEquipped(a)) {
        armor.push(this.allArmor[a]);
      }
    }
    return armor;
  };
  
  Char.prototype.armorWeight = function() {
    var totalWeight = 0;
    this.armor();
    jQuery.each(this.equippedArmor(), function(i, armor) { 
      totalWeight += armor.weight; 
    });
    return totalWeight;
  };
  
  Char.prototype.isEquipped = function(index) {
    var equipped = false;
    switch (state) {
      case States.WEAPONS:
        equipped = (this.equippedWeaponIndex == index);
        break;
      case States.ARMOR:
        equipped = !!(this.equippedArmorIndexes & Math.pow(2, index));
        break;
    }
    return equipped;
  };
  
  Char.prototype.getEquipment = function() {
    switch (state) {
      case States.WEAPONS:
        return this.allWeapons;
        break;
      case States.ARMOR:
        return this.allArmor;
        break;
    }
    return null;
  };
  
  Char.prototype.hasEquipment = function() {
    var equipment = null;
    switch (state) {
      case States.WEAPONS:
        equipment = this.allWeapons;
          break;
        case States.ARMOR:
          equipment = this.allArmor;
          break;
    }
    
    if (!equipment || equipment.length == 0) {
      return false;
    }
    
    for (var i = 0; i < equipment.length; i++) {
      if (!!equipment[i]) {
        return true;
      }
    }
    return false;
  };
  
  // --------------
  // GETTER methods
  // --------------
  Char.prototype.getStatuses = function() {
    var allStatuses = [];
    for (var s in this.currentStatuses) {
      if (this.currentStatuses[s]) {
        allStatuses.push(s);
      }
    }
    return allStatuses;
  };
  
  Char.prototype.elementsProtectedFrom = function() { 
    var protectedFrom = [];
    for (var e in this.resistedElements) {
      if (this.resistedElements[e]) {
        protectedFrom.push(e);
      }
    }
    return protectedFrom;
  };
  
  Char.prototype.isSpellAllowed = function(spell) {
    return (jQuery.inArray(this.currentClass.name, spell.allowedClasses) > -1);
  };
  
  Char.prototype.knowsSpell = function(spell) {
    if (!this.knownSpells[spell.spellLevel - 1]) {
      return false;
    }
    return jQuery.inArray(spell.spellId, this.knownSpells[spell.spellLevel - 1]) > -1;
  };
  
  Char.prototype.canCastSpell = function(spell) {
    return this.hasSpellCharge(spell.spellLevel) && this.isSpellAllowed(spell) && this.knowsSpell(spell); 
  };
  
  Char.prototype.hasSpellCharge = function(spellLevel) { 
    return (this.charges[spellLevel - 1] != null && this.charges[spellLevel - 1] > 0); 
  };
  
  Char.prototype.canLearnSpell = function(spell) {
    return this.isSpellAllowed(spell) && (!this.knownSpells[spell.spellLevel - 1] || this.knownSpells[spell.spellLevel - 1].length < 3);
  };
  
  Char.prototype.canUseMagic = function() {
    return this.currentClass.canUseMagic;
  };
  
  Char.prototype.learnSpell = function(spell) {
    if (!this.knownSpells[spell.spellLevel - 1]) {
      this.knownSpells[spell.spellLevel - 1] = [];
    }
    this.knownSpells[spell.spellLevel - 1].push(spell.spellId);
    return this;
  };
  
  Char.prototype.hasItemForSpell = function(spellId) { 
    return this.getItemForSpell(spellId) != null; 
  };
  
  Char.prototype.getItemForSpell = function(spellId) {
    for (var w in this.allWeapons) {
      var weapon = this.allWeapons[w];
      if (weapon.hasSpell && weapon.spell == spellId) {
        return weapon;
      }
    }
    for (var a = 0; a < this.allArmor.length; a++) {
      var armor = this.allArmor[a];
      if (armor.hasSpell && armor.spell == spellId) {
        return armor;
      }
    }
    return null; 
  };
  
  Char.prototype.isCritical = function(hp) {
    if (hp == null) {
      hp = this.hitPoints;
    }
    return hp > 0 && (hp / this.maxHitPoints) <= 0.25; 
  };
  Char.prototype.isAlive = function() { return !this.isDead() && !this.hasStatus(Status.Stone); };
  Char.prototype.hasCriticalStatus = function() { 
    var anyCriticalStatus = false;
    jQuery.each(this.currentStatuses, function(id, hasStatus) {
      if (hasStatus && Status.lookup(id).critical) {
        anyCriticalStatus = true;
      }
    });
    return anyCriticalStatus;
  };
  Char.prototype.getBattleStatus = function() {
    var battleStatus = "";
    jQuery.each(this.currentStatuses, function(id, hasStatus) {
      if (hasStatus && !!Status.lookup(id).battleText) {
        // last status applied wins
        battleStatus = Status.lookup(id);
      }
    });
    return battleStatus;
  };
  Char.prototype.canTakeAction = function() {
    var actionAllowed = true;
    jQuery.each(this.currentStatuses, function(id, hasStatus) {
      if (hasStatus && !Status.lookup(id).canTakeAction) {
        actionAllowed = false;
      }
    });
    return actionAllowed;
  };
  
  // -----------------------------------------------
  // Methods that change the state of this character
  // -----------------------------------------------
  Char.prototype.protectFrom = function(element) { 
    this.resistedElements[element] = true; 
  };
  
  Char.prototype.weakTo = function(element, removeResistance) { 
    this.weakElements[element] = true; 
    if (removeResistance) {
      this.resistedElements[element] = false;
    }
  };
  
  Char.prototype.applyChanges = function(changes) {
    this.hitPoints = changes.hp;
    this.hitMultiplier = changes.hitMultiplier;
    this.spellDef = changes.spellDef; 
    this.spellAttack = changes.spellAttack; 
    this.spellEvasion = changes.spellEvasion;
    this.spellHit = changes.spellHit;
    this.spellCharges(changes.spellCharges);
    
    for (var s in changes.statuses) {
      this.currentStatuses[changes.statuses[s]] = true;
    }
    for (var e in changes.elementsProtectedFrom) {
      this.resistedElements[changes.elementsProtectedFrom[e]] = true;
    }
  };

  // ----------------------------------------
  // Textual representation methods (toString)
  // ----------------------------------------
  Char.prototype.toString = function() { return this.getName() + " - " + this.hitPoints + "," + this.maxHitPoints; };
  Char.prototype.toStringFull = function() {
    var s = "";
    s += this.charName + " - " + this.currentClass.name + ", ";
    s += this.hitPoints + "/" + this.maxHitPoints + " HP\n";
    s += "Str:" + this.strength + ",";
    s += "Agi:" + this.agility + ",";
    s += "Vit:" + this.vitality + ",";
    s += "Int:" + this.intelligence + ",";
    s += "Luck:" + this.luck + ",";
    s += "Hit%:" + this.baseHit + ",";
    s += "MagicDef:" + this.magicDef + "\n";
    s += "Exp:" + this.experience + ",";
    s += "Level:" + this.charLevel + ",";
    s += "Exp for next level:" + CharacterGrowth.experienceForNextLevel(this) + "\n";
    s += "Attack:" + this.attack() + ", ";
    s += "Defense:" + this.defense() + ", ";
    s += "Hit%:" + this.hitPercent() + ", ";
    s += "Evasion:" + this.evasion() + ", ";
    s += "# hits:" + this.numHits() + ", ";
    s += "Critical%:" + this.critical() + "\n";
    s += "Spell Charges:" + this.spellChargesToString(this.charges) + "\n";
    s += "Max Spell Charges:" + this.spellChargesToString(this.maxCharges) + "\n";
    s += "Equipped weapon: " + (this.equippedWeapon() != null ? this.equippedWeapon().name : "none") + "\n";
    s += "Equipped armor: " + (this.equippedArmor.length > 0 ? equippedToString(this.equippedArmor) : "none") + "\n";
    s += "All weapons: " + (this.allWeapons.length > 0 ? equippedToString(this.allWeapons) : "none") + ", ";
    s += "All armor: " + (this.allArmor.length > 0 ? equippedToString(this.allArmor) : "none") + "\n";
    s += "Elements protected from: " + (this.elementsProtectedFrom().length > 0 ? this.elementsProtectedFrom().join(", ") : "none") + "\n"
    return s;
  };
  
  Char.prototype.spellChargesToString = function(ch) {
    var c = "";
    if (ch.length == 0) { return "none"; }
    var n = 0;
    jQuery(ch).each(function() { n += this; });
    if (n == 0) { return "none"; }
    return ch.join("/");
  };
  
  Char.prototype.statusesToString = function() { 
    return (this.getStatuses().length == 0 ? "[none]" : this.getStatuses().join(",")); 
  };

  this.create = function() { return new Char(); };
  
  return this;    
}).call({});