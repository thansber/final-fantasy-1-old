define( 
/* BattleCommands */
["jquery", "actions", "battle", "logger", "messages", "movement", "party", "rng", "spells"],
function($, Action, Battle, Logger, Message, Movement, Party, RNG, Spell) {
return (function() {
  
  var self = this;
  
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  
  
  self.clearAllCommands = function() {
    charIndex = 0;
    partyCommands = [];
    enemyCommands = [];
    //Animation.reset();
    if (commandQueue) {
      commandQueue.kill();
    }
  };
  
  self.clearPartyCommand = function() {
    partyCommands[charIndex] = null;
  };

  self.executeCommands = function(customCommands) {
    var all = [];
    
    if (customCommands) {
      all = customCommands;
    } else {
      all = $.merge([], partyCommands);
      $.merge(all, enemyCommands);
      RNG.shuffle(all);
    }
    
    Logger.debug(commandsToString(all));
    
    Battle.inputMessageToggler(true);
    var victory = false;
    var defeat = false;
    var ranAway = false;
    commandQueue = new Animation.ActionQueue();
    
    if (Battle.isAmbush()) {
      commandQueue.add(Animation.preBattleMessage(Animation.AMBUSH, commandQueue.chain));
    }
    
    $.each(all, function(i, command) {
      Message.hideAllBattleMessages();
      
      if (!command || command.source.isDead()) {
        return true;
      }

      // If a monster's target died during this round, allow the monster to retarget
      if (monsterTargetingCharThatDied(command)) {
        command = self.enemy(command.source);
      }
      
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
        case ActionTypes.StatusHeal:
          result = Action.statusHeal(command.source, command.targetType);
          if (result) {
            commandQueue.add(Animation.statusHeal(command, result, commandQueue.chain));
          }
          break;
        case ActionTypes.Run:
          result = Action.run(command.source, command.targetType);
          commandQueue.add(Animation.run(command, result, commandQueue.chain));
          if (result.success) {
            ranAway = true;
          }
          break;
      }
      
      Logger.debug(resultToString(result));
      
      if (ranAway) {
        return false;
      }
      
      if (Battle.areAllEnemiesDead(Battle.getAllEnemies())) {
        victory = true;
        return false;
      }
      
      if (Battle.areAllCharactersDead(Party.getChars())) {
        defeat = true;
        return false;
      }
    });
    
    Battle.resetSurprise();
    
    //commandQueue.chain.delay(Message.getBattlePause());
    if (defeat) {
      commandQueue.add(Animation.defeat(commandQueue.chain));
    }
    if (victory) {
      commandQueue.add(Animation.victory({queue:commandQueue.chain}));
    }
    
    // What to do after all the round animations have finished
    $.when(commandQueue.start()).then(function() {
      if (defeat) { console.log("party is dead - lose"); }
      else if (victory || ranAway) {
        Party.inBattle = false;
        Movement.startListening();
        Party.switchView(Party.WORLD_MAP);
      }
      else { 
        Battle.startRound(true);
      }
    });
  };
  
  self.getCharIndex = function() {
    return charIndex;
  };
  
  self.getCurrentChar = function() {
    return Party.getChar(self.getCharIndex());
  };
  
  self.generateEnemyCommands = function() {
    // Enemies don't get to go during the first round if it is a preemptive
    // strike, this should get reset in executeCommands
    if (!Battle.isPreemptive()) {
      var enemiesByName = Battle.getAllEnemies();
      for (var n in enemiesByName) {
        var enemies = enemiesByName[n];
        $.each(enemies, function(i, e) {
          // TODO: Need to check for various incapacitating statuses
          self.enemy(e);
        });
      }
    }
    
    self.executeCommands();
  };
  
  return this;
}).call({})
});