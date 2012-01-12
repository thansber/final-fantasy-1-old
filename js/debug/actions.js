define(
/* DebugActions */ 
["jquery", "battle", "battle-commands", "constants/battle", "character-class", "./util",
 "encounters", "events", "constants/map", "party", "rng", "spells", "statuses"], 
function($, Battle, BattleCommands, BattleConstants, CharacterClass, DebugUtil, 
         Encounter, Event, MapConstants, Party, RNG, Spell, Status) {

  var go = function(battle, opt) {
    Event.transmit(Event.Types.StartRound, {battle:battle, commands:opt.commands ? opt.commands : BattleCommands.shuffleCommands()});  
  };
  
  var newBattle = function(charClasses, enemies, opt) {
    opt = $.extend(true, {doNotMove:true}, opt);
    for (var c in charClasses) {
      var charName = "";
      for (var i = 0; i < 4; i++) { 
        charName += String.fromCharCode(65 + +c); 
      }
      Party.addChar(Party.createNewChar(charName, charClasses[c], c));
    }
    
    if (opt.party) {
      opt.party.call();
    }
    
    var battle = null;
    if (typeof enemies === "string") {
      var encounter = Encounter.formationToEncounter(Encounter.lookupFormation(enemies));
      battle = Battle.create({
        party : Party.getChars()
       ,enemies : encounter.enemies
       ,surprise : encounter.surprise
       ,runnable : encounter.runnable
       ,background : MapConstants.BattleBackgrounds.Forest
       ,doNotMove : opt.doNotMove
      });
    } else {
      battle = Battle.create({
        party : Party.getChars()
       ,enemies : $.isArray(enemies) ? enemies : [enemies]
       ,background : MapConstants.BattleBackgrounds.Forest
       ,doNotMove : opt.doNotMove
      });
    }
    if (opt.monster) {
      opt.monster.call();
    }
    
    Event.transmit(Event.Types.BattleSetup, {battle:battle});
    return battle;
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
    var battle = newBattle([CharacterClass.BLACKBELT], {name:monsterName,qty:2});
    BattleCommands.party({
      source : Party.getChar(0), 
      action : BattleConstants.Actions.Attack,
      target : {name:monsterName, index:1, type:BattleConstants.Commands.Enemy} 
    });
    go(battle);
  };
  
  var enemyAttack = function() {
    var monsterName = "COCTRICE";
    var battle = newBattle([CharacterClass.BLACKBELT], {name:monsterName,qty:2});
    BattleCommands.enemy(battle.lookupEnemy(monsterName, 1));
    go(battle);
  };
  
  var multipleEnemyAttack = function() {
    var monsterName = "CRAWL";
    var battle = newBattle([CharacterClass.BLACK_MAGE], {name:monsterName,qty:2});
    BattleCommands.enemy(battle.lookupEnemy(monsterName, 0));
    BattleCommands.enemy(battle.lookupEnemy(monsterName, 1));
    go(battle);
  };
  
  var castSpellOnSelf = function() {
    var battle = newBattle([CharacterClass.WHITE_MAGE], {name:"IMP"});
    var char = Party.getChar(0);
    addSpellsToChar(char, ["CURE","RUSE","HARM","INVS","ALIT","CUR2","AFIR","AMUT","CUR3","LIFE"]);
    
    BattleCommands.party({
      source : char,
      action : BattleConstants.Actions.CastSpell,
      spellId : "RUSE",
      target : {type:BattleConstants.Commands.Party, char:char}
    });
    go(battle);
  };
  
  var castSpellOnPartyTarget = function() {
    var battle = newBattle([CharacterClass.FIGHTER, CharacterClass.WHITE_WIZARD], {name:"IMP"}, {party:function() {
      Party.getChar(1).applyDamage(24);
      Party.getChar(0).applyDamage(30);
    }});
    var target = Party.getChar(0);
    var caster = Party.getChar(1);
    addSpellsToChar(caster, ["CURE","RUSE","HARM","INVS","ALIT","LAMP","CUR2","AFIR","AMUT","CUR3","LIFE","CUR4"]);
    
    BattleCommands.party({
      source : caster, 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "CURE", 
      target:{type:BattleConstants.Commands.Party, char:target}
    });
    go(battle);
  };
  
  var castHealingSpellOnEntireParty = function() {
    var battle = newBattle([CharacterClass.FIGHTER
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
    BattleCommands.party({
      source : caster, 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "HEAL", 
      target : {type:BattleConstants.Commands.Party, affects:BattleConstants.Targets.All}
    });
    go(battle);
  };
  
  var castSpellOnEnemy = function() {
    var battle = newBattle([CharacterClass.BLACK_WIZARD], {name:"IMP",qty:2});
    var caster = Party.getChar(0);
    addSpellsToChar(caster, ["BRAK"]);
    BattleCommands.party({
      source : caster, 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "BRAK", 
      target : {name:"IMP",index:1,type:BattleConstants.Commands.Enemy, affects:BattleConstants.Targets.Single}
    });
    go(battle);
  };
  
  var castSpellOnEnemies = function() {
    var battle = newBattle([CharacterClass.BLACK_WIZARD], [{name:"IMP",qty:3}, {name:"GrIMP", qty:1}]);
    var caster = Party.getChar(0);
    addSpellsToChar(caster, ["FIRE","LIT","LOCK","ICE","TMPR","FIR2","LIT2","LOK2","FAST","ICE2","BANE","FIR3","STOP"]);
    // Kill off one enemy
    var enemyToKill = battle.lookupEnemy("IMP", 1);
    enemyToKill.applyDamage(1000);
    $("#battle .enemies .enemy." + enemyToKill.cssClass).eq(1).addClass("dead");
    BattleCommands.party({
      source : caster, 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "ICE2", 
      target : {type:BattleConstants.Commands.Enemy, affects:BattleConstants.Targets.All}
    });
    go(battle);
  };
  
  var castSpellOnUndead = function() {
    var battle = newBattle([CharacterClass.WHITE_WIZARD], [{name:"ZOMBIE",qty:2}, {name:"IMP",qty:1}]);
    var caster = Party.getChar(0);
    addSpellsToChar(caster, ["HARM","HRM2","HRM3","HRM4"]);
    BattleCommands.party({
      source : caster, 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "HRM2", 
      target : {type:BattleConstants.Commands.Enemy, affects:BattleConstants.Targets.All}
    });
    go(battle);
  };
  
  var castSpellOnEntireParty = function() {
    var battle = newBattle([CharacterClass.FIGHTER,CharacterClass.BLACKBELT,CharacterClass.WHITE_MAGE,CharacterClass.BLACK_MAGE],
                           {name:"MAGE",qty:4});
    var command = {
      source : battle.lookupEnemy("MAGE", 0), 
      action : BattleConstants.Actions.CastSpell, 
      spellId : "FIR3", 
      target : Party.getAliveChars(), 
      targetType:BattleConstants.Commands.Party
    };
    go(battle, {commands:[command]});
  };
  
  var healStatusForChar = function() {
    var battle = newBattle([CharacterClass.FIGHTER], {name:"WrWOLF"});
    var char = Party.getChar(0);
    
    char.addStatus(Status.Sleep);
    Event.transmit(Event.Types.AdjustCharStats, {result:{
      target : char,
      status : Status.Sleep
    }});
    RNG.useCustom(RNG.AlwaysSuccess);
    
    var commands = [];
    commands.push(BattleCommands.party({
      source : char, 
      action : BattleConstants.Actions.StatusHeal, 
      target : {type:BattleConstants.Commands.Party, char:char}
    }));
    commands.push({
      source : battle.lookupEnemy("WrWOLF", 0), 
      action : BattleConstants.Actions.Attack, 
      target : char, 
      targetType : BattleConstants.Commands.Party
    });
    go(battle, {commands:commands});
  };
  
  var monsterRetargets = function() {
    var battle = newBattle([CharacterClass.BLACK_MAGE, CharacterClass.FIGHTER], {name:"IronGOL",qty:2});
    var commands = [];    
    commands.push({
      source : battle.lookupEnemy("IronGOL", 0), 
      action : BattleConstants.Actions.Attack, 
      type : BattleConstants.Commands.Enemy,
      target : Party.getChar(0), 
      targetType : BattleConstants.Commands.Party
    });
    commands.push({
      source : battle.lookupEnemy("IronGOL", 1), 
      action : BattleConstants.Actions.Attack,
      type : BattleConstants.Commands.Enemy,
      target : Party.getChar(0), 
      targetType : BattleConstants.Commands.Party
    });
    RNG.useCustom(RNG.AlwaysSuccess);
    go(battle, {commands:commands});
  };
  
  var ineffectiveCharAttack = function() {
    var monster = "IMP";
    var battle = newBattle([CharacterClass.KNIGHT, CharacterClass.FIGHTER], {name:monster, qty:2}, {party:function() {
      Party.getChar(0).weapons().add("Xcalber", 0).equip(0)
      Party.getChar(1).weapons().add("Masmune", 0).equip(0);
    }});
    
    var commands = [];
    commands.push(BattleCommands.party({
      source : Party.getChar(0), 
      action : BattleConstants.Actions.Attack, 
      target : {name:monster, type:BattleConstants.Commands.Enemy}
    }));
    BattleCommands.changeCharIndex(1);
    commands.push(BattleCommands.party({
      source : Party.getChar(1), 
      action : BattleConstants.Actions.Attack, 
      target : {name:monster, type:BattleConstants.Commands.Enemy}
    }));
    
    RNG.useCustom(RNG.AlwaysSuccess);
    go(battle, {commands:commands});
  };
  
  var preemptive = function() {
    RNG.useCustom(RNG.AlwaysFailure);
    newBattle([CharacterClass.NINJA, CharacterClass.KNIGHT], "08-1", {doNotMove:false});
  };
  
  var ambush = function() {
    newBattle([CharacterClass.BLACK_MAGE, CharacterClass.THIEF], "0A-1");
  };
  
  var unrunnable = function() {
    var battle = newBattle([CharacterClass.WHITE_MAGE], "21-1");
    var commands = [];
    commands.push(BattleCommands.party({
      source : Party.getChar(0), 
      action : BattleConstants.Actions.Run, 
      target : {type:BattleConstants.Commands.Party}
    }));
    commands.push({
      source : battle.lookupEnemy("EARTH"), 
      action : BattleConstants.Actions.Attack, 
      type : BattleConstants.Commands.Enemy,
      target : Party.getChar(0), 
      targetType:BattleConstants.Commands.Party
    });
    go(battle, {commands:commands});
  };
  
  var buttons = {
    "char.attack":{desc:"Character attack", onclick:charAttack}
   ,"monster.multi.attack":{desc:"Multiple monster attacks", onclick:multipleEnemyAttack} 
   ,"monster.attack":{desc:"Monster attack", onclick:enemyAttack} 
   ,"spell.self":{desc:"Cast spell on self", onclick:castSpellOnSelf} 
   ,"spell.heal.party.all":{desc:"Cast healing spell on entire party", onclick:castHealingSpellOnEntireParty} 
   ,"spell.party.single":{desc:"Cast spell on party target", onclick:castSpellOnPartyTarget} 
   ,"spell.party.all":{desc:"Monster casts spell on entire party", onclick:castSpellOnEntireParty} 
   ,"spell.enemy":{desc:"Cast spell on single monster", onclick:castSpellOnEnemy} 
   ,"spell.enemies":{desc:"Cast spell on all monsters", onclick:castSpellOnEnemies}
   ,"spell.undead":{desc:"Cast spell affecting undead", onclick:castSpellOnUndead}
   ,"status.heal":{desc:"Heal a status", onclick:healStatusForChar}
   ,"monster.retarget":{desc:"Monster retargets when character dies", onclick:monsterRetargets}
   ,"ineffective.attack":{desc:"Character attack ineffective", onclick:ineffectiveCharAttack}
   ,"ambush":{desc:"Ambush!", onclick:ambush}
   ,"preemptive":{desc:"Preemptive attack", onclick:preemptive}
   ,"unrunnable":{desc:"Unrunnable battle", onclick:unrunnable}
  };
  
  return {
    event : function($target) {
      Party.clearChars();
      RNG.useDefault(); // want this to be reset in case any action overrides the RNG
      DebugUtil.battleAnimationReset();
      
      var buttonClasses = $target.attr("class").split(" ");
      buttonClasses.splice(0, 1);
      var buttonId = buttonClasses.join(".");
      
      if (buttons[buttonId] && buttons[buttonId].onclick) {
        buttons[buttonId].onclick.apply();
      }
    },
    
    init : function() {
      var $container = $("section.actions .container");
      for (var b in buttons) {
        $container.append($("<button class=\"action " + b.replace(/\./g, " ") + "\">" + buttons[b].desc + "</button>"))
      }
    }
  };
});