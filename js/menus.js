var Menus = (function() {

  var self = this;
  var ALL_MENUS = [];
  
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
      $container
        .find(".title").append(Message.create("ARMOR")).end()
        .find(".actions").append(Message.create("EQUIP  TRADE  DROP"));
    };
    
    self.load = function() {
      loadNames($container);
      
      $container.find(".char").each(function(i) {
        var char = Party.getChar(i);
        var $items = $(this).find(".items");
        $items.empty();
        
        for (var a = 0; a < char.allArmor.length; a++) {
          var armor = char.allArmor[a];
          var $markup = $("<p class=\"armor\"></p>");
          $markup.append(Message.create((char.isArmorEquipped(armor.name) ? "E-" : "") + armor.desc));
          $items.append($markup);
        }
      });
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
      $container
        .find(".title").append(Message.create(null, "shrunk weapon text")).end()
        .find(".actions")
          .append(Message.create("EQUIP", "equip"))
          .append(Message.create("TRADE", "trade"))
          .append(Message.create("DROP", "drop"));
    };
    
    self.load = function() {
      loadNames($container);
      
      $container.find(".char").each(function(i) {
        var char = Party.getChar(i);
        var $items = $(this).find(".items");
        $items.empty();
        
        for (var w = 0; w < char.allWeapons.length; w++) {
          var weapon = char.allWeapons[w];
          var $markup = $("<p class=\"armor\"></p>");
          $markup.append(Message.create((char.equippedWeaponIndex == w ? "E-" : "") + weapon.desc));
          $items.append($markup);
        }
      });
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
  };
    
  return this;
}).call({});