define( 
/* Equipment */ 
["jquery"], 
function($) { 

  return (function() {
    
    var ALL_WEAPONS = {};
    var ALL_ARMOR = {};
    var ALL_ITEMS = {};
    var ALL_KEY_ITEMS = {};
    
    var _equipment = this;
    
    this.sellsFor = function(equipment) { return Math.floor(equipment.price / 2); };
    
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
        this.elements = $.merge([], opt.elements || []);
        this.monsterTypes = $.merge([], opt.monsterTypes || []);
        this.allowedClasses = $.merge([], opt.allowedClasses || []);
        this.price = opt.price;
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
            if ($.isArray(opt.special.element)) {
              $.merge(this.element, opt.special.element);
            } else {
              this.element.push(opt.special.element);
            }
          }
          this.spell = opt.special.spell;
        }
        this.hasSpell = (this.spell != null);
        this.allowedClasses = $.merge([], opt.allowedClasses || []);
        this.price = opt.price;
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
    
    // =============================================================
    // ITEM --------------------------------------------------------
    // =============================================================
    this.Item = (function() {
      
      var self = this;
        
      function Item(opt) {
        var uses = opt.uses || {};
        
        this.name = opt.name;
        this.desc = opt.desc;
        this.price = opt.price;
        this.inBattleEffect = uses.battle; // function
        this.outOfBattleEffect = uses.normal; // function
        ALL_ITEMS[this.name] = this;
      };
      
      Item.prototype.use = function(target, inBattle) {
        if (inBattle) {
          return this.inBattleEffect.call(this, target);
        } else {
          return this.outOfBattleEffect.call(this, target);
        }
      };
      
      self.create = function(opt) { return new Item(opt); };
      self.lookup = function(id) { return ALL_ITEMS[id]; };
  
      self.All = ALL_ITEMS;
      
      return self;
    }).call({});
    
    this.KeyItem = (function() {
      var self = this;
      var keyItemIndex = 0;
  
      var KeyItem = function(opt) {
        this.name = opt.name;
        this.desc = opt.desc;
        this.index = 1 << keyItemIndex++;
        
        _equipment[this.name] = this.name;
        ALL_KEY_ITEMS[this.name] = this;
      };
      
      self.All = ALL_KEY_ITEMS;
      self.create = function(opt) { return new KeyItem(opt); };
      self.lookup = function(name) { return ALL_KEY_ITEMS[name]; };
      
      return self;
    }).call({});
    
    
    return this;
  }).call({});
});