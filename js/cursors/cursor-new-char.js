define(
/* CursorNewChar */ 
["jquery", "cursor", "events", "logger", "messages", "menus", "party", "constants/cursor", "constants/party"],
function($, Cursor, Event, Logger, Message, Menus, Party, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* --------------- */
    /* NEW CHAR cursor */
    /* --------------- */
    var NewCharCursor = function() { this.index = 0; };
    NewCharCursor.prototype = Cursor.create(CursorConstants.NEW_CHAR, {container:"#newChar .party", otherKeys:{}});
    NewCharCursor.prototype.back = function() { 
      if (this.index > 0) {
        this.index--;
        Party.clearLastChar();
        this.move(0, 0);
      }
    };
    NewCharCursor.prototype.charChanged = function(dir) {
      var $slot = this.initialCursor();
      var $charClasses = $slot.find(".charClass");
      var charIndex = $charClasses.index($slot.find(".charClass:not(.hidden)"));
      
      charIndex += dir;
      if (charIndex >= $charClasses.length) {
        charIndex = 0;
      } else if (charIndex < 0) {
        charIndex = $charClasses.length - 1;
      }
      Menus.NewChar.selectionChanged($slot, charIndex);    
      return $slot;
    };
    NewCharCursor.prototype.columnChanged = function(x) { return this.charChanged(x); };
    NewCharCursor.prototype.initialCursor = function() { return this.$container.find(".slot").eq(this.index); };
    NewCharCursor.prototype.next = function() {
      this.clear();
      if (Party.getChars().length == 4) {
        // TODO: open animation
        Party.startGame();
        return false;
      }
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.NEW_CHAR_NAME);
      Event.transmit(Event.Types.CursorStart, CursorConstants.NEW_CHAR_NAME);
    };
    NewCharCursor.prototype.reset = function(fullReset, opt) {
      if (this.index === undefined) {
        this.index = 0;
      }
      if (opt.name) {
        this.initialCursor().find(".name").empty().append(Message.create(opt.name));
      }
      
      if (opt.indexChange !== undefined) {
        this.index += opt.indexChange;
      }
    };
    NewCharCursor.prototype.rowChanged = function(y) { return this.charChanged(y); };
  };
  
  return {
    setup : setup
  };
});