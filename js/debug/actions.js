var ActionHelper = (function() {
  
  var charAttack = function() {
    //var char = Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0).weapon("Rapier", true).armor("Wooden[A]", true).armor("Wooden[S]", true);
    var char = Party.createNewChar("AAAA", CharacterClass.BLACKBELT, 0);
    
    var monsterName = "SABER T";
    var monsterIndex = 1;
    Party.addChar(char);
    Battle.setup({enemies:[{name:monsterName,qty:2}], background:Map.BattleBackgrounds.Forest, doNotMove:true});

    var monster = Battle.lookupEnemy(monsterName, monsterIndex);    
    var result = null;
    
    Battle.inputMessageToggler(true);
    Message.hideAllBattleMessages();
    
    BattleCommands.party({source:char, target:{name:monster.name, index:monsterIndex, type:BattleCommands.Enemy}, action:BattleCommands.Attack});
    BattleCommands.executeCommands();
  };
  
  var enemyAttack = function() {
    //var char = Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0).weapon("Rapier", true).armor("Wooden[A]", true).armor("Wooden[S]", true);
    var char = Party.createNewChar("AAAA", CharacterClass.BLACKBELT, 0);
    
    var monsterName = "SABER T";
    var monsterIndex = 1;
    Party.addChar(char);
    Battle.setup({enemies:[{name:monsterName,qty:2}], background:Map.BattleBackgrounds.Forest, doNotMove:true});

    var monster = Battle.lookupEnemy(monsterName, monsterIndex);    
    var result = null;
    
    Battle.inputMessageToggler(true);
    Message.hideAllBattleMessages();
    
    BattleCommands.enemy(monster);
    BattleCommands.executeCommands();
  };
  
  var castSpellOnSelf = function() {
    var char = Party.createNewChar("AAAA", CharacterClass.WHITE_MAGE, 0);
    var spellsToLearn = ["CURE","RUSE","HARM","INVS","ALIT","CUR2","AFIR","AMUT","CUR3","LIFE"];
    char.spellCharges([5,3,2,0,0,0,0,0]);
    for (var s in spellsToLearn) {
      char.learnSpell(Spell.lookup(spellsToLearn[s]));
    }
    Party.addChar(char);
    Battle.setup({enemies:[{name:"IMP",qty:2}], background:Map.BattleBackgrounds.Plains, doNotMove:true});
    
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"RUSE", target:{type:BattleCommands.Party, char:char}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnPartyTarget = function() {
    var targetChar = Party.createNewChar("BBBB", CharacterClass.FIGHTER, 0);
    targetChar.applyDamage(30);

    var char = Party.createNewChar("AAAA", CharacterClass.WHITE_MAGE, 1);
    var spellsToLearn = ["CURE","RUSE","HARM","INVS","ALIT","CUR2","AFIR","AMUT","CUR3","LIFE"];
    char.spellCharges([5,3,2,0,0,0,0,0]);
    for (var s in spellsToLearn) {
      char.learnSpell(Spell.lookup(spellsToLearn[s]));
    }

    Party.addChar(targetChar);
    Party.addChar(char);
    Battle.setup({enemies:[{name:"IMP",qty:2}], background:Map.BattleBackgrounds.Plains, doNotMove:true});
    
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"CURE", target:{type:BattleCommands.Party, char:targetChar}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEnemies = function() {
    var char = Party.createNewChar("AAAA", CharacterClass.BLACK_MAGE, 0);
    var spellsToLearn = ["FIRE","LIT","LOCK","ICE","TMPR","FIR2","LIT2","LOK2","FAST","ICE2","BANE","FIR3"];
    char.spellCharges([5,3,2,0,0,0,0,0]);
    for (var s in spellsToLearn) {
      char.learnSpell(Spell.lookup(spellsToLearn[s]));
    }
    Party.addChar(char);
    Battle.setup({enemies:[{name:"IMP",qty:2}], background:Map.BattleBackgrounds.Swamp, doNotMove:true});
    
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"FIR2", target:{type:BattleCommands.Enemy, affects:BattleCommands.All}});
    BattleCommands.executeCommands();
  };
  
  var event = function($target) {
    Party.clearChars();

    if ($target.is(".char.attack")) {
      charAttack();
    } else if ($target.is(".monster.attack")) {
      enemyAttack();
    } else if ($target.is(".spell.self")) {
      castSpellOnSelf();
    } else if ($target.is(".spell.party.target")) {
      castSpellOnPartyTarget();
    } else if ($target.is(".spell.enemies")) {
      castSpellOnEnemies();
    }
  };
  
  return {
    event : event
  };
})();