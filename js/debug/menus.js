var MenuHelper = (function() {
  var self = this;
  
  self.event = function($target) {
    Party.createTestChars();
    if ($target.is(".load")) { 
      Party.lightOrb("earth");
      Party.lightOrb("fire");
      Party.addGold(100);
      Menus.Char.load(); 
    } else if ($target.is(".armor")) {
      Cursors.lookup(Cursors.CHAR_MENU).armor();
    } else if ($target.is(".weapon")) {
      Cursors.lookup(Cursors.CHAR_MENU).weapon();
    } else if ($target.is(".magic")) {
      Cursors.lookup(Cursors.CHAR_MENU).magic();
    } else if ($target.is(".status")) {
      Cursors.lookup(Cursors.CHAR_MENU).status();
    }
  };
  
  return this;
}).call({});