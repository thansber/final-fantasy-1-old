define(
/* CursorMenuInventory */ 
["jquery", "cursor", "events", "logger", "constants/cursor", "constants/party"],
function($, Cursor, Event, Logger, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* ---------------------------- */
    /* INVENTORY (ITEM MENU) cursor */
    /* ---------------------------- */
    var InventoryCursor = function() {};
    InventoryCursor.prototype = Cursor.create(CursorConstants.INVENTORY, {container: "#itemMenu .inventory", otherKeys:{}});
    InventoryCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.MENU);      
      Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_MENU);
    };
    InventoryCursor.prototype.initialCursor = function() { return this.$container.find(".item").eq(0); };
    InventoryCursor.prototype.next = function() { this.back(); };
    InventoryCursor.prototype.xDestinations = function() { 
      var $items = this.$container.find(".item");
      var index = $items.index(this.$cursor);
      var startIndex = Math.floor(index / 3) * 3 + 0;
      return $items.slice(startIndex, startIndex + 3); 
    };
    InventoryCursor.prototype.yDestinations = function() {
      var $items = this.$container.find(".item");
      var index = $items.index(this.$cursor);
      return this.$container.find(".item:nth-child(3n - " + (2 - (index % 3)) + ")");
    };
  };
  
  return {
    setup : setup
  };
});