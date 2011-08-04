var ActionHelper = (function() {
  
  var event = function($target) {
    Party.clearChars();
    var char = Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0)
      .weapon("Rapier", true)
      .armor("Wooden[A]", true)
      .armor("Wooden[S]", true);
    
    var monsterName = "SABER T";
    var monsterIndex = 1;
    Party.addChar(char);
    Battle.setup({enemies:[{name:monsterName,qty:2}], background:"Forest", doNotMove:true});

    var monster = Battle.lookupEnemy(monsterName, monsterIndex);    
    var result = null;
    
    Battle.inputMessageToggler(true);
    Message.hideAllBattleMessages();
    
    if ($target.is(".char.attack")) {
      BattleCommands.party({source:char, target:{name:monster.name, index:monsterIndex}, action:BattleCommands.Attack});
    } else if ($target.is(".monster.attack")) {
      BattleCommands.enemy(monster);
    }
    
    BattleCommands.executeCommands();
  };
  
  return {
    event : event
  };
})();