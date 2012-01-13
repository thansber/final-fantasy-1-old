define(
/* CursorMenuCharSelection */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "menus", "party", "constants/cursor", "constants/party"],
function($, Cursor, Event, KeyPressNotifier, Logger, Menus, Party, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* --------------------- */
    /* CHAR SELECTION cursor */
    /* --------------------- */
    var CharSelectionMenuCursor = function() {};
    CharSelectionMenuCursor.prototype = Cursor.create(CursorConstants.CHAR_SELECTION_MENU).setContainer("#charMenu .party");
    CharSelectionMenuCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_MENU);
    };
    CharSelectionMenuCursor.prototype.getCursorIndex = function() { return this.$container.find(".char.profile").index(this.$cursor); };
    CharSelectionMenuCursor.prototype.initialCursor = function() { return this.$container.find(".char.profile").eq(0); };
    CharSelectionMenuCursor.prototype.next = function() { 
      KeyPressNotifier.clearListener();
      if (this.previousListener.mode == "magic") {
        Menus.Magic.load(Party.getChar(this.getCursorIndex()));
        Event.transmit(Event.Types.SwitchView, PartyConstants.Views.MAGIC_MENU);
        Event.transmit(Event.Types.CursorStart, CursorConstants.MAGIC_MENU, {prevListener:this});
      } else if (this.previousListener.mode == "status") {
        Menus.Status.load(Party.getChar(this.getCursorIndex()));
        Event.transmit(Event.Types.SwitchView, PartyConstants.Views.STATUS_MENU);
        Event.transmit(Event.Types.CursorStart, CursorConstants.STATUS_MENU, {prevListener:this});
      }
    };
    CharSelectionMenuCursor.prototype.xDestinations = function() {
      var startIndex = Math.floor(this.getCursorIndex() / 2) * 2; 
      return this.$container.find(".char.profile").slice(startIndex, startIndex + 2); 
    };
    CharSelectionMenuCursor.prototype.yDestinations = function() { return this.$container.find(".char.profile:" + (this.getCursorIndex() % 2 == 0 ? "even" : "odd")); };
  };
  
  return {
    setup : setup
  };
});