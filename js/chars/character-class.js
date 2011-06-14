var CharacterClass = (function() {
  
  var ALL = {};
  
  var FIGHTER = "fighter";
  var KNIGHT = "knight";
  var THIEF = "thief";
  var NINJA = "ninja";
  var BLACKBELT = "blackbelt";
  var MASTER = "master";
  var RED_MAGE = "redmage";
  var RED_WIZARD = "redwizard";
  var WHITE_MAGE = "whitemage";
  var WHITE_WIZARD = "whitewizard";
  var BLACK_MAGE = "blackmage";
  var BLACK_WIZARD = "blackwizard";
  
  var fullClassNames = {};
  fullClassNames[FIGHTER] = "Fighter";
  fullClassNames[KNIGHT] = "Knight";
  fullClassNames[THIEF] = "Thief";
  fullClassNames[NINJA] = "Ninja";
  fullClassNames[BLACKBELT] = "Black Belt";
  fullClassNames[MASTER] = "Master";
  fullClassNames[RED_MAGE] = "Red Mage";
  fullClassNames[RED_WIZARD] = "Red Wizard";
  fullClassNames[WHITE_MAGE] = "White Mage";
  fullClassNames[WHITE_WIZARD] = "White Wizard";
  fullClassNames[BLACK_MAGE] = "Black Mage";
  fullClassNames[BLACK_WIZARD] = "Black Wizard";
  
  function CharClass(name) { 
    this.name = name; 
    ALL[this.name] = this; 
  };
  CharClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon ? char.equippedWeapon.attack : 0) + (char.strength / 2)); 
  };
  CharClass.prototype.defense = function(char) { 
    var d = char.spellDef;
    jQuery(char.equippedArmor).each(function() { d += this.defense; }); 
    return d;
  };
  CharClass.prototype.hitPercent = function(char) { 
    return (char.baseHit + char.spellHit + (char.equippedWeapon == null ? 0 : char.equippedWeapon.hitPercent)); 
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
    return (char.equippedWeapon == null ? 0 : char.equippedWeapon.criticalPercent); 
  };
  
  function FighterClass() {}; 
  FighterClass.prototype = new CharClass(FIGHTER);
  
  function KnightClass() {}; 
  KnightClass.prototype = new CharClass(KNIGHT);
  
  function BlackBeltClass() {}; 
  BlackBeltClass.prototype = new CharClass(BLACKBELT);
  BlackBeltClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon ? char.equippedWeapon.attack + (char.strength / 2) + 1 : (char.charLevel * 2))); 
  };
  BlackBeltClass.prototype.defense = function(char) { 
    if (char.equippedArmor.length == 0) {
      return char.charLevel + char.spellDef;
    }
    var d = char.spellDef;
    jQuery(char.equippedArmor).each(function() { d += this.defense; }); 
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
    return (char.equippedWeapon == null ? char.charLevel * 2 : char.equippedWeapon.criticalPercent); 
  };

  function MasterClass() { 
    this.name = MASTER; 
    ALL[this.name] = this; 
  }; 
  MasterClass.prototype = new BlackBeltClass();
  
  function ThiefClass() {}; 
  ThiefClass.prototype = new CharClass(THIEF);
  
  function NinjaClass() {}; 
  NinjaClass.prototype = new CharClass(NINJA);
  
  function RedMageClass() {}; 
  RedMageClass.prototype = new CharClass(RED_MAGE);
  
  function RedWizardClass() {}; 
  RedWizardClass.prototype = new CharClass(RED_WIZARD);
  
  function WhiteMageClass() {}; 
  WhiteMageClass.prototype = new CharClass(WHITE_MAGE);
  
  function WhiteWizardClass() {}; 
  WhiteWizardClass.prototype = new CharClass(WHITE_WIZARD);
  
  function BlackMageClass() {}; 
  BlackMageClass.prototype = new CharClass(BLACK_MAGE);
  BlackMageClass.prototype.attack = function(char) { 
    return Math.floor(char.spellAttack + (char.equippedWeapon ? char.equippedWeapon.attack : 0) + (char.strength / 2) + 1); 
  };    
  function BlackWizardClass() { 
    this.name = BLACK_WIZARD; 
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
  
  var lookup = function(id) { return ALL[id]; };
  
  return {
    lookup : lookup
    
   ,FIGHTER : FIGHTER
   ,KNIGHT : KNIGHT
   ,THIEF : THIEF
   ,NINJA : NINJA
   ,BLACKBELT : BLACKBELT
   ,MASTER : MASTER
   ,RED_MAGE : RED_MAGE 
   ,RED_WIZARD : RED_WIZARD 
   ,WHITE_MAGE : WHITE_MAGE 
   ,WHITE_WIZARD : WHITE_WIZARD 
   ,BLACK_MAGE : BLACK_MAGE 
   ,BLACK_WIZARD : BLACK_WIZARD
    
   ,fullClassNames : fullClassNames
  };
})();