var MenuHelper = (function() {
  var self = this;
  
  self.event = function($target) {
    if ($target.is(".load")) { 
      Party.lightOrb("earth");
      Party.lightOrb("fire");
      Party.addGold(100);
      Party.createTestChars();
      Menus.Char.load(); 
    } else if ($target.is(".armor")) {
      Party.createTestChars();
      Cursors.lookup(Cursors.CHAR_MENU).armor();
    } else if ($target.is(".weapon")) {
      Party.createTestChars();
      Cursors.lookup(Cursors.CHAR_MENU).weapon();
    }
  };
  
  return this;
}).call({});