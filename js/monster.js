define( /* Monster */
["jquery", "constants/battle", "party", "rng", "statuses", "target", "util"],
function($, BattleConstants, Party, RNG, Status, Target, Util) {
return (function() {
  
  var self = this;
    
  var ALL = {};
  var ALL_BY_CSS = {};
  
  var index = 0;
  
  self.All = ALL;
  
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
    
    this.types = $.merge([], $.isArray(opt.type) ? opt.type : $.makeArray(opt.type));
    this.hp = stats.hp;
    this.maxHp = stats.hp;
    this.strength = stats.atk;
    this.accuracy = stats.acc;
    this.numAttacks = stats.hits;
    this.criticalRate = stats.crt;
    this.defence = stats.def;
    this.evade = stats.eva;
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
    ALL_BY_CSS[Util.getCssClass(this.cssClass, "last")] = this;
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
  MonsterBase.prototype.applyDamage = function(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.addStatus(Status.Dead);
    } else if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  };
  MonsterBase.prototype.attack = function() { return this.strength; };
  MonsterBase.prototype.attacksWithElement = function(element) { return this.attackElement == element; };
  MonsterBase.prototype.canCastSpell = function(spell) { return true; };
  MonsterBase.prototype.critical = function() { return this.criticalRate; };
  MonsterBase.prototype.defense = function() { return this.defence; };
  MonsterBase.prototype.evasion = function() { return this.evade; };
  MonsterBase.prototype.getMaxHitPoints = function() { return this.maxHp; };
  MonsterBase.prototype.getName = function() { return this.name; };
  MonsterBase.prototype.getStatusAttack = function() { return this.attackStatus; };
  MonsterBase.prototype.hasStatus = function(status) { return this.currentStatuses[status.id]; };
  MonsterBase.prototype.hitPercent = function() { return this.accuracy; };
  MonsterBase.prototype.isDead = function() { 
    var d = this.hasStatus(Status.Dead); 
    return (d == null ? false : d); 
  };
  MonsterBase.prototype.isMonsterType = function(type) { return ($.inArray(type, this.types) > -1); };
  MonsterBase.prototype.isProtectedFrom = function(element) { return this.elementsResisted[element]; };
  MonsterBase.prototype.isStrongAgainstMonsterType = function(type) { return false; }; 
  MonsterBase.prototype.isWeakToElement = function(element) { return this.elementsWeakTo[element]; };
  MonsterBase.prototype.magicDefense = function() { return this.magicDef; };
  MonsterBase.prototype.numHits = function() { return this.numAttacks; };
  MonsterBase.prototype.removeStatus = function(status) { 
    this.currentStatuses[status.id] = false;
    return this;
  };
  MonsterBase.prototype.useSpellCharge = function(spellLevel) {};
  
  // --------------------------------
  // AI methods (determining actions)
  // --------------------------------
  
  
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
    this.magicIndex++;
    if (this.magicIndex >= this.magic.length) {
      this.magicIndex = 0;
    }
    return this.magic[this.magicIndex];
  };
  
  MonsterBase.prototype.getNextSkill = function() {
    this.skillIndex++;
    if (this.skillIndex >= this.skills.length) {
      this.skillIndex = 0;
    }
    return this.skills[this.skillIndex];
  };
  
  MonsterBase.prototype.toString = function() { return this.getName() + " - " + this.hp + "," + this.maxHp; };
  
  // ----------------
  // Creation methods
  // ----------------
  self.create = function(opt) {
    new MonsterBase(opt);
  };
  
  self.createForBattle = function(monster) {
    return $.extend(true, {}, monster);
  };
  
  self.lookup = function(name) { return ALL[name]; };
  self.lookupByCss = function(css) { return ALL_BY_CSS[css]; };
  
  return this;
}).call({})
});