define(
/* CursorShopEquipment */ 
["jquery", "cursor", "equipment", "events", "key-press-notifier", "logger", "party", "constants/cursor"],
function($, Cursor, Equipment, Event, KeyPressNotifier, Logger, Party, CursorConstants) {
  
  var setup = function() {
    /* --------------------- */
    /* EQUIPMENT SHOP cursor */
    /* --------------------- */
    var EquipmentShopCursor = function() {};
    var equipmentShopCursorOpt = {container: "#shop .menu", otherKeys:{}};
    equipmentShopCursorOpt.otherKeys[KeyPressNotifier.B] = function() { this.buy(); };
    equipmentShopCursorOpt.otherKeys[KeyPressNotifier.E] = function() { this.exit(); };
    equipmentShopCursorOpt.otherKeys[KeyPressNotifier.S] = function() { this.sell(); };
    equipmentShopCursorOpt.otherKeys[KeyPressNotifier.X] = function() { this.exit(); };
    EquipmentShopCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP, equipmentShopCursorOpt);
    EquipmentShopCursor.prototype.back = function() { 
      KeyPressNotifier.clearListener();
      this.clear();
      Event.transmit(Event.Types.ShopExit);
    };
    EquipmentShopCursor.prototype.buy = function() { 
      Party.getShop().npcSays("What do\nyou\nwant?").hide(".menu").clear(".prices").populateInventory(Party.getMap()).show(".prices");
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_BUY_ITEM);
    };
    EquipmentShopCursor.prototype.exit = function() { this.back(); };
    EquipmentShopCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
    EquipmentShopCursor.prototype.next = function() { 
      var $option = this.$cursor.closest(".option");
      if ($option.is(".buy")) { this.buy(); }
      if ($option.is(".sell")) { this.sell(); }
      if ($option.is(".exit")) { this.exit(); }
    };
    EquipmentShopCursor.prototype.sell = function() {
      this.clear();
      Party.getShop().npcSays("Whose\nitem\ndo you\nwant to\nsell?").clear(".menu").offersCharNames(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_SELL);
    };
    EquipmentShopCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
    
    /* ------------------------------ */
    /* EQUIPMENT SHOP BUY ITEM cursor */
    /* ------------------------------ */
    var EquipmentShopBuyItemCursor = function() {};
    EquipmentShopBuyItemCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_BUY_ITEM, {container: "#shop .prices", otherKeys:{}});
    EquipmentShopBuyItemCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Welcome").hide(".prices").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopBuyItemCursor.prototype.initialCursor = function() { return this.$container.find(".item").eq(0); };
    EquipmentShopBuyItemCursor.prototype.next = function() { 
      var shop = Party.getShop();
      var index = this.$container.find(".item").index(this.$cursor.closest(".item"));
      var inventoryItem = shop.lookupInventory(Party.getMap(), index);
      shop.npcSaysPrice(inventoryItem.item.price).offersConfirmation();
      this.clear();
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_BUY_CONFIRM, {item:inventoryItem.item});
    };
    EquipmentShopBuyItemCursor.prototype.yDestinations = function() { return this.$container.find(".item"); };
  
    /* -------------------------------------- */
    /* EQUIPMENT SHOP BUY CONFIRMATION cursor */
    /* -------------------------------------- */
    var EquipmentShopBuyConfirmCursor = function() { this.inventoryItem = null; };
    var equipmentShopBuyConfirmOpt = {container: "#shop .menu", otherKeys:{}};
    equipmentShopBuyConfirmOpt.otherKeys[KeyPressNotifier.Y] = function() { this.next(); };
    equipmentShopBuyConfirmOpt.otherKeys[KeyPressNotifier.N] = function() { this.back(); };
    EquipmentShopBuyConfirmCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_BUY_CONFIRM, equipmentShopBuyConfirmOpt);
    EquipmentShopBuyConfirmCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopBuyConfirmCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
    EquipmentShopBuyConfirmCursor.prototype.next = function() {
      var $option = this.$cursor.closest(".option");
      if ($option.is(".yes")) {
        this.clear();
        Party.getShop().npcSays("Who\nwill\ntake\nit?").clear(".menu").offersCharNames(Party.getChars());
        Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_BUY_END, {item:this.inventoryItem});
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    EquipmentShopBuyConfirmCursor.prototype.reset = function(fullReset, opt) { this.inventoryItem = opt.item; };
    EquipmentShopBuyConfirmCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
    
    /* ------------------------------- */
    /* EQUIPMENT SHOP BUY FINAL cursor */
    /* ------------------------------- */
    var EquipmentShopBuyEndCursor = function() { this.item = null; };
    EquipmentShopBuyEndCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_BUY_END, {container:"#shop .menu", otherKeys:{}});
    EquipmentShopBuyEndCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopBuyEndCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
    EquipmentShopBuyEndCursor.prototype.next = function() {
      var index = this.$container.find(".option").index(this.$cursor.closest(".option"));
      var shop = Party.getShop();
      var char = Party.getChar(index);
      
      this.clear();
      if (!Party.hasEnoughGoldFor(this.item.price)) {
        shop.npcSays("You\ncan't\nafford\nthat.").clear(".menu").resetOffers(Party.getChars());
        Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
        return false;
      } else if (false) {
        // TODO: has too many things
        return false;
      }
      
      shop.toggleEquipmentMode(char);
      char.add(this.item.name);
      Party.buy(this.item.price);
      
      shop.npcSays("Thank\nyou!\nWhat\nelse?").gold(Party.getGold()).clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
  
      Logger.debug(char.getName() + " just bought a " + this.item.name + " for " + this.item.price + "G");
    };
    EquipmentShopBuyEndCursor.prototype.reset = function(fullReset, opt) { this.item = opt.item; };
    EquipmentShopBuyEndCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
   
    /* -------------------------- */
    /* EQUIPMENT SHOP SELL cursor */
    /* -------------------------- */
    var EquipmentShopSellCursor = function() {};
    EquipmentShopSellCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_SELL, {container:"#shop .menu", otherKeys:{}});
    EquipmentShopSellCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopSellCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); };
    EquipmentShopSellCursor.prototype.next = function() {
      var index = this.$container.find(".option").index(this.$cursor.closest(".option"));
      var char = Party.getChar(index);
      var shop = Party.getShop();
      
      shop.toggleEquipmentMode(char).clear(".prices");
      var equipment = char.getEquipment();
  
      this.clear();
      if (!char.hasEquipment()) {
        shop.npcSays("You\nhave\nnothing\nto sell\n  ::\nAny-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars()).hide(".prices");
        Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
      } else {
        for (var i = 0; i < equipment.length; i++) {
          shop.addInventory(equipment[i].desc, equipment[i].price);
        }
        
        shop.show(".prices");
        Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_SELL_ITEM, {char:char});
      }
    };
    EquipmentShopSellCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
   
    /* ------------------------------- */
    /* EQUIPMENT SHOP SELL ITEM cursor */
    /* ------------------------------- */
    var EquipmentShopSellItemCursor = function() { this.char = null; };
    EquipmentShopSellItemCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_SELL_ITEM, {container: "#shop .prices", otherKeys:{}});
    EquipmentShopSellItemCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopSellItemCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); };
    EquipmentShopSellItemCursor.prototype.next = function() { 
      var shop = Party.getShop();
      var index = this.$container.find(".item").index(this.$cursor.closest(".item"));
      shop.toggleEquipmentMode(this.char);
      var item = this.char.getEquipment()[index];
      shop.npcSaysPrice(Equipment.sellsFor(item)).offersConfirmation();
      this.clear();
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP_SELL_CONFIRM, {char:this.char, item:item, itemIndex:index});
    };
    EquipmentShopSellItemCursor.prototype.reset = function(fullReset, opt) { this.char = opt.char; };
    EquipmentShopSellItemCursor.prototype.yDestinations = function() { return this.$container.find(".item"); };
  
    /* ---------------------------------- */
    /* EQUIPMENT SHOP SELL CONFIRM cursor */
    /* ---------------------------------- */
    var EquipmentShopSellConfirmCursor = function() { this.char = null; this.item = null; this.itemIndex = null; };
    var equipmentShopSellConfirmOpt = {container: "#shop .menu", otherKeys:{}};
    equipmentShopSellConfirmOpt.otherKeys[KeyPressNotifier.Y] = function() { this.next(); };
    equipmentShopSellConfirmOpt.otherKeys[KeyPressNotifier.N] = function() { this.back(); };
    EquipmentShopSellConfirmCursor.prototype = Cursor.create(CursorConstants.EQUIPMENT_SHOP_SELL_CONFIRM, equipmentShopSellConfirmOpt);
    EquipmentShopSellConfirmCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").clear(".menu").resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
    };
    EquipmentShopSellConfirmCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); };
    EquipmentShopSellConfirmCursor.prototype.next = function() { 
      var $option = this.$cursor.closest(".option");
      if ($option.is(".yes")) {
        if (this.char.isEquipped(this.itemIndex)) {
          this.char.unequip(this.itemIndex);
        }
        this.char.drop(this.itemIndex);
        Party.addGold(Equipment.sellsFor(this.item));
  
        this.clear();
        Party.getShop().npcSays("Thank\nyou!\nWhat\nelse?").gold(Party.getGold()).clear(".menu").resetOffers(Party.getChars());
        Event.transmit(Event.Types.CursorStart, CursorConstants.EQUIPMENT_SHOP);
        Logger.debug(this.char.getName() + " sold a " + this.item.name + " at index " + this.itemIndex + " for " + Equipment.sellsFor(this.item) + "G");
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    EquipmentShopSellConfirmCursor.prototype.reset = function(fullReset, opt) { this.char = opt.char; this.item = opt.item; this.itemIndex = opt.itemIndex; };
    EquipmentShopSellConfirmCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
  };
  
  return {
    setup : setup
  };
});