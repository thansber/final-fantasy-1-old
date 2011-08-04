var Equipment = (function() {
  
  var ALL_WEAPONS = {};
  var ALL_ARMOR = {};
  
  // ==============================================================
  // WEAPON -------------------------------------------------------
  // ==============================================================
  var Weapon = (function() {
    
    function Weapon(opt) {
      this.name = opt.name;
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
    
     return {
      create : function(opt) { return new Weapon(opt); }
     ,lookup : function(id) { return ALL_WEAPONS[id]; }
     ,All : ALL_WEAPONS
    };
  })();
  
  
  // ==============================================================
  // ARMOR --------------------------------------------------------
  // ==============================================================
  var Armor = (function() {
    
    function Armor(opt) {
      this.name = opt.name;
      this.defense = opt.stats.def;
      this.weight = opt.stats.weight;
      this.element = [];
      if (opt.extra) {
        if (opt.extra.element) {
          if (jQuery.isArray(opt.extra.element)) {
            jQuery.merge(this.element, opt.extra.element);
          } else {
            this.element.push(opt.extra.element);
          }
        }
        this.spell = opt.extra.spell;
      }
      this.hasSpell = (this.spell != null);
      this.allowedClasses = jQuery.merge([], opt.allowedClasses || []);
      ALL_ARMOR[this.name] = this;
    };
    
    return {
      create : function(opt) { return new Armor(opt); }
     ,lookup : function(id) { return ALL_ARMOR[id]; }
     ,All : ALL_ARMOR
    };
  })();
  
  return {
    Weapon : Weapon
   ,Armor : Armor
  };
})();