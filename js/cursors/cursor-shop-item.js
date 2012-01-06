define(
/* CursorShopItem */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "party", "constants/cursor"],
function($, Cursor, Event, KeyPressNotifier, Logger, Party, CursorConstants) {
  
  var setup = function() {
    /* ---------------- */
    /* ITEM SHOP cursor */
    /* ---------------- */
    var ItemShopCursor = function() {};
    var itemShopCursorOpt = {container:"#shop .menu", otherKeys:{}};
    itemShopCursorOpt.otherKeys[KeyPressNotifier.B] = function() { this.buy(); };
    itemShopCursorOpt.otherKeys[KeyPressNotifier.E] = function() { this.back(); };
    itemShopCursorOpt.otherKeys[KeyPressNotifier.X] = function() { this.back(); };
    
    ItemShopCursor.prototype = Cursor.create(CursorConstants.ITEM_SHOP, itemShopCursorOpt);
    ItemShopCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.ShopExit);
    };
    ItemShopCursor.prototype.buy = function() {
      var shop = Party.getShop();
      shop.npcSays("What do\nyou\nwant?").hide(".menu").show(".prices");
      Event.transmit(Event.Types.CursorStart, CursorConstants.ITEM_SHOP_SELECT_ITEM);
    };
    ItemShopCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    ItemShopCursor.prototype.next = function() {
      var $option = this.$cursor.closest(".option");
      if ($option.is(".buy")) {
        this.buy();
      } else if ($option.is(".exit")) {
        this.back();
      }
    };
    ItemShopCursor.prototype.yDestinations = function() { return this.$container.find(".option"); }
    
    /* ---------------------------- */
    /* ITEM SHOP SELECT ITEM cursor */
    /* ---------------------------- */
    var ItemShopSelectItemCursor = function() { };
    ItemShopSelectItemCursor.prototype = Cursor.create(CursorConstants.ITEM_SHOP_SELECT_ITEM, {container:"#shop .prices", otherKeys:{}});
    ItemShopSelectItemCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").resetOffers(Party.getChars()).show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.ITEM_SHOP);
    };
    ItemShopSelectItemCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    ItemShopSelectItemCursor.prototype.next = function() {
      var index = this.yDestinations().index(this.$cursor.closest(".item"));
      var shop = Party.getShop();
      var inventoryItem = shop.lookupInventory(Party.getMap(), index);
      
      this.clear();
      shop.npcSaysPrice(inventoryItem.item.price).offersConfirmation();
      Event.transmit(Event.Types.CursorStart, CursorConstants.ITEM_SHOP_CONFIRM, {item:inventoryItem.item});
    };
    ItemShopSelectItemCursor.prototype.yDestinations = function() { return this.$container.find(".item"); }
    
    /* ------------------------ */
    /* ITEM SHOP CONFIRM cursor */
    /* ------------------------ */
    var ItemShopConfirmCursor = function() { this.item = null; };
    var itemShopConfirmCursorOpt = {container:"#shop .menu", otherKeys:{}};
    itemShopConfirmCursorOpt.otherKeys[KeyPressNotifier.Y] = function() { this.confirm(); };
    itemShopConfirmCursorOpt.otherKeys[KeyPressNotifier.N] = function() { this.back(); };
    ItemShopConfirmCursor.prototype = Cursor.create(CursorConstants.ITEM_SHOP_CONFIRM, itemShopConfirmCursorOpt);
    ItemShopConfirmCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?");
      this.resetShop();
    };
    ItemShopConfirmCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    ItemShopConfirmCursor.prototype.next = function() {
      var $option = this.$cursor.closest(".option");
  
      if ($option.is(".yes")) {
        if (!Party.hasEnoughGoldFor(this.item.price)) {
          Party.getShop().npcSays("You\ncan't\nafford\nthat.");
          this.resetShop();
          return false;
        } else if (Party.lookupConsumable(this.item.name).qty >= 99) {
          Party.getShop().npcSays("You\ncan't\ncarry\nanymore.");
          this.resetShop();
          return false;
        } 
        Party.buy(this.item.price);
        Party.addConsumable(this.item.name, 1);
        Party.getShop().npcSays("Thank\nyou!\nWhat\nelse?").gold(Party.getGold());
        this.resetShop();
        Logger.debug("Bought a " + this.item.name + " for " + this.item.price);      
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    ItemShopConfirmCursor.prototype.reset = function(fullReset, opt) { this.item = opt.item; };
    ItemShopConfirmCursor.prototype.resetShop = function() { 
      Party.getShop().resetOffers(Party.getChars()).show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.ITEM_SHOP); 
    };
    ItemShopConfirmCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
  };
  
  return {
    setup : setup
  };
});