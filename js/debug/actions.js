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
    
    var monsterName = "COCTRICE";
    var monsterIndex = 1;
    Party.addChar(char);
    Battle.setup({enemies:[{name:monsterName,qty:2}], background:Map.BattleBackgrounds.Forest, doNotMove:true});

    var monster = Battle.lookupEnemy(monsterName, monsterIndex);    
    
    Battle.inputMessageToggler(true);
    Message.hideAllBattleMessages();
    
    BattleCommands.enemy(monster);
    BattleCommands.executeCommands();
  };
  
  var multipleEnemyAttack = function() {
    var char = Party.createNewChar("AAAA", CharacterClass.BLACK_MAGE, 0);
    var monsterName = "CRAWL";
    
    Party.addChar(char);
    Battle.setup({enemies:[{name:monsterName,qty:2}], background:Map.BattleBackgrounds.Swamp, doNotMove:true});

    Battle.inputMessageToggler(true);
    Message.hideAllBattleMessages();
    
    BattleCommands.enemy(Battle.lookupEnemy(monsterName, 0));
    BattleCommands.enemy(Battle.lookupEnemy(monsterName, 1));
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
    char.applyDamage(24);

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
  
  var castSpellOnEnemy = function() {
    var char = Party.createNewChar("AAAA", CharacterClass.BLACK_WIZARD, 0);
    var spellsToLearn = ["BRAK"];
    char.spellCharges([5,3,2,2,1,1,1,1]);
    for (var s in spellsToLearn) {
      char.learnSpell(Spell.lookup(spellsToLearn[s]));
    }
    Party.addChar(char);
    Battle.setup({enemies:[{name:"IMP",qty:2}], background:Map.BattleBackgrounds.Swamp, doNotMove:true});
    
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"BRAK", target:{name:"IMP",index:1,type:BattleCommands.Enemy, affects:BattleCommands.Single}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEnemies = function() {
    var char = Party.createNewChar("AAAA", CharacterClass.BLACK_WIZARD, 0);
    var spellsToLearn = ["FIRE","LIT","LOCK","ICE","TMPR","FIR2","LIT2","LOK2","FAST","ICE2","BANE","FIR3","STOP"];
    char.spellCharges([5,3,2,2,1,1,1,1]);
    for (var s in spellsToLearn) {
      char.learnSpell(Spell.lookup(spellsToLearn[s]));
    }
    Party.addChar(char);
    Battle.setup({enemies:[{name:"IMP",qty:3}], background:Map.BattleBackgrounds.Swamp, doNotMove:true});
    
    // Kill off one enemy
    var enemyToKill = Battle.lookupEnemy("IMP", 1);
    enemyToKill.applyDamage(1000);
    Battle.killEnemyUI(enemyToKill, 1);
    
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"ICE2", target:{type:BattleCommands.Enemy, affects:BattleCommands.All}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEntireParty = function() {
    Party.addChar(Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0));
    Party.addChar(Party.createNewChar("BBBB", CharacterClass.BLACKBELT, 1));
    Party.addChar(Party.createNewChar("CCCC", CharacterClass.WHITE_MAGE, 2));
    Party.addChar(Party.createNewChar("DDDD", CharacterClass.BLACK_MAGE, 3));
    Battle.setup({enemies:[{name:"MAGE",qty:4}], background:Map.BattleBackgrounds.IceCave, doNotMove:true});
    
    var monster = Battle.lookupEnemy("MAGE", 0);
    var spell = Spell.lookup("FIR3");
    BattleCommands.enemy(null, {source:monster, action:BattleCommands.CastSpell, spellId:spell.spellId, target:monster.determineSpellTarget(spell), targetType:BattleCommands.Party});
    BattleCommands.executeCommands();
  };
  
  var healStatusForChar = function() {
    Party.addChar(Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0));
    Party.addChar(Party.createNewChar("BBBB", CharacterClass.BLACKBELT, 1));
    var char = Party.getChar(0); 
    char.addStatus(Status.Paralysis);
    Battle.setup({enemies:[{name:"IMP",qty:1}], background:Map.BattleBackgrounds.IceCave, doNotMove:true});
    BattleCommands.party({source:char, action:BattleCommands.StatusHeal, target:{type:BattleCommands.Party, char:char}});
    BattleCommands.executeCommands();
  };
  
  var charDies = function() {
    Party.addChar(Party.createNewChar("AAAA", CharacterClass.BLACK_MAGE, 0));
    Party.addChar(Party.createNewChar("BBBB", CharacterClass.FIGHTER, 1));
    Battle.setup({enemies:[{name:"IronGOL",qty:1}], background:Map.BattleBackgrounds.IceCave, doNotMove:true});
    
    var char = Party.getChar(0);
    var monster = Battle.lookupEnemy("IronGOL", 0);
    var commands = [];
    
    commands.push(BattleCommands.party({source:char, action:BattleCommands.Attack, target:{type:BattleCommands.Enemy, name:"IronGOL"}}));
    commands.push(BattleCommands.enemy(null, {source:monster, action:BattleCommands.Attack, target:Party.getChar(0), targetType:BattleCommands.Party}));
    BattleCommands.executeCommands(commands);
  };
  
  var event = function($target) {
    Party.clearChars();
    if ($target.is(".char.attack")) { charAttack(); } 
    else if ($target.is(".monster.multi.attack")) { multipleEnemyAttack(); } 
    else if ($target.is(".monster.attack")) { enemyAttack(); } 
    else if ($target.is(".spell.self")) { castSpellOnSelf(); } 
    else if ($target.is(".spell.party.single")) { castSpellOnPartyTarget(); } 
    else if ($target.is(".spell.party.all")) { castSpellOnEntireParty(); } 
    else if ($target.is(".spell.enemy")) { castSpellOnEnemy(); } 
    else if ($target.is(".spell.enemies")) { castSpellOnEnemies(); }
    else if ($target.is(".status.heal")) { healStatusForChar(); }
    else if ($target.is(".char.dies")) { charDies(); }
  };
  
  return {
    event : event
  };
})();