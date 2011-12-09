var Shops = (function() {
  var self = this;
  var ALL = {};
  var INVENTORIES = {};
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
  
  self.Inventory = (function() {
    var self = this;
    
    var ShopInventory = function(town, shopType, itemDisplayName, price) {
      this.town = town;
      this.shopType = shopType;
      this.itemDisplayName = itemDisplayName;
      this.price = price;
      
      var townShops = INVENTORIES[town];
      if (!townShops) {
        townShops = {};
        INVENTORIES[town] = townShops;
      }
      
      var shopInventory = townShops[shopType];
      if (!shopInventory) {
        shopInventory = [];
        townShops[shopType] = shopInventory;
      }
      shopInventory.push(this);
    };
    
    self.create = function(town, shopType, itemDisplayName, price) {
      return new ShopInventory(town, shopType, itemDisplayName, price);
    };
    
    return this;
  }).call({});
  
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
    this.populateInventory();
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
  Shop.prototype.offers = function(option) { $shop.find(".menu").append($("<div/>").addClass("option").append(Message.create(option))); return this; };
  Shop.prototype.offersCharNames = function() {
    var chars = Party.getChars();
    for (var i = 0, n = chars.length; i < n; i++) {
      this.offers(chars[i].getName());
    }
    return this;
  };
  Shop.prototype.populateInventory = function() {
    var inventory = INVENTORIES[Party.getMap().id][this.id];
    console.log(inventory);
  };
  Shop.prototype.signShows = function(text) { $shop.find(".type").append(Message.create(text)); return this; };
  
  var ArmorShop = function() {};
  ArmorShop.prototype = new Shop(self.Types.Armor);
  ArmorShop.prototype.displayInit = function() { 
    this.signShows("ARMOR").npcSays("Welcome").offers("Buy").offers("Sell").offers("Exit");
    $shop.find(".menu").show();
    Cursors.lookup(Cursors.EQUIPMENT_SHOP).startListening();
  };
  
  var BlackMagicShop = function() {};
  BlackMagicShop.prototype = new Shop(self.Types.BlackMagic);
  BlackMagicShop.prototype.displayInit = function() {   
    this.signShows("BMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?").offersCharNames();
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
  
  var ItemShop = function() {};
  ItemShop.prototype = new Shop(self.Types.Item);
  ItemShop.prototype.displayInit = function() {   
    this.signShows(" ITEM").npcSays("Welcome").offers("Buy").offers("Exit");
    $shop.find(".menu").show();
  };
  
  var Inn = function() {};
  Inn.prototype = new Shop(self.Types.Inn);
  Inn.prototype.displayInit = function() {   
    this.signShows(" INN").npcSays("Welcome\n  ::\nStay,\nto save\nyour\ndata").offers("Yes").offers("No");
    $shop.find(".menu").show();
  };
  
  var WeaponShop = function() {};
  WeaponShop.prototype = new Shop(self.Types.Weapon);
  WeaponShop.prototype.displayInit = function() {   
    this.signShows("WEAPON").npcSays("Welcome").offers("Buy").offers("Sell").offers("Exit");
    $shop.find(".menu").show();
    Cursors.lookup(Cursors.EQUIPMENT_SHOP).startListening();
  };
  
  var WhiteMagicShop = function() {};
  WhiteMagicShop.prototype = new Shop(self.Types.WhiteMagic);
  WhiteMagicShop.prototype.displayInit = function() {   
    this.signShows("WMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?").offersCharNames();
    $shop.find(".menu").show();
  };
  
  return this;
}).call({});