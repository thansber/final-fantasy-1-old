var Menus = (function() {

  var self = this;
  var ALL_MENUS = [];
  
  var buildEquipmentActions = function($container) {
    $container.find(".actions")
      .append(Message.create("EQUIP", "equip"))
      .append(Message.create("TRADE", "trade"))
      .append(Message.create("DROP", "drop"));
  };
  
  var buildEquipmentMenu = function() {
    var markup = [];
    var m = 0;
    markup[m++] = "<div class=\"title border\"></div>";
    markup[m++] = "<div class=\"actions border\"></div>";
    markup[m++] = "<div class=\"char\">";
    markup[m++] =   "<div class=\"overlap\"><div class=\"name border\"></div></div>";
    markup[m++] =   "<div class=\"items border\"></div>";
    markup[m++] = "</div>";
    markup[m++] = "<div class=\"char\">";
    markup[m++] =   "<div class=\"overlap\"><div class=\"name border\"></div></div>";
    markup[m++] =   "<div class=\"items border\"></div>";
    markup[m++] = "</div>";
    markup[m++] = "<div class=\"char\">";
    markup[m++] =   "<div class=\"overlap\"><div class=\"name border\"></div></div>";
    markup[m++] =   "<div class=\"items border\"></div>";
    markup[m++] = "</div>";
    markup[m++] = "<div class=\"char\">";
    markup[m++] =   "<div class=\"overlap\"><div class=\"name border\"></div></div>";
    markup[m++] =   "<div class=\"items border\"></div>";
    markup[m++] = "</div>";
    return $(markup.join(""));
  };
  
  var loadNames = function($container) {
    var chars = Party.getChars();
    var $chars = $container.find(".char");
  
    for (var c = 0; c < chars.length; c++) {
      var char = chars[c];
      var $char = $chars.eq(c);
      $char.find(".name").empty().append(Message.create(char.getName()));
    }
  };
  
  var reloadChar = function(char, $char, maxAmount) {
    var $items = $char.find(".items");
    $items.empty();
    
    for (var e = 0; e < maxAmount; e++) {
      var $markup = $("<div class=\"slot\"><div class=\"equipped\"></div><div class=\"equippable\"></div></div>");
      var equippable = char.lookup(e);
      if (equippable) {
        if (char.isEquipped(e)) {
          $markup.find(".equipped").append(Message.create("E-"));
        }
        $markup.find(".equippable").append(Message.create(equippable.desc));
      }
      $items.append($markup);
    }
  };
  
  /* ========================================= */
  /* CHARACTER MENU -------------------------- */
  /* ========================================= */
  self.Char = (function() {
    var self = this;
    var $container = null;
    
    // PRIVATE METHODS 
    var initCharacters = function() {
      var chars = Party.getChars();
      var $chars = $container.find(".char.profile");
      for (var c = 0; c < chars.length; c++) {
        var char = chars[c];
        var hpText = Message.padToLength(char.hitPoints, 3) + "/" + Message.padToLength(char.maxHitPoints, 3);
        $chars.eq(c)
          .find(".name").empty().append(Message.create(char.getName())).end()
          .find(".level").empty().append(Message.create("L" + Message.padToLength(char.charLevel, 2))).end()
          .find(".hp.values").empty().append(Message.create(hpText)).end()
          .find(".magic.row:eq(0)").empty().append(Message.create(char.charges.slice(0, 4).join("/") + "/")).end()
          .find(".magic.row:eq(1)").empty().append(Message.create(char.charges.slice(4).join("/"))).end()
          .find(".char.class").addClass(char.currentClass.name);
      }
    };
    
    // PUBLIC METHODS
    self.init = function() {
      $container = $("#charMenu");
      
      var chars = Party.getChars();
      var $chars = $container.find(".char.profile");
      var markup = [];
      var m = 0;
      for (var c = 0; c < chars.length; c++) {
        m = 0;
        markup[m++] = "<div class=\"name\"></div>";
        markup[m++] = "<div class=\"level\"></div>";
        markup[m++] = "<div class=\"hp label\"></div>";
        markup[m++] = "<div class=\"hp values\"></div>";
        markup[m++] = "<div class=\"magic label\"></div>";
        markup[m++] = "<div class=\"magic row\"></div>";
        markup[m++] = "<div class=\"magic row\"></div>";
        markup[m++] = "<div class=\"char class\"></div>";
        $chars.eq(c).append($(markup.join("")));
      }
      
      $container
        .find(".options")
          .find(".item").append(Message.create("ITEM")).end()
          .find(".magic").append(Message.create("MAGIC")).end()
          .find(".weapon").append(Message.create(null, "shrunk weapon text")).end()
          .find(".armor").append(Message.create("ARMOR")).end()
          .find(".status").append(Message.create(null, "shrunk status text")).end()
          .end()
        .find(".char.profile")
          .find(".hp.label").append(Message.create("HP")).end()
          .find(".magic.label").append(Message.create("MAGIC"));
    };
    
    self.load = function() {
      var orbsLit = Party.getLitOrbs();
      for (var i = 0; i < orbsLit.length; i++) {
        $container.find(".orb." + orbsLit[i]).addClass("lit");
      }
      $container
        .find(".gold").empty().append(Message.create(Message.padToLength(Party.getGold(), 6) + " G")).end();
        
      initCharacters();
    };
    
    return this;
  }).call({});
  
  /* ========================================= */
  /* ARMOR MENU ------------------------------ */
  /* ========================================= */
  self.Armor = (function() {
    
    var self = this;
    var $container = null;
    
    self.init = function() {
      $container = $("#armorMenu");
      $container.append(buildEquipmentMenu());
      $container.find(".title").append(Message.create("ARMOR")).end();
      buildEquipmentActions($container);
    };
    
    self.load = function() {
      loadNames($container);
      
      $container.find(".char").each(function(i) {
        self.reloadChar(Party.getChar(i), $(this));
      });
    };
    
    self.reloadChar = function(char, $char) {
      if (!char || !($char) || $char.length == 0) {
        return;
      }
      
      char.armor();
      reloadChar(char, $char, Character.MAX_ARMOR);
    };
    
    return this;
  }).call({});
  
  /* =========================================== */
  /* WEAPONS MENU ------------------------------ */
  /* =========================================== */
  self.Weapon = (function() {
    
    var self = this;
    var $container = null;
    
    self.init = function() {
      $container = $("#weaponMenu");
      $container.append(buildEquipmentMenu());
      $container.find(".title").append(Message.create(null, "shrunk weapon text")).end();
      buildEquipmentActions($container);
    };
    
    self.load = function() {
      loadNames($container);
      
      $container.find(".char").each(function(i) {
        self.reloadChar(Party.getChar(i), $(this));
      });
    };
    
    self.reloadChar = function(char, $char) {
      if (!char || !($char) || $char.length == 0) {
        return;
      }
      
      char.weapons();
      reloadChar(char, $char, Character.MAX_WEAPONS);
    };
    
    return this;
  }).call({});
  
  /* ========================================= */
  /* MAGIC MENU ------------------------------ */
  /* ========================================= */
  self.Magic = (function() {
    var self = this;
    var $container = null;
    
    var buildMagicMenu = function() {
      var markup = [], m = 0;
      
      for (var i = 0; i < Character.MAX_SPELL_LEVELS; i++) {
        markup[m++] = "<div class=\"row\">";
        markup[m++] = "  <div class=\"level\"></div>";
        markup[m++] = "  <div class=\"charges\"></div>";
        markup[m++] = "  <div class=\"spells\">";
        for (var s = 0; s < Character.MAX_SPELLS_PER_LEVEL; s++) {
          markup[m++] = "<div class=\"spell" + (s == 1 ? " middle" : "") + "\"></div>";
        }
        markup[m++] = "  </div>";
        markup[m++] = "</div>";
      }
      
      return $(markup.join(""));
    };
    
    self.init = function() {
      $container = $("#magicMenu");
      $container.find(".magic").append(buildMagicMenu());
    };
    
    self.load = function(char) {
      $container
        .find(".name").empty().append(Message.create(char.getName())).end();
      
      var $rows = $container.find(".row");
      for (var s = 0; s < Character.MAX_SPELL_LEVELS; s++) {
        var $row = $rows.eq(s);
        var $spells = $row.find(".spell");
        $row
          .find(".level").empty().append(Message.create("L" + (s + 1))).end()
          .find(".charges").empty().append(Message.create(char.charges[s] + "/" + char.maxCharges[s]));
        
        $spells.each(function(i) {
          var $spell = $(this);
          $spell.empty();
          if (char.knownSpells[s] && char.knownSpells[s][i]) {
            var spellText = Message.padToLength(char.knownSpells[s][i], 4, {dir:"right"});
            $spell.append(Message.create(spellText));            
          }
        });
      }
    };
    
    return this;
  }).call({});
  
  /* ======================================== */
  /* ITEM MENU ------------------------------ */
  /* ======================================== */
  self.Item = (function() {
    var self = this;
    var $container = null;
    
    self.init = function() {
      $container = $("#itemMenu");
      $container.find(".title").append(Message.create("ITEM")).end();
    };
    
    self.load = function() {
      var consuambles = Party.getConsumables();
      var $inventory = $container.find(".inventory");
      $inventory.empty();
      $.each(consuambles, function(i, item) {
        if (item.qty > 0) {
          var displayName = Equipment.Item.lookup(item.name).desc;
          var qty = Message.padToLength(item.qty, 2);
          $inventory.append($("<div/>").addClass("item").append(Message.create(displayName + qty)));
        }
      });
    };
    
    return this;
  }).call({});
  
  /* ========================================== */
  /* STATUS MENU ------------------------------ */
  /* ========================================== */
  self.Status = (function() {
    var self = this;
    var $container = null;
    
    var buildLabels = function() {
      $container
        .find(".level").append(Message.create("LEV", "label")).end()
        .find(".exp")
          .append(Message.create("EXP.POINTS", "current"))
          .append(Message.create("FOR LEV UP", "next")).end()
        .find(".primary.stats")
          .append(Message.create("STR.", "label str"))
          .append(Message.create("AGL.", "label agi"))
          .append(Message.create("VIT.", "label vit"))
          .append(Message.create("INT.", "label int"))
          .append(Message.create("LUCK", "label luck")).end()
        .find(".secondary.stats")
          .append(Message.create("DAMAGE", "label dmg"))
          .append(Message.create("HIT %", "label hit"))
          .append(Message.create("ABSORB", "label absorb"))
          .append(Message.create("EVADE %", "label evade"));
    };
    
    var loadValue = function(selector, value) {
      $container.find(selector)
        .next(".value").remove().end()
        .after(Message.create(value, "value"));
    };
    
    self.init = function() {
      $container = $("#statusMenu");
      buildLabels();
    };
    
    self.load = function(char) {
      $container
        .find(".name").empty().append(Message.create(char.getName())).end()
        .find(".charClass").empty()
          .append($("<div/>").addClass("char " + char.currentClass.name))
          .append(Message.create(CharacterClass.descriptions[char.currentClass.name], "value"));
      loadValue(".level .label", char.charLevel);
      loadValue(".exp .current", char.experience);
      loadValue(".exp .next", CharacterGrowth.experienceForNextLevel(char));
      loadValue(".primary.stats .str", char.strength);
      loadValue(".primary.stats .agi", char.agility);
      loadValue(".primary.stats .vit", char.vitality);
      loadValue(".primary.stats .int", char.intelligence);
      loadValue(".primary.stats .luck", char.luck);      
      loadValue(".secondary.stats .dmg", char.attack());
      loadValue(".secondary.stats .hit", char.hitPercent());
      loadValue(".secondary.stats .absorb", char.defense());
      loadValue(".secondary.stats .evade", char.evasion());
    };
    
    return this;
  }).call({});
  
  /* =================== */
  /* MENU INITIALIZATION */
  /* =================== */
  self.init = function() {
    self.Char.init();
    self.Armor.init();
    self.Weapon.init();
    self.Magic.init();
    self.Item.init();
    self.Status.init();
  };
    
  return this;
}).call({});