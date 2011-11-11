var CharMenuHelper = (function() {
  var self = this;
  
  self.event = function($target) {
    
    Party.lightOrb("earth");
    Party.lightOrb("fire");
    Party.addGold(100);
    Party.createTestChars();
    
    if ($target.is(".load")) { CharMenu.load(); }
  };
  
  return this;
}).call({});