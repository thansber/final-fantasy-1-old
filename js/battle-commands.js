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
  
  var TargetAffects = {
    All : "all"
   ,Single : "single"
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
    
    if (command.spellId) {
      s += " " + command.spellId + " on";
    }
  
    var targets = jQuery.isArray(command.target) ? command.target : [command.target];
    s += " " + jQuery.map(targets, function(target) { 
      return target.getName() + (isParty ? " " + (command.targetIndex == null ? "" : command.targetIndex) : ""); 
    }).join(", ");
    
    return s;
  };
  
  var commandsToString = function(commands) {
    var s = "", NEWLINE = "\r\n";
    jQuery.each(commands, function(i, command) { s += commandToString(command) + NEWLINE; });
    return s;
  };
  
  var resultToString = function(result) {
    return jQuery.map(result, function(value, index) {
      var v = value;
      if (value) {
        if (value.getName) { v = value.getName(); } 
        else if (value.desc) { v = value.desc; } 
        else if (value.spellId) { v = value.spellId; } 
        else if (jQuery.isArray(value)) { v = "[" + value + "]"; }
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

  var enemy = function(monster, action) {
    var command = jQuery.extend(true, {type:CommandTypes.Enemy}, action ? action : monster.determineAction());
    if (command.spellId) {
      var spell = Spell.lookup(command.spellId);
      if (spell.isOtherTargetGroup()) { command.targetType = CommandTypes.Party; }
      else if (spell.isSameTargetGroup()) { command.targetType = CommandTypes.Enemy; }
      else if (spell.isSelfTarget()) { command.targetType = CommandTypes.Enemy; } 
    }
    enemyCommands.push(command);
  };
  
  var executeCommands = function() {
    var all = jQuery.merge([], partyCommands);
    jQuery.merge(all, enemyCommands);
    RNG.shuffle(all);
    
    console.log(commandsToString(all));
    
    Battle.inputMessageToggler(true);
    var victory = false, defeat = false;
    var commandQueue = new Animation.ActionQueue();
    
    jQuery.each(all, function(i, command) {
      Message.hideAllBattleMessages();
      
      if (command.source.isDead()) {
        return true;
      }

      // TODO: Check for various incapacitated statuses, check for healing

      var result = null;
      
      switch (command.action) {
        case ActionTypes.Attack:
          result = Action.attack(command.source, command.target);
          commandQueue.add(Animation.attack(command, result, commandQueue.chain));
          break;
        case ActionTypes.CastSpell:
          result = Action.castSpell(command.source, command.spellId, command.target);
          commandQueue.add(Animation.castSpell(command, result, commandQueue.chain));
          break;
      }
      
      console.log(resultToString(result));
      
      if (Battle.areAllEnemiesDead(Battle.getAllEnemies())) {
        victory = true;
        return false;
      }
      
      if (Battle.areAllCharactersDead(Party.getChars())) {
        defeat = true;
        return false;
      }
    });
    
    //commandQueue.chain.delay(Message.getBattlePause());
    if (defeat) {
      commandQueue.add(Animation.defeat(commandQueue.chain));
    }
    if (victory) {
      commandQueue.add(Animation.victory({queue:commandQueue.chain}));
    }
    
    jQuery.when(commandQueue.start()).then(function() {
      if (defeat) { console.log("party is dead - lose"); }
      else if (victory) { console.log("enemies are dead - victory"); }
      else { console.log("round animation done, show commands for next round input"); }
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
    var numAliveChars = 0;
    jQuery.each(Party.getChars(), function(i, char) { if (char.isAlive()) { numAliveChars++; } });
    return charIndex >= numAliveChars;
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
    
    if (opt.source) { command.source = opt.source; }
    if (opt.action) { command.action = opt.action; }
    if (opt.spellId) { command.spellId = opt.spellId; }
    
    if (opt.target) {
      command.targetType = opt.target.type;
      command.targetAffects = opt.target.affects;
      var isAllTarget = (command.targetAffects == TargetAffects.All); 
      var isEnemyTarget = (command.targetType == CommandTypes.Enemy); 
      // Single target
      if (isAllTarget) {
       // Multi-target
        if (isEnemyTarget) {
          command.target = [];
          jQuery.each(Battle.getAllEnemies(), function(enemyName, enemies) {
            jQuery.merge(command.target, enemies);
          });
        } else {
          command.target = jQuery.merge([], Party.getChars());
        }
      } else {
        if (isEnemyTarget) {
          command.targetIndex = (opt.target.index == null ? 0 : opt.target.index);
          command.target = Battle.lookupEnemy(opt.target.name, command.targetIndex);
        } else {
          command.target = opt.target.char;
        }
      } 
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
   ,All : TargetAffects.All
   ,Single : TargetAffects.Single
  };
})();