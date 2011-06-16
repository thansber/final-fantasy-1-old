var Equipment = (function() {
  
  var ALL_WEAPONS = {};
  var ALL_ARMOR = {};
  
  // ==============================================================
  // WEAPON -------------------------------------------------------
  // ==============================================================
  var Weapon = (function() {
    
    function Weapon(name,cssClasses,stats,special) {
      this.name = name;
      this.attack = stats.attack;
      this.hitPercent = stats.hit;
      this.criticalPercent = stats.crit;
      this.weaponIndex = stats.index;
      if (special) {
        this.spell = special.spell;
      }
      this.hasSpell = (this.spell != null);
      this.cssClasses = cssClasses;
      ALL_WEAPONS[name] = this;
    };
    
    new Weapon("Wooden[N]", "wooden nunchucks", {attack:12,hit:0,crit:10,index:1});
    new Weapon("Small[K]", "small dagger", {attack:5,hit:10,crit:5,index:2});
    new Weapon("Wooden[R]", "wooden staff", {attack:6,hit:0,crit:1,index:3});
    new Weapon("Rapier", "rapier", {attack:9,hit:5,crit:10,index:4});
    new Weapon("Iron[H]", "iron hammer", {attack:9,hit:0,crit:1,index:5});
    new Weapon("Short[S]", "short sword", {attack:15,hit:10,crit:5,index:6});
    new Weapon("Hand[A]", "hand axe", {attack:16,hit:5,crit:3,index:7});
    new Weapon("Scimtar", "scimitar", {attack:10,hit:10,crit:5,index:8});
    new Weapon("Iron[N]", "iron nunchucks", {attack:16,hit:0,crit:10,index:9});
    new Weapon("Large[K]", "large dagger", {attack:7,hit:10,crit:5,index:10});
    new Weapon("Iron[S]", "iron staff", {attack:14,hit:0,crit:1,index:11});
    new Weapon("Sabre", "saber", {attack:13,hit:5,crit:10,index:12});
    new Weapon("Long[S]", "long sword", {attack:20,hit:10,crit:5,index:13});
    new Weapon("Great[A]", "great axe", {attack:22,hit:5,crit:3,index:14});
    new Weapon("Falchon", "falchion", {attack:15,hit:10,crit:5,index:15});
    new Weapon("Silver[K]", "silver dagger", {attack:10,hit:15,crit:5,index:16});
    new Weapon("Silver[S]", "silver sword", {attack:23,hit:15,crit:5,index:17});
    new Weapon("Silver[H]", "silver hammer", {attack:12,hit:5,crit:1,index:18});
    new Weapon("Silver[A]", "silver axe", {attack:25,hit:10,crit:4,index:19});
    new Weapon("Flame[S]", "flame sword", {attack:26,hit:20,crit:5,index:20});
    new Weapon("Ice[S]", "ice sword", {attack:29,hit:25,crit:5,index:21});
    new Weapon("Dragon[S]", "dragon sword", {attack:19,hit:15,crit:10,index:22});
    new Weapon("Giant[S]", "giant sword", {attack:21,hit:20,crit:5,index:23});
    new Weapon("Sun[S]", "sun sword", {attack:32,hit:30,crit:5,index:24});
    new Weapon("Coral[S]", "coral sword", {attack:19,hit:15,crit:10,index:25});
    new Weapon("Were[S]", "were sword", {attack:18,hit:15,crit:5,index:26});
    new Weapon("Rune[S]", "rune sword", {attack:18,hit:15,crit:5,index:27});
    new Weapon("Power[R]", "power staff", {attack:12,hit:0,crit:1,index:28});
    new Weapon("Light[A]", "light axe", {attack:28,hit:15,crit:3,index:29}, {spell:"HRM2"});
    new Weapon("Heal[R]", "heal staff", {attack:6,hit:0,crit:1,index:30}, {spell:"HEAL"});
    new Weapon("Mage[R]", "mage staff", {attack:12,hit:10,crit:1,index:31}, {spell:"FIR2"});
    new Weapon("Defense", "defense", {attack:30,hit:35,crit:5,index:32}, {spell:"RUSE"});
    new Weapon("Wizard[R]", "wizard staff", {attack:15,hit:15,crit:1,index:33}, {spell:"CONF"});
    new Weapon("Vorpal", "vorpal", {attack:24,hit:25,crit:30,index:34});
    new Weapon("CatClaw", "catclaw", {attack:22,hit:35,crit:5,index:35});
    new Weapon("Thor[H]", "thor hammer", {attack:18,hit:15,crit:1,index:36}, {spell:"LIT2"});
    new Weapon("Bane[S]", "bane sword", {attack:22,hit:20,crit:10,index:37}, {spell:"BANE"});
    new Weapon("Katana", "katana", {attack:33,hit:35,crit:30,index:38});
    new Weapon("Xcalber", "excalibur", {attack:45,hit:35,crit:5,index:39});
    new Weapon("Masmune", "masamune", {attack:56,hit:50,crit:10,index:40});
    
    return {
      lookup : function(id) { return ALL_WEAPONS[id]; }
     ,All : ALL_WEAPONS
    };
  })();
  
  
  // ==============================================================
  // ARMOR --------------------------------------------------------
  // ==============================================================
  var Armor = (function() {
    
    function Armor(name,stats,extra) {
      this.name = name;
      this.defense = stats.def;
      this.weight = stats.weight;
      this.element = [];
      if (extra) {
        if (extra.element) {
          if (jQuery.isArray(extra.element)) {
            jQuery.merge(this.element, extra.element);
          } else {
            this.element.push(extra.element);
          }
        }
        this.spell = extra.spell;
      }
      this.hasSpell = (this.spell != null);
      ALL_ARMOR[name] = this;
    };
    
    new Armor("Cloth",{def:1,weight:3});
    new Armor("Wooden[A]",{def:4,weight:8});
    new Armor("Chain[A]",{def:15,weight:15});
    new Armor("Iron[A]",{def:24,weight:23});
    new Armor("Steel[A]",{def:34,weight:33});
    new Armor("Silver[A]",{def:18,weight:8});
    new Armor("Flame[A]",{def:34,weight:10},{element:Element.Ice});
    new Armor("Ice[A]",{def:34,weight:10},{element:Element.Fire});
    new Armor("Opal[A]",{def:42,weight:10},{element:Element.Lightning});
    new Armor("Dragon[A]",{def:42,weight:10},{element:[Element.Fire,Element.Ice,Element.Lightning]});
    new Armor("Copper[B]",{def:4,weight:1});
    new Armor("Silver[B]",{def:15,weight:1});
    new Armor("Gold[B]",{def:24,weight:1});
    new Armor("Opal[B]",{def:34,weight:1});
    new Armor("White[R]",{def:24,weight:2},{element:[Element.Fire,Element.Death],spell:"INV2"});
    new Armor("Black[R]",{def:24,weight:2},{element:[Element.Ice,Element.Time],spell:"ICE2"});
    new Armor("Wooden[S]",{def:2,weight:0});
    new Armor("Iron[S]",{def:4,weight:0});
    new Armor("Silver[S]",{def:8,weight:0});
    new Armor("Flame[S]",{def:12,weight:0},{element:Element.Ice});
    new Armor("Ice[S]",{def:12,weight:0},{element:Element.Fire});
    new Armor("Opal[S]",{def:16,weight:0},{element:Element.Lightning});
    new Armor("Aegis[S]",{def:16,weight:0},{element:Element.PoisonStone});
    new Armor("Buckler",{def:2,weight:0});
    new Armor("ProCape",{def:8,weight:2});
    new Armor("Cap",{def:1,weight:1});
    new Armor("Wooden[H]",{def:3,weight:3});
    new Armor("Iron[H]",{def:5,weight:5});
    new Armor("Silver[H]",{def:6,weight:3});
    new Armor("Opal[H]",{def:8,weight:3});
    new Armor("Heal[H]",{def:6,weight:3},{spell:"HEAL"});
    new Armor("Ribbon",{def:1,weight:1},{element:Element.AllElements});
    new Armor("Gloves",{def:1,weight:1});
    new Armor("Copper[G]",{def:2,weight:3});
    new Armor("Iron[G]",{def:4,weight:5});
    new Armor("Silver[G]",{def:6,weight:3});
    new Armor("Zeus[G]",{def:6,weight:3},{spell:"LIT2"});
    new Armor("Power[G]",{def:6,weight:3},{spell:"SABR"});
    new Armor("Opal[G]",{def:8,weight:3});
    new Armor("ProRing",{def:8,weight:1},{element:Element.Death});
    
    return {
      lookup : function(id) { return ALL_ARMOR[id]; }
     ,All : ALL_ARMOR
    };
  })();
  
  return {
    Weapon : Weapon
   ,Armor : Armor
  };
})();