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
    
    var ShopInventory = function(town, shopType, item) {
      this.town = town;
      this.shopType = shopType;
      this.item = item;
      
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
    
    self.create = function(town, shopType, item) {
      return new ShopInventory(town, shopType, item);
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
  
  Shop.prototype.addInventory = function(item) {
    var $prices = $shop.find(".prices");
    var itemDisplayPrice = Message.padToLength(item.price, 7);
    $prices.append($("<div/>").addClass("item").append(Message.create(item.desc)));
    $prices.append($("<div/>").addClass("price").append(Message.create(itemDisplayPrice)));
  };
  Shop.prototype.clear = function(whatToClear) { $shop.find(whatToClear).empty(); return this; };
  Shop.prototype.display = function() { 
    this.clear(".type, .prices, .menu");
    this.hide(".prices");
    this.resetOffers();
    this.displayInit();
    this.populateInventory();
    this.party().gold();
  };
  Shop.prototype.displayInit = function() { /* intentionally left empty for sub-classes to override */  };
  Shop.prototype.gold = function() {
    var partyGold = Message.padToLength(Party.getGold(), 6);
    this.clear(".gold");
    $shop.find(".gold").append(Message.create(partyGold + " G"));
    return this;
  };
  Shop.prototype.hide = function(what) { $shop.find(what).hide(); return false; };
  Shop.prototype.lookupInventory = function(index) { return INVENTORIES[Party.getMap().id][this.id][index]; };
  Shop.prototype.npcSays = function(dialog, append) { 
    if (!append) {
      this.clear(".npc.dialog");
    }
    $shop.find(".npc.dialog").append(Message.create(dialog, "append")); 
    return this; 
  };
  Shop.prototype.offers = function(option, cssClasses) { $shop.find(".menu").append($("<div/>").addClass("option").addClass(cssClasses).append(Message.create(option))); return this; };
  Shop.prototype.offersCharNames = function() {
    var chars = Party.getChars();
    for (var i = 0, n = chars.length; i < n; i++) {
      this.offers(chars[i].getName());
    }
    return this;
  };
  Shop.prototype.party = function() {
    var $party = $shop.find(".party");
    var chars = Party.getChars();
    
    this.clear(".party");
    for (var i = 0, n = chars.length; i < n; i++) {
      $party.append($("<div/>").addClass("char").addClass(chars[i].currentClass.name).toggleClass("first", i == 0));
    }
    return this;
  };
  Shop.prototype.populateInventory = function() {
    var shopInventory = INVENTORIES[Party.getMap().id][this.id];
    for (var i = 0; i < shopInventory.length; i++) {
      var inventoryItem = shopInventory[i];
      this.addInventory(inventoryItem.item);
    }
  };
  Shop.prototype.resetOffers = function() { /* intentionally left empty for sub-classes to override */ return this; };
  Shop.prototype.show = function(what) { $shop.find(what).show(); return this; };
  Shop.prototype.signShows = function(text) { $shop.find(".type").empty().append(Message.create(text)); return this; };
  Shop.prototype.toggleEquipmentMode = function(char) {
    switch (this.id) {
      case self.Types.Armor:
        char.armor();
        break;
      case self.Types.Weapon:
        char.weapons();
        break;
    }
    return this;
  };
  
  var ArmorShop = function() {};
  ArmorShop.prototype = new Shop(self.Types.Armor);
  ArmorShop.prototype.displayInit = function() { 
    this.signShows("ARMOR").npcSays("Welcome").show(".menu");
    Cursors.lookup(Cursors.EQUIPMENT_SHOP).startListening();
  };
  ArmorShop.prototype.resetOffers = function() { 
    this.offers("Buy", "buy").offers("Sell", "sell").offers("Exit", "exit");
    return this;
  };
  
  var BlackMagicShop = function() {};
  BlackMagicShop.prototype = new Shop(self.Types.BlackMagic);
  BlackMagicShop.prototype.displayInit = function() {   
    this.signShows("BMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?").offersCharNames().show(".menu");
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
    this.signShows(" ITEM").npcSays("Welcome").offers("Buy").offers("Exit").show(".menu");
  };
  
  var Inn = function() {};
  Inn.prototype = new Shop(self.Types.Inn);
  Inn.prototype.displayInit = function() {   
    this.signShows(" INN").npcSays("Welcome\n  ::\nStay,\nto save\nyour\ndata").offers("Yes").offers("No").show(".menu");
  };
  
  var WeaponShop = function() {};
  WeaponShop.prototype = new Shop(self.Types.Weapon);
  WeaponShop.prototype.displayInit = function() {   
    this.signShows("WEAPON").npcSays("Welcome").show(".menu");
    Cursors.lookup(Cursors.EQUIPMENT_SHOP).startListening();
  };
  WeaponShop.prototype.resetOffers = function() { 
    this.offers("Buy", "buy").offers("Sell", "sell").offers("Exit", "exit");
  };
  
  var WhiteMagicShop = function() {};
  WhiteMagicShop.prototype = new Shop(self.Types.WhiteMagic);
  WhiteMagicShop.prototype.displayInit = function() {   
    this.signShows("WMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?").offersCharNames().show(".menu");
  };
  
  return this;
}).call({});