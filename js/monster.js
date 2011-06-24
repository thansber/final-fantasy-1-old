var Monster = (function() {
  
  var ALL = {};
  var ALL_BY_CSS = {};
  
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
    this.maxHp = stats.hp;
    this.attack = stats.atk;
    this.accuracy = stats.acc;
    this.numHits = stats.hits;
    this.criticalRate = stats.crt;
    this.defense = stats.def;
    this.evasion = stats.eva;
    this.magicDef = stats.md;
    this.morale = stats.mor;
    
    this.currentStatuses = {};
    
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
    this.magicIndex = -1;
    this.skills = skills.order;
    this.skillChance = skills.chance;
    this.skillIndex = -1;
    
    this.size = ui.size;
    this.cssClass = ui.cssClass;
    
    this.index = ++index;
    
    ALL[this.name] = this;
    ALL_BY_CSS[this.cssClass] = this;
  };
  
  MonsterBase.prototype = Target.create();
  
  // --------------------------------
  // Overridden methods (from Target)
  // --------------------------------
  MonsterBase.prototype.addStatus = function(status) { 
    if (status.id == Status.Dead.id) {
      this.hp = 0;
      for (var s in this.currentStatuses) {
        this.currentStatuses[s] = false;
      }
    }
    this.currentStatuses[status.id] = true;
    return this; 
  };
  MonsterBase.prototype.getName = function() { return this.name; };
  MonsterBase.prototype.hasStatus = function(status) { 
    return this.currentStatuses[status.id]; 
  };
  MonsterBase.prototype.isDead = function() { 
    var d = this.hasStatus(Status.Dead); 
    return (d == null ? false : d); 
  };
  MonsterBase.prototype.removeStatus = function(status) { 
    this.currentStatuses[status.id] = false;
    return this;
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
  
  MonsterBase.prototype.determineAction = function() {
    if (this.isRunningAway()) {
      return { source:this, action:BattleCommands.Run };
    }
    
    if (this.isCastingSpell()) {
      var spellId = this.getNextSpell();
      var spell = Spell.lookup(spellId);
      return { source:this, action:BattleCommands.CastSpell, spell:spell, target:this.determineSpellTarget(spell) };
    }
    
    if (this.isUsingSkill()) {
      var skillId = this.getNextSkill();
      var spell = Spell.lookup(skillId);
      return { source:this, action:BattleCommands.CastSpell, spell:spell, target:this.determineSpellTarget(spell) };
    }
    
    return { source:this, action:BattleCommands.Attack, target:this.determineSingleTarget() };
  };
  
  MonsterBase.prototype.isRunningAway = function() {
    var r = RNG.randomUpTo(50, 0);
    var partyLeader = Party.getChars(0);
    var leaderLevel = 1;
    if (partyLeader) {
      leaderLevel = partyLeader.charLevel;
    }
    return (this.morale - (2 * leaderLevel) + r) < 80;
  };
  
  MonsterBase.prototype.isCastingSpell = function() {
    if (!this.magic) {
      return false;
    }
    
    return RNG.percent(this.magicChance);
  };
  
  MonsterBase.prototype.isUsingSkill = function() {
    if (!this.skills) {
      return false;
    }
    
    return RNG.percent(this.skillChance);
  };
  
  MonsterBase.prototype.getNextSpell = function() {
    return this.magic[++this.magicIndex];
  };
  
  MonsterBase.prototype.getNextSkill = function() {
    return this.skills[++this.skillIndex];
  };
  
  MonsterBase.prototype.determineSpellTarget = function(spell) {
    var target = null;
    if (spell.isSingleTarget()) {
      target = this.determineSingleTarget();
    } else if (spell.isMultiTarget()) {
      target = Party.getChars();
    } else if (spell.isSelfTarget()) {
      target = this;
    }
    
    return target;
  };
  
  MonsterBase.prototype.determineSingleTarget = function() {
    var r = RNG.randomUpTo(8);
    var charIndex = -1;
    if (r >= 1 && r <= 4) {
      charIndex = 0;
    } else if (r >= 5 && r <= 6) {
      charIndex = 1;
    } else if (r == 7) {
      charIndex = 2;
    } else if (r == 8) {
      charIndex = 3;
    }
    return Party.getChar(charIndex);
  };
  
  var create = function(opt) {
    new MonsterBase(opt);
  };
  
  var createForBattle = function(monster) {
    return jQuery.extend({}, monster);
  };
  
  return {
    lookup : function(name) { return ALL[name]; }
   ,lookupByCss : function(css) { return ALL_BY_CSS[css]; }
   ,create : create
   ,createForBattle : createForBattle
   ,Types : Types
   ,All : ALL
  };
})();