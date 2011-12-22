var MenuHelper = (function() {
  var self = this;
  
  self.event = function($target) {
    if ($target.is(".load")) { 
      Party.createTestChars(); 
      Party.lightOrb("earth");
      Party.lightOrb("fire");
      Menus.Char.load(); 
    } 
    else if ($target.is(".armor")) { Party.createTestChars(); Cursors.lookup(Cursors.CHAR_MENU).armor(); } 
    else if ($target.is(".weapon")) { Party.createTestChars(); Cursors.lookup(Cursors.CHAR_MENU).weapon(); } 
    else if ($target.is(".magic")) { Party.createTestChars(); Cursors.lookup(Cursors.CHAR_MENU).magic(); } 
    else if ($target.is(".item")) { Party.createTestChars(); Cursors.lookup(Cursors.CHAR_MENU).item(); } 
    else if ($target.is(".status")) { Party.createTestChars(); Cursors.lookup(Cursors.CHAR_MENU).status(); }
    else if ($target.is(".newChar")) { Party.switchView("#newChar"); Cursors.lookup(Cursors.NEW_CHAR).startListening(); }
    else if ($target.is(".newCharName")) { Party.switchView("#newCharName"); Cursors.lookup(Cursors.NEW_CHAR_NAME).startListening(); }
  };
  
  return this;
}).call({});