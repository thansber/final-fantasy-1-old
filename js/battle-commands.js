var BattleCommands = (function() {
  
  var partyCommands = [];
  var enemyCommands = [];
  var charIndex = 0;
  
  var CommandTypes = {
    Attack : "attack"
   ,CastSpell : "spell"
   ,Drink : "drink"
   ,UseItem : "item"
   ,Run : "run"
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var commandsToString = function(commands) {
    var s = "", NEWLINE = "\r\n";
    
    jQuery.each(commands, function(i, command) {
      var isParty = command.type == "party";
      s += command.source.getName();
      switch (command.action) {
        case CommandTypes.Attack:
          s += " is attacking";
          break;
        case CommandTypes.CastSpell:
          s += " is casting" + (!isParty ? "/using skill" : "");
          break;
        case CommandTypes.Drink:
          s += " is drinking a";
          break;
        case CommandTypes.UseItem:
          s += " is using the";
          break;
        case CommandTypes.Run:
          s += " is running away";
          break;
      }
      
      if (command.spell) {
        s += " " + command.spell.spellId + " on";
      }
      
      if (command.target) {
        var targets = command.target;
        if (!jQuery.isArray(command.target)) {
          targets = [command.target];
        }
        
        s += " " + jQuery.map(targets, function(target) { 
          return target.getName() + (isParty ? " " + command.targetIndex : ""); 
        }).join(", ");
      };
      
      s += NEWLINE;
    });
    
    return s;
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var changeCharIndex = function(amount) {
    charIndex += amount;
  };
  
  var clearPartyCommand = function() {
    partyCommands[charIndex] = null;
  };

  var executeCommands = function() {
    var all = jQuery.merge([], partyCommands);
    jQuery.merge(all, enemyCommands);
    RNG.shuffle(all);
    
    console.log(commandsToString(all));
    
    jQuery.each(all, function(i, command) {
      if (Battle.areAllTargetsDead(Battle.getAllEnemies())) {
        // TODO: handle victory
        console.log("party wins - victory animation");
        return false;
      }
      
      if (Battle.areAllTargetsDead(Party.getChars())) {
        // TODO: handle game over
        console.log("party is dead - lose");
        return false;
      }
      
      if (command.source.isDead()) {
        return true;
      }
      
      // TODO: Check for various incapicated statuses, check for healing
      
      
    });
  };
  
  var getCharIndex = function() {
    return charIndex;
  };
  
  var generateEnemyCommands = function() {
    var enemiesByName = Battle.getAllEnemies();
    for (var n in enemiesByName) {
      var enemies = enemiesByName[n];
      jQuery.each(enemies, function(i, enemy) {
        // TODO: Need to check for various incapacitating statuses
        enemyCommands.push(jQuery.extend(true, {type:"enemy"}, enemy.determineAction()));
      });
    }
    
    executeCommands();
  };

  var isAllPartyCommandsEntered = function() {
    return charIndex > 3;
  };
  
  var init = function() {
    charIndex = 0;
    partyCommands = [];
    enemyCommands = [];
  };
  
  var party = function(opt) {
    var command = partyCommands[charIndex];
    if (!command) {
      command = {type:"party"};
    }
    
    if (opt.source) {
      command.source = opt.source;
    }
    
    if (opt.action) {
      command.action = opt.action;
    }
    
    if (opt.target) {
      command.target = Battle.lookupEnemy(opt.target.name, opt.target.index);
      command.targetIndex = opt.target.index;
    }
    
    partyCommands[charIndex] = command;
  };
  
  return {
    clearPartyCommand : clearPartyCommand
   ,changeCharIndex : changeCharIndex
   ,generateEnemyCommands : generateEnemyCommands
   ,getCharIndex : getCharIndex
   ,init : init
   ,isAllPartyCommandsEntered : isAllPartyCommandsEntered
   ,party : party
   
   ,Attack : CommandTypes.Attack
   ,CastSpell : CommandTypes.CastSpell
   ,Drink : CommandTypes.Drink
   ,UseItem : CommandTypes.UseItem
   ,Run : CommandTypes.Run
  };
})();