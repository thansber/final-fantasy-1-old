define( 
/* BattleCommands */
["jquery", "constants/battle", "party", "rng", "spells"],
function($, BattleConstants, Party, RNG, Spell) {

  var self = this;
  var partyCommands = [];
  var enemyCommands = [];
  var charIndex = 0;
  var battle = null;
  
  var changeCharIndex = function(amount) {
    charIndex += amount;
    charIndex = charIndex < 0 ? 0 : charIndex;
  };
  
  var clear = function() {
    charIndex = 0;
    partyCommands = [];
    enemyCommands = [];
  };
  
  var enemy = function(monster, action) {
    var command = $.extend(true, {type:BattleConstants.Commands.Enemy}, action ? action : monsterDetermineAction(monster));
    if (command.spellId) {
      var spell = Spell.lookup(command.spellId);
      if (spell.isOtherTargetGroup()) { 
        command.targetType = BattleConstants.Commands.Party; 
      } else if (spell.isSameTargetGroup() || spell.isSelfTarget()) { 
        command.targetType = BattleConstants.Commands.Enemy; 
      } 
    }
    enemyCommands.push(command);
    return command;
  };
  
  var incapacitatedChar = function(char) {
    party({source:char, action:BattleConstants.Actions.StatusHeal, target:{type:BattleConstants.Commands.Party, char:char}});
    changeCharIndex(1);
  };
  
  var init = function(b) {
    battle = b;
    clear();
  };
  
  var isAllPartyCommandsEntered = function() {
    return charIndex >= Party.getChars().length;
  };
  
  var monsterDetermineAction = function(monster) {
    if (monster.isRunningAway()) {
      return { source:monster, action:BattleConstants.Actions.Run };
    }
    
    if (monster.isCastingSpell()) {
      var spellId = monster.getNextSpell();
      var spell = Spell.lookup(spellId);
      // targetType is set via BattleCommands
      return { 
        source : monster, 
        action : BattleConstants.Actions.CastSpell, 
        spellId : spell.spellId, 
        target : monsterDetermineSpellTarget(spell) 
      };
    }
    
    if (monster.isUsingSkill()) {
      var skillId = monster.getNextSkill();
      var spell = Skill.lookup(skillId);
      return { 
        source : monster, 
        action : BattleConstants.Actions.CastSpell, 
        spellId : spell.spellId, 
        target : monsterDetermineSpellTarget(spell), 
        targetType : BattleConstants.Commands.Party 
      };
    }
    
    return { 
      source : monster, 
      action : BattleConstants.Actions.Attack, 
      target : monsterDetermineSingleTarget(), 
      targetType : BattleConstants.Commands.Party 
    };
  };
  

  var monsterDetermineSpellTarget = function(spell) {
    var target = null;
    if (spell.isSingleTarget()) {
      target = monsterDetermineSingleTarget();
    } else if (spell.isAllTarget()) {
      target = Party.getAliveChars();
    } else if (spell.isSelfTarget()) {
      target = this;
    }
    
    return target;
  };
  
  var monsterDetermineSingleTarget = function() {
    var validTarget = false;
    var target = null;
    var aliveChars = Party.getAliveChars();
    
    if (aliveChars.length == 0) {
      target = null;
      validTarget = true;
    }
    if (aliveChars.length == 1) {
      target = aliveChars[0];
      validTarget = true;
    }
    
    while (!validTarget) {
      var r = RNG.randomUpTo(7, 0);
      var charIndex = -1;
      if (r >>> 2) { // 4-7
        charIndex = 0;
      } else if (r >>> 1) { // 2-3
        charIndex = 1;
      } else if (r) { // 1
        charIndex = 2;
      } else { // 0
        charIndex = 3;
      }
      target = Party.getChar(charIndex);
      validTarget = (target != null && target.isAlive());
    }
    return target;
  };
  
  var party = function(opt) {
    var command = partyCommands[charIndex];
    if (!command) {
      command = {type:BattleConstants.Commands.Party};
    }
    
    if (opt.source) { command.source = opt.source; }
    if (opt.action) { command.action = opt.action; }
    if (opt.spellId) { command.spellId = opt.spellId; }
    
    if (opt.target) {
      command.targetType = opt.target.type;
      command.targetAffects = opt.target.affects;
      var isAllTarget = (command.targetAffects == BattleConstants.Targets.All); 
      var isEnemyTarget = (command.targetType == BattleConstants.Commands.Enemy); 
      // Single target
      if (isAllTarget) {
       // Multi-target
        if (isEnemyTarget) {
          command.target = [];
          for (var n in battle.enemiesByName) {
            $.merge(command.target, battle.enemiesByName[n]);
          }
        } else {
          command.target = $.merge([], Party.getChars());
        }
      } else {
        if (isEnemyTarget) {
          command.targetIndex = (opt.target.index == null ? 0 : opt.target.index);
          command.target = battle.lookupEnemy(opt.target.name, command.targetIndex);
        } else {
          command.target = opt.target.char;
        }
      } 
    }
    
    partyCommands[charIndex] = command;
    return command;
  };
  
  return {
    changeCharIndex : changeCharIndex
   ,clear : clear
   ,enemy : enemy
   ,getEnemyCommands : function() { return enemyCommands; }
   ,getPartyCommands : function() { return partyCommands; }
   ,incapacitatedChar : incapacitatedChar
   ,init : init
   ,isAllPartyCommandsEntered : isAllPartyCommandsEntered
   ,party : party
   ,shuffleCommands : function() {
     var allCommands = $.merge([], partyCommands);
     $.merge(allCommands, enemyCommands);
     RNG.shuffle(allCommands);
     return allCommands;
   }
  };
});