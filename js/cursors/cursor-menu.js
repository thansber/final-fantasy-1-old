define(
/* CursorMenu */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "menus", "party", "constants/cursor", "constants/party"],
function($, Cursor, Event, KeyPressNotifier, Logger, Menus, Party, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* --------------------- */
    /* CHARACTER MENU cursor */
    /* --------------------- */
    var CharMenuCursor = function() { this.mode = null; };
    CharMenuCursor.prototype = Cursor.create(CursorConstants.CHAR_MENU)
      .setContainer("#charMenu .options")
      .addOtherKey(KeyPressNotifier.I, function() { this.item(); })
      .addOtherKey(KeyPressNotifier.M, function() { this.magic(); })
      .addOtherKey(KeyPressNotifier.W, function() { this.weapon(); })
      .addOtherKey(KeyPressNotifier.A, function() { this.armor(); })
      .addOtherKey(KeyPressNotifier.S, function() { this.status(); });
    CharMenuCursor.prototype.back = function() {
      this.clear();
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.WORLD_MAP);
      Event.transmit(Event.Types.SwitchMap, Party.getMap().id);
      if (this.previousListener) {
        Event.transmit(Event.Types.CursorStart, null, {cursor:this.previousListener});
      }
    };
    CharMenuCursor.prototype.initialCursor = function() { return this.$container.find(".option").eq(0); };
    CharMenuCursor.prototype.next = function() {
      this.clear();
      if (this.$cursor.is(".item")) { this.item(); }
      else if (this.$cursor.is(".magic")) { this.magic(); }
      else if (this.$cursor.is(".weapon")) { this.weapon(); }
      else if (this.$cursor.is(".armor")) { this.armor(); }
      else if (this.$cursor.is(".status")) { this.status(); }
    };
    CharMenuCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
    
    CharMenuCursor.prototype.item = function() {
      Menus.Item.load(Party.getConsumables(), Party.getKeyItems());
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.ITEM_MENU);
      Event.transmit(Event.Types.CursorStart, CursorConstants.INVENTORY);
    };
    CharMenuCursor.prototype.magic = function() { 
      this.clear();
      this.mode = "magic";
      Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_SELECTION_MENU, {prevListener:this});
    };
    CharMenuCursor.prototype.weapon = function() { 
      Menus.Weapon.load(Party.getChars());
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.WEAPON_MENU);
      Event.transmit(Event.Types.CursorStart, CursorConstants.WEAPON_ACTIONS_MENU);
    };
    CharMenuCursor.prototype.armor = function() {
      Menus.Armor.load(Party.getChars());
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.ARMOR_MENU);
      Event.transmit(Event.Types.CursorStart, CursorConstants.ARMOR_ACTIONS_MENU);
    };
    CharMenuCursor.prototype.status = function() {
      this.clear();
      this.mode = "status";
      Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_SELECTION_MENU, {prevListener:this});
    };
  };
  
  return {
    setup : setup
  };
});