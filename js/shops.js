define( 
/* Shops */ 
["jquery", "events", "messages", "constants/cursor", "constants/shop"], 
function($, Event, Message, CursorConstants, ShopConstants) { 
  return (function() {
    var self = this;
    var ALL = {};
    var INVENTORIES = {};
    var $shop = null;
    
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
    
    self.create = function(id) { return new Shop(id); };
    self.init = function() { $shop = $("#shop"); };
    self.lookup = function(id) { return ALL[id]; };
    
    var Shop = function(id) {
      this.id = id;
      ALL[id] = this;
    };
    
    Shop.prototype.addInventory = function(desc, price) {
      var $prices = $shop.find(".prices");
      var itemDisplayPrice = Message.padToLength(price, 7);
      $prices.append($("<div/>").addClass("item").append(Message.create(desc)));
      $prices.append($("<div/>").addClass("price").append(Message.create(itemDisplayPrice)));
      return this;
    };
    Shop.prototype.clear = function(whatToClear) { $shop.find(whatToClear).empty(); return this; };
    Shop.prototype.display = function(aliveChars, allChars, map, gp) { 
      this.clear(".type, .prices, .menu");
      this.hide(".prices");
      this.resetOffers(allChars);
      this.displayInit(allChars);
      this.populateInventory(map);
      this.party(aliveChars).gold(gp);
    };
    Shop.prototype.displayInit = function(chars) { /* intentionally left empty for sub-classes to override */  };
    Shop.prototype.gold = function(gp) {
      var partyGold = Message.padToLength(gp, 6);
      this.clear(".gold");
      $shop.find(".gold").append(Message.create(partyGold + " G"));
      return this;
    };
    Shop.prototype.hide = function(what) { $shop.find(what).hide(); return this; };
    Shop.prototype.lookupInventory = function(map, index) { return INVENTORIES[map.id][this.id][index]; };
    Shop.prototype.npcSays = function(dialog, append) { 
      if (!append) {
        this.clear(".npc.dialog");
      }
      $shop.find(".npc.dialog").append(Message.create(dialog, "append")); 
      return this; 
    };
    Shop.prototype.npcSaysPrice = function(price) { return this.npcSays(Message.padToLength(price, 5)).npcSays("Gold", true).npcSays("OK?", true); };
    Shop.prototype.offers = function(option, cssClasses) { $shop.find(".menu").append($("<div/>").addClass("option").addClass(cssClasses).append(Message.create(option))); return this; };
    Shop.prototype.offersCharNames = function(chars) {
      for (var i = 0, n = chars.length; i < n; i++) {
        this.offers(chars[i].getName());
      }
      return this;
    };
    Shop.prototype.offersConfirmation = function() { return this.clear(".menu").offers("Yes", "yes").offers("No", "no").show(".menu"); };
    Shop.prototype.party = function(chars) {
      var $party = $shop.find(".party");
      this.clear(".party");
      for (var i = 0, n = chars.length; i < n; i++) {
        $party.append($("<div/>").addClass("char").addClass(chars[i].currentClass.name).toggleClass("first", i == 0));
      }
      return this;
    };
    Shop.prototype.populateInventory = function(map) {
      var shopInventory = INVENTORIES[map.id][this.id];
      if (shopInventory) {
        for (var i = 0; i < shopInventory.length; i++) {
          var inventoryItem = shopInventory[i];
          this.addInventory(inventoryItem.item.desc, inventoryItem.item.price);
        }
      }
      return this;
    };
    Shop.prototype.populateSpellInventory = function(map) {
      var shopInventory = INVENTORIES[map.id][this.id];
      if (shopInventory) {
        for (var i = 0; i < shopInventory.length; i++) {
          var spell = shopInventory[i].item;
          var spellDisplayPrice = "L" + spell.spellLevel + Message.padToLength(spell.price, 5);
          this.addInventory(spell.spellId, spellDisplayPrice);
        }
      }
      return this;
    };
    Shop.prototype.resetOffers = function(allChars) { /* intentionally left empty for sub-classes to override */ return this; };
    Shop.prototype.show = function(what) { $shop.find(what).show(); return this; };
    Shop.prototype.signShows = function(text) { $shop.find(".type").empty().append(Message.create(text)); return this; };
    Shop.prototype.toggleEquipmentMode = function(char) {
      switch (this.id) {
        case ShopConstants.Armor:
          char.armor();
          break;
        case ShopConstants.Weapon:
          char.weapons();
          break;
      }
      return this;
    };
    
    var ArmorShop = function() {};
    ArmorShop.prototype = new Shop(ShopConstants.Armor);
    ArmorShop.prototype.displayInit = function() { 
      this.signShows("ARMOR").npcSays("Welcome").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    ArmorShop.prototype.resetOffers = function() { 
      this.offers("Buy", "buy").offers("Sell", "sell").offers("Exit", "exit");
      return this;
    };
    
    var BlackMagicShop = function() {};
    BlackMagicShop.prototype = new Shop(ShopConstants.BlackMagic);
    BlackMagicShop.prototype.displayInit = function() {   
      this.signShows("BMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?");
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP);
    };
    BlackMagicShop.prototype.populateInventory = function(map) { this.populateSpellInventory(map); };
    BlackMagicShop.prototype.resetOffers = function(chars) { this.clear(".menu").offersCharNames(chars).show(".menu"); return this; };
    
    var BlackMagicShop2 = function() {
      this.id = ShopConstants.BlackMagic2;
      ALL[this.id] = this;
    };
    BlackMagicShop2.prototype = new BlackMagicShop();
    
    var Clinic = function() {};
    Clinic.prototype = new Shop(ShopConstants.Clinic);
    Clinic.prototype.displayInit = function(chars) { 
      var welcomeMessage = "";
      var anyCharactersDead = false;
  
      for (var i = 0, n = chars.length; i < n; i++) {
        if (chars[i].isDead()) {
          anyCharactersDead = true;
          this.offers(chars[i].getName());
        }
      }
      
      welcomeMessage = anyCharactersDead ? "Who\nshall\nbe\nrevived\n::" : "You do\nnot\nneed my\nhelp\nnow.";
      
      this.signShows("CLINIC").npcSays(welcomeMessage);
      $shop.find(".menu").toggle(anyCharactersDead);
      Event.transmit(Event.Types.CursorStart, CursorConstants.CLINIC, {notNeeded:!anyCharactersDead});
    };
    
    var ItemShop = function() {};
    ItemShop.prototype = new Shop(ShopConstants.Item);
    ItemShop.prototype.displayInit = function() {   
      this.signShows(" ITEM").npcSays("Welcome").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.ITEM_SHOP);
    };
    ItemShop.prototype.resetOffers = function() { 
      this.clear(".menu").offers("Buy", "buy").offers("Exit", "exit");
      return this;
    };
    
    var Inn = function() {};
    Inn.prototype = new Shop(ShopConstants.Inn);
    Inn.prototype.displayInit = function() {   
      this.signShows(" INN").npcSays("Welcome\n  ::\nStay,\nto save\nyour\ndata").offers("Yes", "yes").offers("No", "no").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.INN);
    };
    
    var WeaponShop = function() {};
    WeaponShop.prototype = new Shop(ShopConstants.Weapon);
    WeaponShop.prototype.displayInit = function() {   
      this.signShows("WEAPON").npcSays("Welcome").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    WeaponShop.prototype.resetOffers = function() { 
      this.offers("Buy", "buy").offers("Sell", "sell").offers("Exit", "exit");
    };
    
    var WhiteMagicShop = function() {};
    WhiteMagicShop.prototype = new Shop(ShopConstants.WhiteMagic);
    WhiteMagicShop.prototype.displayInit = function() {   
      this.signShows("WMAGIC").npcSays("Who\nwill\nlearn\nthe\nspell?");
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP);
    };
    WhiteMagicShop.prototype.populateInventory = function(map) { this.populateSpellInventory(map); };
    WhiteMagicShop.prototype.resetOffers = function(chars) { this.clear(".menu").offersCharNames(chars).show(".menu"); return this; };
  
    var WhiteMagicShop2 = function() {
      this.id = ShopConstants.WhiteMagic2;
      ALL[this.id] = this;
    };
    WhiteMagicShop2.prototype = new WhiteMagicShop();
    
    return this;
  }).call({})
});