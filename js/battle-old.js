define( /* Battle */
["jquery", "battle-commands", "cursor", "events", "key-press-notifier", "logger", "messages", "monster", "party", "rng", "constants/cursor"],
function($, BattleCommands, Cursor, Event, KeyPressNotifier, Logger, Message, Monster, Party, RNG, CursorConstants) {
return (function() {
  
  var self = this;  
    
  var $battle = null;
  var $party = null;
  var $enemies = null;
  var $stats = null;
  var $spellList = null;

  var enemies = {};
  var runnable = true;
  var preemptive = false;
  var ambush = false;
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var calculateSurprise = function(enemySurprise) {
    
    if (!self.isRunnable()) {
      console.log("encounter is not runnable, normal battle");
      return;
    }
    
    var leader = null; 
    $.each(Party.getChars(), function(i, char) { 
      if (char.isAlive()) { 
        leader = char;
        return false;
      } 
    });
    var leaderQuickness = Math.floor((leader.agility + leader.luck) / 8);
    var r = RNG.randomUpTo(100, leaderQuickness);
    var result = r + leaderQuickness - enemySurprise;
    if (result < 0) {
      result = 0;
    }
        
    if (result <= 10) {
      ambush = true;
    } else if (result >= 90) {
      preemptive = true;
    }
    
    Logger.info("SURPRISE - " + (ambush ? "AMBUSH - " : preemptive ? "PREEMPTIVE - " : "") + "(leader quick + random - surprise) " + leaderQuickness + " + " + r + " - " + enemySurprise + " = " + result);
  };
  
  
  var isMessageValid = function(message) {
    return message != null && message.length > 0;
  };
    
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.calculateRewards = function() {
    var totalExp = 0, goldToAdd = 0;
    for (var name in enemies) {
      var enemiesByName = enemies[name];
      for (var e in enemiesByName) {
        var enemy = enemiesByName[e];
        if (!enemy.ranAway) {
          totalExp += enemiesByName[e].exp;
          goldToAdd += enemiesByName[e].gold;
        }
      }
    }
    
    var charsGettingExp = [];
    $.each(Party.getChars(), function(i, char) {
      if (char.isAlive()) { charsGettingExp.push(char); }
    });
    
    var expPerChar = Math.floor(totalExp / charsGettingExp.length);
    // EXP is always at least 1, even if all enemies run away
    expPerChar = expPerChar <= 0 ? 1 : expPerChar; 
    
    return {
      aliveChars: charsGettingExp
     ,exp: expPerChar
     ,gold: goldToAdd
    };
  };
  

  self.getAllEnemies = function() { return enemies; };
  
  self.isAmbush = function() {
    return ambush;
  }
  
  self.isPreemptive = function() {
    return preemptive;
  };
  
  self.isRunnable = function() {
    return runnable;
  };
  
  self.moveCharBackwardAndOtherForward = function(charIndexChange) {
    // charIndexChange = -1 for prev char, 1 for next char
    var char = Party.getChar(BattleCommands.getCharIndex());
    if (char) {
      var otherChar = Party.getChar(BattleCommands.getCharIndex() + charIndexChange);
      // If we are on the first char, and the user tries to go back (ESC), 
      // use the first char to move forward again
      otherChar = charIndexChange < 0 && !otherChar ? char : otherChar;
      var q = Animation.walkAndMoveInBattle(char, {direction:"backward"});
      
      if (otherChar) {
        Animation.walkAndMoveInBattle(otherChar, {queue:q});
      }
    }
    BattleCommands.changeCharIndex(1);
    q.start();
  };
  
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
  
  self.populateSpellList = function() {
    $(".spell.level", $spellList).empty();
    var char = Party.getChar(BattleCommands.getCharIndex()); 
    $(".spell.level", $spellList).each(function(i) {
      var $this = $(this);
      $this.append(Message.create("L" + (i + 1), "levelNum"));
      if (char.knownSpells[i]) {
        for (var s in char.knownSpells[i]) {
          $this.append(Message.create(char.knownSpells[i][s], "spell"));
        }
      }
      $this.append(Message.create("" + char.charges[i], "numCharges"));
    });
    $spellList.removeClass("hidden");
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
  
  self.resetSurprise = function() {
    ambush = false;
    preemptive = false;
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