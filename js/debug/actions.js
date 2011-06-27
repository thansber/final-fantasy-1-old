var ActionHelper = (function() {
  
  var event = function($target) {
    Party.clearChars();
    var char = Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0)
      .weapon("Rapier", true)
      .armor("Wooden[A]", true)
      .armor("Wooden[S]", true);
    var monster = Monster.createForBattle(Monster.lookup("ARACHNID"));
    var result = null;
    
    if ($target.is(".char.attack")) {
      result = Action.attack(char, monster);
    } else if ($target.is(".monster.attack")) {
      result = Action.attack(monster, char);
    }
    
    console.log(jQuery.map(result, function(value, index) {
      var v = value;
      if (value) {
        if (value.getName) {
          v = value.getName();
        } else if (value.desc) {
          v = value.desc;
        }
      }
      return index + "=" + v;
    }).join(","));
  };
  
  return {
    event : event
  };
})();