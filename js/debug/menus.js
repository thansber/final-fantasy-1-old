define(
/* DebugMenu */
["cursor", "constants/cursor", "events", "menus", "party", "constants/party"],
function(Cursor, CursorConstants, Event, Menus, Party, PartyConstants) {

  return {
    event : function($target) {
      if ($target.is(".load")) {
        Party.lightOrb("earth");
        Party.lightOrb("fire");
        Menus.Char.load(Party.getChars(), Party.getLitOrbs(), Party.getGold());
      }
      else if ($target.is(".armor")) { Cursor.lookup(CursorConstants.CHAR_MENU).armor(); }
      else if ($target.is(".weapon")) { Cursor.lookup(CursorConstants.CHAR_MENU).weapon(); }
      else if ($target.is(".magic")) { Cursor.lookup(CursorConstants.CHAR_MENU).magic(); }
      else if ($target.is(".item")) { Cursor.lookup(CursorConstants.CHAR_MENU).item(); }
      else if ($target.is(".status")) { Cursor.lookup(CursorConstants.CHAR_MENU).status(); }
      else if ($target.is(".newChar")) {  Event.transmit(Event.Types.SwitchView, PartyConstants.Views.NEW_CHAR); Event.transmit(Event.Types.CursorStart, CursorConstants.NEW_CHAR); }
      else if ($target.is(".newCharName")) { Event.transmit(Event.Types.SwitchView, PartyConstants.Views.NEW_CHAR_NAME); Event.transmit(Event.Types.CursorStart, CursorConstants.NEW_CHAR_NAME); }
    }
  };
});