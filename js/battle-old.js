define( /* Battle */
["jquery", "battle-commands", "cursor", "events", "key-press-notifier", "logger", "messages", "monster", "party", "rng", "constants/cursor"],
function($, BattleCommands, Cursor, Event, KeyPressNotifier, Logger, Message, Monster, Party, RNG, CursorConstants) {
return (function() {
  
  var self = this;  
    
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.nextChar = function() {
    var char = Party.getChar(BattleCommands.getCharIndex());
    if (char) {
      BattleCommands.changeCharIndex(1);
      var q = Animation.walkAndMoveInBattle(char, {direction:"backward"});
      var otherChar = Party.getChar(BattleCommands.getCharIndex());
      while (otherChar && !otherChar.canTakeAction() && !BattleCommands.isAllPartyCommandsEntered()) {
        if (otherChar.isAlive()) {
          BattleCommands.incapacitatedChar(otherChar);
        } else {
          BattleCommands.changeCharIndex(1);
        }
        otherChar = Party.getChar(BattleCommands.getCharIndex());
      }
      if (otherChar) {
        Animation.walkAndMoveInBattle(otherChar, {queue:q});
      }
      q.addToChain(function() { 
        if (BattleCommands.isAllPartyCommandsEntered()) {
          BattleCommands.generateEnemyCommands();
        } else {
          Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_MENU);
        }
      });
      q.start();
    }
  };
  
  self.prevChar = function() {
    BattleCommands.clearPartyCommand();
    var char = Party.getChar(BattleCommands.getCharIndex());
    if (char) {
      BattleCommands.changeCharIndex(-1);
      var q = Animation.walkAndMoveInBattle(char, {direction:"backward"});
      var otherChar = Party.getChar(BattleCommands.getCharIndex());
      while (otherChar && !otherChar.canTakeAction()) {
        BattleCommands.changeCharIndex(-1);
        if (BattleCommands.getCharIndex() == 0) {
          otherChar = char;
          BattleCommands.changeCharIndex(char.charIndex);
        } else {
          otherChar = Party.getChar(BattleCommands.getCharIndex());
        }
      }
      if (otherChar) {
        Animation.walkAndMoveInBattle(otherChar, {queue:q});
      }
      q.addToChain(function() { KeyPressNotifier.setListener(Cursor.lookup(CursorConstants.BATTLE_MENU)); });
      q.start();
    }
  };
  
  // Called for each new battle
  // Input definition:
  // - enemies: [{name:"IMP",qty:3},...]
  // - background: background object, see Map.BattleBackgrounds
  // - surprise: enemy formation surprise rating
  // - runnable: whether running can even work
  self.setup = function(opt) {
    BattleCommands.clearAllCommands();
    enemies = {};
    ambush = false;
    preemptive = false;
    opt = opt || {};
    if (opt.background) {
      $("#battle .background").attr("class", "background " + opt.background.cssClass);
    }
    runnable = opt.runnable == null ? true : opt.runnable;
    var battleEnemies = (opt && opt.enemies) || {};
    var moveFirstChar = !opt.doNotMove;
    setupEnemies(battleEnemies);
    setupParty(Party.getChars());
    
    calculateSurprise(opt.surprise);
    
    if (ambush) {
      BattleCommands.generateEnemyCommands();
    } else {
      if (preemptive) {
        self.inputMessageToggler(true);
        var q = Animation.preBattleMessage(Animation.PREEMPTIVE);        
        $.when(q.start()).then(function() {
          self.startRound(!opt.doNotMove);
        });
      } else {
        self.startRound(!opt.doNotMove);
      }
    }
  };
  
  self.startRound = function(moveFirstChar) {
    self.inputMessageToggler(false);
    // Clear all commands
    BattleCommands.clearAllCommands();
    // Start the cursor listener for the first character's action
    Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_MENU);
    // First character that can select an action walks forward to indicate they are choosing an action
    if (moveFirstChar) {
      var firstChar = null;
      $.each(Party.getChars(), function(i, char) {
        if (!char.isAlive()) {
          BattleCommands.changeCharIndex(1);
          return true;
        }
        if (char.canTakeAction()) {
          firstChar = char;
          return false;
        } else {
          BattleCommands.incapacitatedChar(char);
        }
      });
      if (firstChar) {
        //Animation.walkAndMoveInBattle(firstChar).start();
      }
      
      // If all characters are incapacitated, move on to the enemy commands and start the round 
      if (BattleCommands.isAllPartyCommandsEntered()) {
        BattleCommands.generateEnemyCommands();
      }
    }
  };
  
  
  
  return this;
}).call({})
});