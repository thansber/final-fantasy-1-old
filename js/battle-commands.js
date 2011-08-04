var BattleCommands = (function() {
  
  var partyCommands = [];
  var enemyCommands = [];
  var charIndex = 0;
  
  var ActionTypes = {
    Attack : "attack"
   ,CastSpell : "spell"
   ,Drink : "drink"
   ,UseItem : "item"
   ,Run : "run"
  };
  
  var CommandTypes = {
    Party : "party"
   ,Enemy : "enemy"
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var commandToString = function(command) {
    var isParty = command.type == CommandTypes.Party;
    var s = command.source.getName();
    switch (command.action) {
      case ActionTypes.Attack:
        s += " is attacking";
        break;
      case ActionTypes.CastSpell:
        s += " is casting" + (!isParty ? "/using skill" : "");
        break;
      case ActionTypes.Drink:
        s += " is drinking a";
        break;
      case ActionTypes.UseItem:
        s += " is using the";
        break;
      case ActionTypes.Run:
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
    return s;
  };
  
  var commandsToString = function(commands) {
    var s = "", NEWLINE = "\r\n";
    
    jQuery.each(commands, function(i, command) {
      s += commandToString(command);
      s += NEWLINE;
    });
    
    return s;
  };
  
  var resultToString = function(result) {
    return jQuery.map(result, function(value, index) {
      var v = value;
      if (value) {
        if (value.getName) {
          v = value.getName();
        } else if (value.desc) {
          v = value.desc;
        }
      }
      return index + "=" + v;
    }).join(",");
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

  var enemy = function(monster) {
    enemyCommands.push(jQuery.extend(true, {type:CommandTypes.Enemy}, monster.determineAction()));
  };
  
  var executeCommands = function() {
    var all = jQuery.merge([], partyCommands);
    jQuery.merge(all, enemyCommands);
    RNG.shuffle(all);
    
    console.log(commandsToString(all));
    
    Battle.inputMessageToggler(true);
    
    jQuery.each(all, function(i, command) {
      Message.hideAllBattleMessages();
      
      if (Battle.areAllEnemiesDead(Battle.getAllEnemies())) {
        // TODO: handle victory
        console.log("party wins - victory animation");
        return false;
      }
      
      if (Battle.areAllCharactersDead(Party.getChars())) {
        // TODO: handle game over
        console.log("party is dead - lose");
        return false;
      }
      
      if (command.source.isDead()) {
        return true;
      }

      // TODO: Check for various incapacitated statuses, check for healing

      var result = null;
      
      switch (command.action) {
        case ActionTypes.Attack:
          result = Action.attack(command.source, command.target);
          break;
      }
      
      console.log(resultToString(result));
      
      Animation.resultFromAttack(command, result);
    });
  };
  
  var getCharIndex = function() {
    return charIndex;
  };
  
  var generateEnemyCommands = function() {
    var enemiesByName = Battle.getAllEnemies();
    for (var n in enemiesByName) {
      var enemies = enemiesByName[n];
      jQuery.each(enemies, function(i, e) {
        // TODO: Need to check for various incapacitating statuses
        enemy(e);
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
      command = {type:CommandTypes.Party};
    }
    
    if (opt.source) {
      command.source = opt.source;
    }
    
    if (opt.action) {
      command.action = opt.action;
    }
    
    if (opt.target) {
      command.targetIndex = (opt.target.index == null ? 0 : opt.target.index);
      command.target = Battle.lookupEnemy(opt.target.name, command.targetIndex);
    }
    
    partyCommands[charIndex] = command;
  };
  
  return {
    clearPartyCommand : clearPartyCommand
   ,changeCharIndex : changeCharIndex
   ,enemy : enemy
   ,executeCommands : executeCommands
   ,generateEnemyCommands : generateEnemyCommands
   ,getCharIndex : getCharIndex
   ,init : init
   ,isAllPartyCommandsEntered : isAllPartyCommandsEntered
   ,party : party
   
   ,Attack : ActionTypes.Attack
   ,CastSpell : ActionTypes.CastSpell
   ,Drink : ActionTypes.Drink
   ,UseItem : ActionTypes.UseItem
   ,Run : ActionTypes.Run
   
   ,Party : CommandTypes.Party
   ,Enemy : CommandTypes.Enemy
  };
})();