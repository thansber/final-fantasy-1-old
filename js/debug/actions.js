var ActionHelper = (function() {
  
  var newBattle = function(charClasses, enemies, callbacks) {
    for (var c in charClasses) {
      var charName = "";
      for (var i = 0; i < 4; i++) { 
        charName += String.fromCharCode(65 + +c); 
      }
      Party.addChar(Party.createNewChar(charName, charClasses[c], c));
    }
    
    if (callbacks && callbacks.party) {
      callbacks.party.call();
    }
    
    if (!(jQuery.isArray(enemies))) {
      enemies = [enemies];
    }
    
    Battle.setup({enemies:enemies, background:Map.BattleBackgrounds.Forest, doNotMove:true});
    
    if (callbacks && callbacks.monster) {
      callbacks.monster.call();
    }
  };
  
  var addSpellsToChar = function(char, spells) {
    for (var s in spells) {
      var spell = Spell.lookup(spells[s]);
      char.learnSpell(spell).addMaxSpellCharge(spell.spellLevel).addSpellCharge(spell.spellLevel);
    }
  };
  
  var killEnemy = function(enemyName, enemyIndex) {
    var monster = Battle.lookupEnemy(enemyName, enemyIndex);
    monster.addStatus(Status.Dead);
    Battle.killEnemyUI(monster, enemyIndex);
  };
    
  var charAttack = function() {
    var monsterName = "SABER T";
    newBattle([CharacterClass.BLACKBELT], {name:monsterName,qty:2});
    BattleCommands.party({source:Party.getChar(0), target:{name:monsterName, index:1, type:BattleCommands.Enemy}, action:BattleCommands.Attack});
    BattleCommands.executeCommands();
  };
  
  var enemyAttack = function() {
    var monsterName = "COCTRICE";
    newBattle([CharacterClass.BLACKBELT], {name:monsterName,qty:2});
    var monster = Battle.lookupEnemy(monsterName, 1);    
    BattleCommands.enemy(monster);
    BattleCommands.executeCommands();
  };
  
  var multipleEnemyAttack = function() {
    var monsterName = "CRAWL";
    newBattle([CharacterClass.BLACK_MAGE], {name:monsterName,qty:2});
    BattleCommands.enemy(Battle.lookupEnemy(monsterName, 0));
    BattleCommands.enemy(Battle.lookupEnemy(monsterName, 1));
    BattleCommands.executeCommands();
  };
  
  var castSpellOnSelf = function() {
    newBattle([CharacterClass.WHITE_MAGE], {name:"IMP"});
    var char = Party.getChar(0);
    addSpellsToChar(char, ["CURE","RUSE","HARM","INVS","ALIT","CUR2","AFIR","AMUT","CUR3","LIFE"]);
    BattleCommands.party({source:char, action:BattleCommands.CastSpell, spellId:"RUSE", target:{type:BattleCommands.Party, char:char}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnPartyTarget = function() {
    newBattle([CharacterClass.FIGHTER, CharacterClass.WHITE_WIZARD], {name:"IMP"}, {party:function() {
      Party.getChar(1).applyDamage(24);
      Party.getChar(0).applyDamage(30);
    }});
    var target = Party.getChar(0);
    var caster = Party.getChar(1);
    addSpellsToChar(caster, ["CURE","RUSE","HARM","INVS","ALIT","LAMP","CUR2","AFIR","AMUT","CUR3","LIFE","CUR4"]);
    BattleCommands.party({source:caster, action:BattleCommands.CastSpell, spellId:"CURE", target:{type:BattleCommands.Party, char:target}});
    BattleCommands.executeCommands();
  };
  
  var castHealingSpellOnEntireParty = function() {
    newBattle([CharacterClass.FIGHTER
              ,CharacterClass.WHITE_MAGE
              ,CharacterClass.WHITE_MAGE
              ,CharacterClass.WHITE_MAGE]
            ,{name:"IMP"}
            ,{party:function() {
                 Party.getChar(0).applyDamage(30);
                 Party.getChar(1).applyDamage(24);
                 Party.getChar(2).applyDamage(24);
                 Party.getChar(3).applyDamage(24);
             }});
    
    var caster = Party.getChar(1);
    addSpellsToChar(caster, ["CURE","RUSE","HEAL","INVS","ALIT","CUR2","AFIR","AMUT","CUR3","LIFE"]);
    BattleCommands.party({source:caster, action:BattleCommands.CastSpell, spellId:"HEAL", target:{type:BattleCommands.Party, affects:BattleCommands.All}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEnemy = function() {
    newBattle([CharacterClass.BLACK_WIZARD], {name:"IMP",qty:2});
    var caster = Party.getChar(0);
    addSpellsToChar(caster, ["BRAK"]);
    BattleCommands.party({source:caster, action:BattleCommands.CastSpell, spellId:"BRAK", target:{name:"IMP",index:1,type:BattleCommands.Enemy, affects:BattleCommands.Single}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEnemies = function() {
    newBattle([CharacterClass.BLACK_WIZARD], {name:"IMP",qty:3});
    var caster = Party.getChar(0);
    addSpellsToChar(caster, ["FIRE","LIT","LOCK","ICE","TMPR","FIR2","LIT2","LOK2","FAST","ICE2","BANE","FIR3","STOP"]);
    // Kill off one enemy
    var enemyToKill = Battle.lookupEnemy("IMP", 1);
    enemyToKill.applyDamage(1000);
    Battle.killEnemyUI(enemyToKill, 1);
    BattleCommands.party({source:caster, action:BattleCommands.CastSpell, spellId:"ICE2", target:{type:BattleCommands.Enemy, affects:BattleCommands.All}});
    BattleCommands.executeCommands();
  };
  
  var castSpellOnEntireParty = function() {
    newBattle([CharacterClass.FIGHTER,CharacterClass.BLACKBELT,CharacterClass.WHITE_MAGE,CharacterClass.BLACK_MAGE]
             ,{name:"MAGE",qty:4});
    var monster = Battle.lookupEnemy("MAGE", 0);
    var spell = Spell.lookup("FIR3");
    BattleCommands.enemy(null, {source:monster, action:BattleCommands.CastSpell, spellId:spell.spellId, target:monster.determineSpellTarget(spell), targetType:BattleCommands.Party});
    BattleCommands.executeCommands();
  };
  
  var healStatusForChar = function() {
    newBattle([CharacterClass.FIGHTER], {name:"WrWOLF"}, {party:function() {
      Party.getChar(0).addStatus(Status.Paralysis);
    }});
    
    var char = Party.getChar(0);
    var monster = Battle.lookupEnemy("WrWOLF", 0);
    var commands = [];
    RNG.useCustom(RNG.AlwaysSuccess);
    
    commands.push(BattleCommands.party({source:char, action:BattleCommands.StatusHeal, target:{type:BattleCommands.Party, char:char}}));
    commands.push(BattleCommands.enemy(null, {source:monster, action:BattleCommands.Attack, target:monster.determineSingleTarget(), targetType:BattleCommands.Party}));
    BattleCommands.executeCommands(commands);
  };
  
  var monsterRetargets = function() {
    newBattle([CharacterClass.BLACK_MAGE, CharacterClass.FIGHTER], {name:"IronGOL",qty:2});
    var char = Party.getChar(0);
    var monster = Battle.lookupEnemy("IronGOL", 0);
    var commands = [];    
    commands.push(BattleCommands.enemy(null, {source:monster, action:BattleCommands.Attack, target:Party.getChar(0), targetType:BattleCommands.Party}));
    commands.push(BattleCommands.enemy(null, {source:monster, action:BattleCommands.Attack, target:Party.getChar(0), targetType:BattleCommands.Party}));
    RNG.useCustom(RNG.AlwaysSuccess);
    BattleCommands.executeCommands(commands);
  };
  
  var ineffectiveCharAttack = function() {
    var monster = "IMP";
    newBattle([CharacterClass.KNIGHT, CharacterClass.FIGHTER], {name:monster, qty:2}, {party:function() {
      Party.getChar(0).weapon("Xcalber", true)
      Party.getChar(1).weapon("Masmune", true);
    }});
    
    var commands = [];
    commands.push(BattleCommands.party({source:Party.getChar(0), action:BattleCommands.Attack, target:{name:monster, type:BattleCommands.Enemy}}));
    BattleCommands.changeCharIndex(1);
    commands.push(BattleCommands.party({source:Party.getChar(1), action:BattleCommands.Attack, target:{name:monster, type:BattleCommands.Enemy}}));
    
    RNG.useCustom(RNG.AlwaysSuccess);
    BattleCommands.executeCommands(commands);
  };
  
  var cursorFunWithDeadEnemies = function() {
    var monsterName = "IMP";
    newBattle([CharacterClass.FIGHTER], {name:monsterName, qty:8}, {monster:function() {
      //killEnemy(monsterName, 3);
      killEnemy(monsterName, 4);
    }});
    Battle.startRound(true);
  };
  
  var event = function($target) {
    Party.clearChars();
    RNG.useDefault(); // want this to be reset in case any action overrides the RNG
    if ($target.is(".char.attack")) { charAttack(); } 
    else if ($target.is(".monster.multi.attack")) { multipleEnemyAttack(); } 
    else if ($target.is(".monster.attack")) { enemyAttack(); } 
    else if ($target.is(".spell.self")) { castSpellOnSelf(); } 
    else if ($target.is(".spell.heal.party.all")) { castHealingSpellOnEntireParty(); } 
    else if ($target.is(".spell.party.single")) { castSpellOnPartyTarget(); } 
    else if ($target.is(".spell.party.all")) { castSpellOnEntireParty(); } 
    else if ($target.is(".spell.enemy")) { castSpellOnEnemy(); } 
    else if ($target.is(".spell.enemies")) { castSpellOnEnemies(); }
    else if ($target.is(".status.heal")) { healStatusForChar(); }
    else if ($target.is(".monster.retarget")) { monsterRetargets(); }
    else if ($target.is(".ineffective.attack")) { ineffectiveCharAttack(); }
    else if ($target.is(".cursor-dead-enemy")) { cursorFunWithDeadEnemies(); }
  };
  
  return {
    event : event
  };
})();