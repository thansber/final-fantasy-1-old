define( /* CharacterClass */ function() {
return (function() {
  
  var self = this;
  var ALL = {};
  
  this.All = ALL;
  this.FIGHTER = "fighter";
  this.KNIGHT = "knight";
  this.THIEF = "thief";
  this.NINJA = "ninja";
  this.BLACKBELT = "blackbelt";
  this.MASTER = "master";
  this.RED_MAGE = "redmage";
  this.RED_WIZARD = "redwizard";
  this.WHITE_MAGE = "whitemage";
  this.WHITE_WIZARD = "whitewizard";
  this.BLACK_MAGE = "blackmage";
  this.BLACK_WIZARD = "blackwizard";
  
  this.fullClassNames = {};
  this.fullClassNames[this.FIGHTER] = "Fighter";
  this.fullClassNames[this.KNIGHT] = "Knight";
  this.fullClassNames[this.THIEF] = "Thief";
  this.fullClassNames[this.NINJA] = "Ninja";
  this.fullClassNames[this.BLACKBELT] = "Black Belt";
  this.fullClassNames[this.MASTER] = "Master";
  this.fullClassNames[this.RED_MAGE] = "Red Mage";
  this.fullClassNames[this.RED_WIZARD] = "Red Wizard";
  this.fullClassNames[this.WHITE_MAGE] = "White Mage";
  this.fullClassNames[this.WHITE_WIZARD] = "White Wizard";
  this.fullClassNames[this.BLACK_MAGE] = "Black Mage";
  this.fullClassNames[this.BLACK_WIZARD] = "Black Wizard";
  
  this.startingClasses = [];
  this.startingClasses.push(this.FIGHTER);
  this.startingClasses.push(this.THIEF);
  this.startingClasses.push(this.BLACKBELT);
  this.startingClasses.push(this.RED_MAGE);
  this.startingClasses.push(this.WHITE_MAGE);
  this.startingClasses.push(this.BLACK_MAGE);
  
  this.descriptions = {};
  this.descriptions[this.FIGHTER] = "FIGHTER";
  this.descriptions[this.KNIGHT] = "KNIGHT";
  this.descriptions[this.THIEF] = "THIEF";
  this.descriptions[this.NINJA] = "NINJA";
  this.descriptions[this.BLACKBELT] = "Bl.BELT";
  this.descriptions[this.MASTER] = "MASTER";
  this.descriptions[this.RED_MAGE] = "RedMAGE";
  this.descriptions[this.RED_WIZARD] = "RedWiz";
  this.descriptions[this.WHITE_MAGE] = "Wh.MAGE";
  this.descriptions[this.WHITE_WIZARD] = "Wh.Wiz";
  this.descriptions[this.BLACK_MAGE] = "Bl.MAGE";
  this.descriptions[this.BLACK_WIZARD] = "Bl.Wiz";
  
  function CharClass(name, opt) {
    opt = jQuery.extend(true, {canUseMagic:true}, opt);
    this.name = name;
    this.canUseMagic = opt.canUseMagic;
    ALL[this.name] = this; 
  };
  CharClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon() == null ? 0 : char.equippedWeapon().attack) + (char.strength / 2)); 
  };
  CharClass.prototype.defense = function(char) { 
    var d = char.spellDef;
    for (var a in char.equippedArmor) { d += char.equippedArmor[a].defense; }
    return d;
  };
  CharClass.prototype.hitPercent = function(char) { 
    return (char.baseHit + char.spellHit + (char.equippedWeapon() == null ? 0 : char.equippedWeapon().hitPercent)); 
  };
  CharClass.prototype.evasion = function(char) { 
    var e = char.spellEvasion + (48 + char.agility - char.armorWeight()); 
    if (e < 0) { return 0; }
    if (e > 255) { return 255; }
    return e; 
  };
  CharClass.prototype.numHits = function(char) { 
    var h = Math.floor((char.currentClass.hitPercent(char) - char.spellHit) / 32);
    h += 1;
    h *= char.hitMultiplier;
    return (h <= 0 ? 1 : h);
  };
  CharClass.prototype.critical = function(char) { 
    return (char.equippedWeapon() == null ? 0 : char.equippedWeapon().criticalPercent); 
  };
  CharClass.prototype.isMartialArtist = function() { return false; }
  
  function FighterClass() {}; 
  FighterClass.prototype = new CharClass(this.FIGHTER, {canUseMagic:false});
  
  function KnightClass() {}; 
  KnightClass.prototype = new CharClass(this.KNIGHT);
  
  function BlackBeltClass() {}; 
  BlackBeltClass.prototype = new CharClass(this.BLACKBELT, {canUseMagic:false});
  BlackBeltClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon() == null ? (char.charLevel * 2) : char.equippedWeapon().attack + (char.strength / 2) + 1)); 
  };
  BlackBeltClass.prototype.defense = function(char) {
    var anyArmorEquipped = false;
    for (var a in char.equippedArmor) { anyArmorEquipped = true; }
    if (!anyArmorEquipped) {
      return char.charLevel + char.spellDef;
    }
    var d = char.spellDef;
    for (var a in char.equippedArmor) { d += char.equippedArmor[a].defense; } 
    return d;
  };
  BlackBeltClass.prototype.numHits = function(char) { 
    var h = Math.floor(char.currentClass.hitPercent(char) / 32);
    h += 1;
    h *= char.hitMultiplier;
    h *= 2;
    return (h <= 0 ? 1 : h);
  };
  BlackBeltClass.prototype.critical = function(char) { 
    return (char.equippedWeapon() == null ? char.charLevel * 2 : char.equippedWeapon().criticalPercent); 
  };
  BlackBeltClass.prototype.isMartialArtist = function() { return true; }

  function MasterClass() { 
    this.name = self.MASTER; 
    ALL[this.name] = this; 
  }; 
  MasterClass.prototype = new BlackBeltClass();
  
  function ThiefClass() {}; 
  ThiefClass.prototype = new CharClass(this.THIEF, {canUseMagic:false});
  
  function NinjaClass() {}; 
  NinjaClass.prototype = new CharClass(this.NINJA);
  
  function RedMageClass() {}; 
  RedMageClass.prototype = new CharClass(this.RED_MAGE);
  
  function RedWizardClass() {}; 
  RedWizardClass.prototype = new CharClass(this.RED_WIZARD);
  
  function WhiteMageClass() {}; 
  WhiteMageClass.prototype = new CharClass(this.WHITE_MAGE);
  
  function WhiteWizardClass() {}; 
  WhiteWizardClass.prototype = new CharClass(this.WHITE_WIZARD);
  
  function BlackMageClass() {}; 
  BlackMageClass.prototype = new CharClass(this.BLACK_MAGE);
  BlackMageClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon() == null ? 0 : char.equippedWeapon().attack) + (char.strength / 2) + 1); 
  };    
  function BlackWizardClass() { 
    this.name = self.BLACK_WIZARD; 
    ALL[this.name] = this; 
  }; 
  BlackWizardClass.prototype = new BlackMageClass();
  
  new FighterClass();
  new KnightClass();
  new BlackBeltClass();
  new MasterClass();
  new ThiefClass();
  new NinjaClass();
  new RedMageClass();
  new RedWizardClass();
  new WhiteMageClass();
  new WhiteWizardClass();
  new BlackMageClass();
  new BlackWizardClass();
  
  this.lookup = function(id) { return ALL[id]; };
  
  return this;
}).call({})
});