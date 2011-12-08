var Shops = (function() {
  var self = this;
  var ALL = {};
  var $shop = null;
  
  self.Types = {
    Armor : "armor"
   ,BlackMagic : "black-magic"
   ,Clinic : "clinic"
   ,Inn : "inn"
   ,Item : "item"
   ,Weapon : "weapon"
   ,WhiteMagic : "white-magic"
  };
  
  self.create = function(id) {
    return new Shop(id);
  };
  
  self.init = function() {
    $shop = $("#shop");
  };
  
  self.lookup = function(id) {
    return ALL[id];
  };
  
  var Shop = function(id) {
    this.id = id;
    ALL[id] = this;
  };
  
  Shop.prototype.display = function() { 
    $shop
      .find(".type").empty().end()
      .find(".prices").empty().hide().end()
      .find(".menu").empty().hide().end();
    this.displayInit();
    this.party().gold();
  };
  Shop.prototype.displayInit = function() { /* intentionally left empty for sub-classes to override */  };
  Shop.prototype.party = function() {
    var $party = $shop.find(".party");
    var chars = Party.getChars();
    
    $party.empty();
    for (var i = 0, n = chars.length; i < n; i++) {
      $party.append($("<div/>").addClass("char").addClass(chars[i].currentClass.name).toggleClass("first", i == 0));
    }
    return this;
  };
  Shop.prototype.gold = function() {
    var partyGold = Message.padToLength(Party.getGold(), 6);
    $shop.find(".gold").empty().append(Message.create(partyGold + " G"));
    return this;
  };
  Shop.prototype.npcSays = function(dialog) { $shop.find(".npc.dialog").empty().append(Message.create(dialog)); return this; };
  Shop.prototype.offers = function(option) { $shop.find(".menu").append($("<div/>").addClass("option").append(Message.create(options))); return this; };
  Shop.prototype.signShows = function(text) { $shop.find(".type").append(Message.create(this.heading)); return this; };
  
  var ArmorShop = function() {};
  ArmorShop.prototype = new Shop(self.Types.Armor);
  ArmorShop.prototype.displayInit = function() { 
    this.signShows("ARMOR").npcSays("Welcome").offers("Buy").offers("Sell").offers("Exit");
    $shop.find(".menu").show();
  };
  
  var Clinic = function() {};
  Clinic.prototype = new Shop(self.Types.Clinic);
  Clinic.prototype.displayInit = function() { 
    var welcomeMessage = "";
    var anyCharactersDead = false;
    var chars = Party.getChars();

    for (var i = 0, n = chars.length; i < n; i++) {
      if (chars[i].isDead()) {
        anyCharactersDead = true;
      }
    }
    
    if (!anyCharactersDead) {
      welcomeMessage = "You do\nnot\nneed my\nhelp\nnow.";
    }
    
    this.signShows("CLINIC").npcSays(welcomeMessage);
    $shop.find(".menu").toggle(anyCharactersDead).end();
  };
  
  var WeaponShop = function() {};
  WeaponShop.prototype = new Shop(self.Types.Weapon);
  WeaponShop.prototype.displayInit = function() {   
    this.signShows("WEAPON").npcSays("Welcome").offers("Buy").offers("Sell").offers("Exit");
    $shop.find(".menu").show();
  };
  
  return this;
}).call({});