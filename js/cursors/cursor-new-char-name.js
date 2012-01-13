define(
/* CursorNewCharName */ 
["jquery", "cursor", "events", "logger", "messages", "menus", "party", "constants/cursor", "constants/party"],
function($, Cursor, Event, Logger, Message, Menus, Party, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* -------------------- */
    /* NEW CHAR NAME cursor */
    /* -------------------- */
    var NewCharNameCursor = function() { this.name = ""; };
    NewCharNameCursor.prototype = Cursor.create(CursorConstants.NEW_CHAR_NAME).setContainer("#newCharName .letters");
    NewCharNameCursor.prototype.back = function() { 
      this.name = this.name.substr(0, this.name.length - 1); 
      this.updateName();
    };
    NewCharNameCursor.prototype.cursorIndex = function() { return this.$container.find(".text").index(this.$cursor); };
    NewCharNameCursor.prototype.initialCursor = function() { return this.$container.find(".text").eq(0); };
    NewCharNameCursor.prototype.next = function() {
      if (this.name.length >= 4) {
        this.clear();
        // TODO: get the char class from the user selection
        Party.addChar(Party.createNewChar(this.name, CharacterClass.FIGHTER));
        Event.transmit(Event.Types.SwitchView, PartyConstants.Views.NEW_CHAR);
        Event.transmit(Event.Types.CursorStart, CursorConstants.NEW_CHAR, {indexChange:1, name:this.name});
        return false;
      }
      
      this.name += Menus.NewCharName.getSymbol(this.cursorIndex());
      this.updateName();
    };
    NewCharNameCursor.prototype.reset = function(fullReset, opt) { this.name = ""; $("#newCharName .name").empty(); }; 
    NewCharNameCursor.prototype.updateName = function() { $("#newCharName .name").empty().append(Message.create(this.name)); }; 
    NewCharNameCursor.prototype.xDestinations = function() { 
      var $text = this.$container.find(".text");
      var startIndex = Math.floor(this.cursorIndex() / 10) * 10;
      return $text.slice(startIndex, startIndex + 10); 
    };
    NewCharNameCursor.prototype.yDestinations = function() {
      return this.$container.find(".text:nth-child(10n - " + (9 - (this.cursorIndex() % 10)) + ")");
    };
  };
  
  return {
    setup : setup
  };
});