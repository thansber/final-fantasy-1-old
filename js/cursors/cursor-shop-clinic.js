define(
/* CursorShopClinic */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "party", "constants/cursor"],
function($, Cursor, Event, KeyPressNotifier, Logger, Party, CursorConstants) {
  
  var setup = function() { 

    /* ------------- */
    /* CLINIC cursor */
    /* ------------- */
    var ClinicCursor = function() { this.notNeeded = false; };
    ClinicCursor.prototype = Cursor.create(CursorConstants.CLINIC).setContainer("#shop .menu");
    ClinicCursor.prototype.back = function() { 
      KeyPressNotifier.clearListener();
      this.clear();
      Event.transmit(Event.Types.ShopExit);
    };
    ClinicCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    ClinicCursor.prototype.next = function() {
      if (this.notNeeded) {
        this.back();
        return false;
      }
      
      var index = this.yDestinations().index(this.$cursor.closest(".option"));
      var chars = Party.getChars();
      var deadCharIndex = -1;
      var charToRevive = null;
      for (var i = 0; i < chars.length; i++) {
        if (chars[i].isDead()) {
          deadCharIndex++;
          if (deadCharIndex == index) {
            charToRevive = chars[i];
          }
        }
      }
      
      var shop = Party.getShop();
      shop.npcSaysPrice(shop.lookupInventory(Party.getMap(), 0).item.price).offersConfirmation();
      Event.transmit(Event.Types.CursorStart, CursorConstants.CLINIC_CONFIRM, {char:charToRevive});
      Logger.debug("reviving char " + index);
    };
    ClinicCursor.prototype.reset = function(fullReset, opt) { this.notNeeded = opt.notNeeded; }; 
    ClinicCursor.prototype.yDestinations = function() { return this.$container.find(".option"); }
    
    /* --------------------- */
    /* CLINIC CONFIRM cursor */
    /* --------------------- */
    var ClinicConfirmCursor = function() { this.char = null; this.justRevived = false; this.leaving = true; };
    ClinicConfirmCursor.prototype = Cursor.create(CursorConstants.CLINIC_CONFIRM).setContainer("#shop .menu");
    ClinicConfirmCursor.prototype.back = function() {
      if (this.leaving) {
        this.clear();
        Event.transmit(Event.Types.ShopExit);
        return false;
      }
      if (this.justRevived) {
        this.resetShop();
        return false;
      }
  
      this.clear();
      this.resetShop();
    };
    ClinicConfirmCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    ClinicConfirmCursor.prototype.next = function() {
      if (this.leaving) {
        this.clear();
        Event.transmit(Event.Types.ShopExit);
        return false;
      }
  
      if (this.justRevived) {
        this.resetShop();
        return false;
      }
      var $option = this.$cursor.closest(".option");
      if ($option.is(".yes")) {
        var shop = Party.getShop();
        var price = shop.lookupInventory(Party.getMap(), 0).item.price;
        
        if (!Party.hasEnoughGoldFor(price)) {
          shop.npcSays("You\ncan't\nafford\nthat.").hide(".menu");
          this.leaving = true;
          return false;
        }
        shop.npcSays("WARRIOR\n::\nReturn\nto\nlife!").hide(".menu");
        Party.buy(price);
        this.char.resurrect();
        shop.party(Party.getAliveChars()).gold(Party.getGold()).hide(".menu").clear(".menu");
        this.justRevived = true;
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    ClinicConfirmCursor.prototype.reset = function(fullReset, opt) { this.char = opt.char; this.justRevived = false; this.leaving = false; }; 
    ClinicConfirmCursor.prototype.resetShop = function() {
      Party.getShop().clear(".menu").displayInit(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.CLINIC, {notNeeded:Party.getAliveChars().length == Party.getChars().length});
    };
    ClinicConfirmCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
  };
  
  return {
    setup : setup
  };
});