define(
/* CursorShopMagic */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "party", "constants/cursor"],
function($, Cursor, Event, KeyPressNotifier, Logger, Party, CursorConstants) {
  
  var setup = function() {
    /* ----------------- */
    /* MAGIC SHOP cursor */
    /* ----------------- */
    var MagicShopCursor = function() { };
    MagicShopCursor.prototype = Cursor.create(CursorConstants.MAGIC_SHOP, {container:"#shop .menu", otherKeys:{}});
    MagicShopCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.ShopExit);
    };
    MagicShopCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    MagicShopCursor.prototype.next = function() {
      var index = this.yDestinations().index(this.$cursor.closest(".option"));
      var char = Party.getChar(index);
      var shop = Party.getShop();
      
      shop.hide(".menu").show(".prices");
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP_SPELL, {char:char});
    };
    MagicShopCursor.prototype.yDestinations = function() { return this.$container.find(".option"); }
  
    /* ------------------------------ */
    /* MAGIC SHOP SELECT SPELL cursor */
    /* ------------------------------ */
    var MagicShopSpellCursor = function() { this.char = null; };
    MagicShopSpellCursor.prototype = Cursor.create(CursorConstants.MAGIC_SHOP_SPELL, {container:"#shop .prices", otherKeys:{}});
    MagicShopSpellCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?").show(".menu");
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP);
    };
    MagicShopSpellCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    MagicShopSpellCursor.prototype.next = function() {
      var index = this.yDestinations().index(this.$cursor.closest(".item"));
      var shop = Party.getShop();
      var inventoryItem = shop.lookupInventory(Party.getMap(), index);
      
      this.clear();
      shop.npcSaysPrice(inventoryItem.item.price).offersConfirmation();
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP_CONFIRM, {char:this.char, spell:inventoryItem.item});
    };
    MagicShopSpellCursor.prototype.reset = function(fullReset, opt) { this.char = opt.char; }
    MagicShopSpellCursor.prototype.yDestinations = function() { return this.$container.find(".item"); }
  
    /* ------------------------- */
    /* MAGIC SHOP CONFIRM cursor */
    /* ------------------------- */
    var MagicShopConfirmCursor = function() { this.char = null; this.spell = null; };
    var magicShopConfirmCursorOpt = {container:"#shop .menu", otherKeys:{}};
    magicShopConfirmCursorOpt.otherKeys[KeyPressNotifier.Y] = function() { this.confirm(); };
    magicShopConfirmCursorOpt.otherKeys[KeyPressNotifier.N] = function() { this.back(); };
    MagicShopConfirmCursor.prototype = Cursor.create(CursorConstants.MAGIC_SHOP_CONFIRM, magicShopConfirmCursorOpt);
    MagicShopConfirmCursor.prototype.back = function() { 
      this.clear();
      Party.getShop().npcSays("Too bad\n::\nSome-\nthing\nelse?");
      this.resetShop();
    };
    MagicShopConfirmCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); }
    MagicShopConfirmCursor.prototype.next = function() {
      var $option = this.$cursor.closest(".option");
      
      if ($option.is(".yes")) {
        if (!this.char.isSpellAllowed(this.spell)) {
          Party.getShop().npcSays("Sorry\nYou\ncan't\nlearn\nthat.\nSomeone\nelse?");
          this.resetShop();
          return false;
        } else if (!Party.hasEnoughGoldFor(this.spell.price)) {
          Party.getShop().npcSays("You\ncan't\nafford\nthat.");
          this.resetShop();
          return false;
        } else if (this.char.knowsSpell(this.spell)) {
          Party.getShop().npcSays("You\nalready\nknow\nthat\nspell.\nSomeone\nelse?");
          this.resetShop();
          return false;
        } else if (!this.char.canLearnSpell(this.spell)) {
          Party.getShop().npcSays("This\nlevel\nspell\nis full\n::\nSomeone\nelse?");
          this.resetShop();
          return false;
        }
        
        this.clear();
        this.char.learnSpell(this.spell);
        Party.buy(this.spell.price);
        Party.getShop().gold(Party.getGold()).resetOffers(Party.getChars()).displayInit();
        Logger.debug(this.char.getName() + " bought " + this.spell.spellId + " for " + this.spell.price);
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    MagicShopConfirmCursor.prototype.reset = function(fullReset, opt) { this.char = opt.char; this.spell = opt.spell; }
    MagicShopConfirmCursor.prototype.resetShop = function() { 
      this.clear();
      Party.getShop().resetOffers(Party.getChars());
      Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_SHOP);
    };
  
    MagicShopConfirmCursor.prototype.yDestinations = function() { return this.$container.find(".option"); }
  };
  
  return {
    setup : setup
  };
});