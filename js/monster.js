var Monster = (function() {
  
  var ALL = {};
  var index = 0;
  var Types = {
    Magical : "magical"
   ,Dragon : "dragon"
   ,Giant : "giant"
   ,Undead : "undead"
   ,Were : "were"
   ,Aquatic : "aquatic"
   ,Mage : "mage"
   ,Regenerative : "regen"
  };
  
  function MonsterBase(opt) {
    var types = opt.type || [];
    var stats = opt.stats || {};
    var rewards = opt.rewards || {exp:1, gold:0};
    var specialAttacks = opt.specialAttacks || {};
    var elements = opt.elements || {weakTo:[], resists:[]};
    var magic = opt.magic || {};
    var skills = opt.skills || {};
    var ui = opt.ui || {size:"", cssClass:""};
    
    this.name = opt.names.original;
    this.otherNames = {};
    for (var n in opt.names.other) {
      this.otherNames[n] = opt.names.other[n];
    }
    
    this.types = jQuery.merge([], jQuery.isArray(opt.type) ? opt.type : jQuery.makeArray(opt.type));
    this.hp = stats.hp;
    this.attack = stats.atk;
    this.accuracy = stats.acc;
    this.numHits = stats.hits;
    this.criticalRate = stats.crt;
    this.defense = stats.def;
    this.evasion = stats.eva;
    this.magicDef = stats.md;
    this.morale = stats.mor;
    
    this.gold = rewards.gold;
    this.exp = rewards.exp;
    
    this.attackStatus = specialAttacks.status;
    this.attackElement = specialAttacks.element;
    
    this.elementsWeakTo = {}; 
    this.elementsResisted = {}; 
    
    for (var e in elements.weakTo) {
      this.elementsWeakTo[elements.weakTo[e]] = true;
    }
    for (var e in elements.resists) {
      this.elementsResisted[elements.resists[e]] = true;
    }
    
    this.magic = magic.order;
    this.magicChance = magic.chance;
    this.skills = skills.order;
    this.skillChance = skills.chance;
    
    this.size = ui.size;
    this.cssClass = ui.cssClass;
    
    this.index = ++index;
    
    ALL[this.name] = this;
  };
  
  MonsterBase.prototype.isType = function(type) {
    return (jQuery.inArray(type, this.types) > -1);
  };
  
  MonsterBase.prototype.isProtectedFrom = function(element) { 
    return this.elementsResisted[element]; 
  };
  
  MonsterBase.prototype.isWeakTo = function(element) { 
    return this.elementsWeakTo[element]; 
  };
  
  var create = function(opt) {
    new MonsterBase(opt);
  };
  
  return {
    lookup : function(name) { return ALL[name]; }
   ,create : create
   ,Types : Types
   ,All : ALL
  };
})();