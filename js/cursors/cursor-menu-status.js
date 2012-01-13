define(
/* CursorMenuStatus */ 
["jquery", "cursor", "events", "logger", "constants/cursor", "constants/party"],
function($, Cursor, Event, Logger, CursorConstants, PartyConstants) {
  
  var setup = function() {

    /* ------------------ */
    /* STATUS MENU cursor */
    /* ------------------ */
    var StatusMenuCursor = function() {};
    StatusMenuCursor.prototype = Cursor.create(CursorConstants.STATUS_MENU);
    StatusMenuCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.MENU);
      if (this.previousListener) {
        Event.transmit(Event.Types.CursorStart, null, {
          cursor : this.previousListener,
          prevListener : this.previousListener.previousListener,
          reset : false
        });
      }
    };
    StatusMenuCursor.prototype.next = function() { this.back(); };
  };
  
  return {
    setup : setup
  };
});