var Equipment = (function() {
  
  var ALL_WEAPONS = {};
  var ALL_ARMOR = {};
  
  // ==============================================================
  // WEAPON -------------------------------------------------------
  // ==============================================================
  this.Weapon = (function() {
    
    var self = this;  
      
    function Weapon(opt) {
      this.name = opt.name;
      this.desc = opt.desc;
      this.attack = opt.stats.attack;
      this.hitPercent = opt.stats.hit;
      this.criticalPercent = opt.stats.crit;
      this.weaponIndex = opt.stats.index;
      if (opt.special) {
        this.spell = opt.special.spell;
      }
      this.hasSpell = (this.spell != null);
      this.cssClasses = opt.ui.cssClasses;
      this.splash = opt.ui.splash;
      this.elements = jQuery.merge([], opt.elements || []);
      this.monsterTypes = jQuery.merge([], opt.monsterTypes || []);
      this.allowedClasses = jQuery.merge([], opt.allowedClasses || []);
      ALL_WEAPONS[this.name] = this;
    };
    
    self.create = function(opt) { return new Weapon(opt); };
    self.lookup = function(id) { return ALL_WEAPONS[id]; };
    self.All = ALL_WEAPONS;
    
    return self;
  }).call({});
  
  
  // ==============================================================
  // ARMOR --------------------------------------------------------
  // ==============================================================
  this.Armor = (function() {
    
    var self = this;
      
    function Armor(opt) {
      this.name = opt.name;
      this.desc = opt.desc;
      this.type = opt.type;
      this.defense = opt.stats.def;
      this.weight = opt.stats.weight;
      this.element = [];
      if (opt.special) {
        if (opt.special.element) {
          if (jQuery.isArray(opt.special.element)) {
            jQuery.merge(this.element, opt.special.element);
          } else {
            this.element.push(opt.special.element);
          }
        }
        this.spell = opt.special.spell;
      }
      this.hasSpell = (this.spell != null);
      this.allowedClasses = jQuery.merge([], opt.allowedClasses || []);
      ALL_ARMOR[this.name] = this;
    };
    
    self.create = function(opt) { return new Armor(opt); };
    self.lookup = function(id) { return ALL_ARMOR[id]; };
    self.All = ALL_ARMOR;
    self.Types = {
      BODY: "body"
     ,HANDS: "hands"
     ,HEAD: "head"
     ,SHIELD: "shield"
    }
    
    return self;
  }).call({});
  
  return this;
}).call({});