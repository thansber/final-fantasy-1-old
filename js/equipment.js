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
      ALL_WEAPONS[this.name] = this;
    };
    
    new Weapon({name:"Wooden[N]", ui:{cssClasses:"wooden nunchucks",splash:"orange"}, stats:{attack:12,hit:0,crit:10,index:1}});
    new Weapon({name:"Small[K]", ui:{cssClasses:"small dagger", splash:"grey"}, stats:{attack:5,hit:10,crit:5,index:2}});
    new Weapon({name:"Wooden[R]", ui:{cssClasses:"wooden staff", splash:"orange"}, stats:{attack:6,hit:0,crit:1,index:3}});
    new Weapon({name:"Rapier", ui:{cssClasses:"rapier", splash:"grey"}, stats:{attack:9,hit:5,crit:10,index:4}});
    new Weapon({name:"Iron[H]", ui:{cssClasses:"iron hammer", splash:"orange"}, stats:{attack:9,hit:0,crit:1,index:5}});
    new Weapon({name:"Short[S]", ui:{cssClasses:"short sword", splash:"grey"}, stats:{attack:15,hit:10,crit:5,index:6}});
    new Weapon({name:"Hand[A]", ui:{cssClasses:"hand axe", splash:"grey"}, stats:{attack:16,hit:5,crit:3,index:7}});
    new Weapon({name:"Scimtar", ui:{cssClasses:"scimitar", splash:"sea green"}, stats:{attack:10,hit:10,crit:5,index:8}});
    new Weapon({name:"Iron[N]", ui:{cssClasses:"iron nunchucks", splash:"grey"}, stats:{attack:16,hit:0,crit:10,index:9}});
    new Weapon({name:"Large[K]", ui:{cssClasses:"large dagger", splash:"grey"}, stats:{attack:7,hit:10,crit:5,index:10}});
    new Weapon({name:"Iron[S]", ui:{cssClasses:"iron staff", splash:"grey"}, stats:{attack:14,hit:0,crit:1,index:11}});
    new Weapon({name:"Sabre", ui:{cssClasses:"saber", splash:"grey"}, stats:{attack:13,hit:5,crit:10,index:12}});
    new Weapon({name:"Long[S]", ui:{cssClasses:"long sword", splash:"grey"}, stats:{attack:20,hit:10,crit:5,index:13}});
    new Weapon({name:"Great[A]", ui:{cssClasses:"great axe", splash:"pink"}, stats:{attack:22,hit:5,crit:3,index:14}});
    new Weapon({name:"Falchon", ui:{cssClasses:"falchion", splash:"grey"}, stats:{attack:15,hit:10,crit:5,index:15}});
    new Weapon({name:"Silver[K]", ui:{cssClasses:"silver dagger", splash:"turquoise"}, stats:{attack:10,hit:15,crit:5,index:16}});
    new Weapon({name:"Silver[S]", ui:{cssClasses:"silver sword", splash:"turquoise"}, stats:{attack:23,hit:15,crit:5,index:17}});
    new Weapon({name:"Silver[H]", ui:{cssClasses:"silver hammer", splash:"turquoise"}, stats:{attack:12,hit:5,crit:1,index:18}});
    new Weapon({name:"Silver[A]", ui:{cssClasses:"silver axe", splash:"turquoise"}, stats:{attack:25,hit:10,crit:4,index:19}});
    new Weapon({name:"Flame[S]", ui:{cssClasses:"flame sword", splash:"red"}, stats:{attack:26,hit:20,crit:5,index:20}, elements:[Element.Fire], monsterTypes:[Monster.Types.Undead, Monster.Types.Regenerative]});
    new Weapon({name:"Ice[S]", ui:{cssClasses:"ice sword", splash:"blue"}, stats:{attack:29,hit:25,crit:5,index:21}, elements:[Element.Ice]});
    new Weapon({name:"Dragon[S]", ui:{cssClasses:"dragon sword", splash:"sea green"}, stats:{attack:19,hit:15,crit:10,index:22}, monsterTypes:[Monster.Types.Dragon]});
    new Weapon({name:"Giant[S]", ui:{cssClasses:"giant sword", splash:"royal blue"}, stats:{attack:21,hit:20,crit:5,index:23}, monsterTypes:[Monster.Types.Giant]});
    new Weapon({name:"Sun[S]", ui:{cssClasses:"sun sword", splash:"orange"}, stats:{attack:32,hit:30,crit:5,index:24}, monsterTypes:[Monster.Types.Undead]});
    new Weapon({name:"Coral[S]", ui:{cssClasses:"coral sword", splash:"pink"}, stats:{attack:19,hit:15,crit:10,index:25}, monsterTypes:[Monster.Types.Aquatic]});
    new Weapon({name:"Were[S]", ui:{cssClasses:"were sword", splash:"magenta"}, stats:{attack:18,hit:15,crit:5,index:26}, monsterTypes:[Monster.Types.Were]});
    new Weapon({name:"Rune[S]", ui:{cssClasses:"rune sword", splash:"purple"}, stats:{attack:18,hit:15,crit:5,index:27}, monsterTypes:[Monster.Types.Magical, Monster.Types.Mage]});
    new Weapon({name:"Power[R]", ui:{cssClasses:"power staff", splash:"light green"}, stats:{attack:12,hit:0,crit:1,index:28}});
    new Weapon({name:"Light[A]", ui:{cssClasses:"light axe", splash:"purple"}, stats:{attack:28,hit:15,crit:3,index:29}, special:{spell:"HRM2"}, monsterTypes:[Monster.Types.Undead]});
    new Weapon({name:"Heal[R]", ui:{cssClasses:"heal staff", splash:"blue"}, stats:{attack:6,hit:0,crit:1,index:30}, special:{spell:"HEAL"}});
    new Weapon({name:"Mage[R]", ui:{cssClasses:"mage staff", splash:"pink"}, stats:{attack:12,hit:10,crit:1,index:31}, special:{spell:"FIR2"}});
    new Weapon({name:"Defense", ui:{cssClasses:"defense", splash:"orange"}, stats:{attack:30,hit:35,crit:5,index:32}, special:{spell:"RUSE"}});
    new Weapon({name:"Wizard[R]", ui:{cssClasses:"wizard staff", splash:"turquoise"}, stats:{attack:15,hit:15,crit:1,index:33}, special:{spell:"CONF"}});
    new Weapon({name:"Vorpal", ui:{cssClasses:"vorpal", splash:"blue"}, stats:{attack:24,hit:25,crit:30,index:34}});
    new Weapon({name:"CatClaw", ui:{cssClasses:"catclaw", splash:"turquoise"}, stats:{attack:22,hit:35,crit:5,index:35}});
    new Weapon({name:"Thor[H]", ui:{cssClasses:"thor hammer", splash:"magenta"}, stats:{attack:18,hit:15,crit:1,index:36}, special:{spell:"LIT2"}});
    new Weapon({name:"Bane[S]", ui:{cssClasses:"bane sword", splash:"royal blue"}, stats:{attack:22,hit:20,crit:10,index:37}, special:{spell:"BANE"}});
    new Weapon({name:"Katana", ui:{cssClasses:"katana", splash:"orange"}, stats:{attack:33,hit:35,crit:30,index:38}});
    new Weapon({name:"Xcalber", ui:{cssClasses:"excalibur", splash:"gold"}, stats:{attack:45,hit:35,crit:5,index:39}, elements:[Element.Status, Element.PoisonStone, Element.Time, Element.Death, Element.Fire, Element.Ice, Element.Lightning, Element.Earth], monsterTypes:[Monster.Types.Magical, Monster.Types.Dragon, Monster.Types.Giant, Monster.Types.Undead, Monster.Types.Were, Monster.Types.Aquatic, Monster.Types.Mage, Monster.Types.Regenerative]});
    new Weapon({name:"Masmune", ui:{cssClasses:"masamune", splash:"grey"}, stats:{attack:56,hit:50,crit:10,index:40}});
    
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