var Battle = (function() {
  
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
  
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  var ENEMIES_PER_COLUMN = {small:3, large:2, fiend:1};
  var ORDINALS = ["first", "second", "third", "fourth"];
  var CHAR_ANIMATION_CLASSES = ["swing", "forward", "back", "arms", "up"];
  
  // One-time initialization
  self.init = function() {
    $battle = $("#battle");
    $party = $(".party", $battle);
    $enemies = $(".enemies", $battle);
    $stats = $(".stats", $battle);
    $spellList = $(".input .spells", $battle);
    
    $battle.find(".commands .column").eq(0)
      .append(Message.create(null, "battle menu fight"))
      .append(Message.create(null, "battle menu magic"))
      .append(Message.create(null, "battle menu drink"))
      .append(Message.create("ITEM", "item"));
    $battle.find(".commands .column").eq(1)
      .append(Message.create("RUN", "run"));
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var addEnemy = function(monster) {
    if (!enemies[monster.name]) {
      enemies[monster.name] = [];
    }
    enemies[monster.name].push(Monster.createForBattle(monster));
  };
  
  var calculateEnemySizeCounts = function(enemies) {
    var sizeCounts = {chaos:{enemies:[]}, fiend:{enemies:[]}, large:{enemies:[]}, small:{enemies:[]}};
    jQuery.each(enemies, function(index, enemyObj) {
      var enemy = Monster.lookup(enemyObj.name);
      var enemyQty = enemyObj.qty == null ? 1 : enemyObj.qty;
      for (var i = 0; i < enemyQty; i++) {
        sizeCounts[enemy.size].enemies.push(enemyObj.name);
      }
    });
    return sizeCounts;
  };
  
  var calculateSurprise = function(enemySurprise) {
    
    if (!self.isRunnable()) {
      console.log("encounter is not runnable, normal battle");
      return;
    }
    
    var leader = null; 
    jQuery.each(Party.getChars(), function(i, char) { 
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
    
    console.log("SURPRISE - " + (ambush ? "AMBUSH - " : preemptive ? "PREEMPTIVE - " : "") + "(leader quick + random - surprise) " + leaderQuickness + " + " + r + " - " + enemySurprise + " = " + result);
  };
  
  var cleanMonsterIndex = function(index) { return (index == null ? 0 : index); };

  var createCharStatsUI = function(char) {
    var $charStats = $("<div/>").addClass("charStats").addClass(ORDINALS[char.charIndex]);
    var $border = $("<div/>").addClass("border");
    var $name = $("<div/>").addClass("name").append(Message.create(char.charName));
    var $hpLabel = $("<label/>").addClass("hp").append(Message.create("HP"));
    var $hp = $("<div/>").addClass("hp").append(Message.create(char.hitPoints + ""));
    
    $border.append($name).append($hpLabel).append($hp);
    $charStats.append($border);
    
    return $charStats;
  };
  
  var isMixedSize = function(sizeCounts) {
    var numSizes = 0;
    if (sizeCounts.small.enemies.length > 0) { numSizes++; } 
    if (sizeCounts.large.enemies.length > 0) { numSizes++; }
    if (sizeCounts.fiend.enemies.length > 0) { numSizes++; }
    return numSizes > 1;
  };
  
  var isMessageValid = function(message) {
    return message != null && message.length > 0;
  };
  
  var isSetupValid = function(sizeCounts) {
    if (isMixedSize(sizeCounts)) {
      var isValid = 
        sizeCounts.small.enemies.length <= RESTRICTIONS.mixed.small && 
        sizeCounts.large.enemies.length <= RESTRICTIONS.mixed.large &&
        sizeCounts.fiend.enemies.length <= RESTRICTIONS.mixed.fiend;
      if (!isValid) {
        alert("Mixed enemies found, must have less than " + RESTRICTIONS.mixed.small + " small, " + RESTRICTIONS.mixed.large + " large, and " + RESTRICTIONS.mixed.fiend + " enemies");
      }
      return isValid;
    }
    
    for (var s in sizeCounts) {
      if (sizeCounts[s].enemies.length > RESTRICTIONS[s]) {
        alert("Too many " + s  + " enemies [" + sizeCounts[s].enemies.length + "], must be less than [" + RESTRICTIONS[s] + "]");
        return false;
      }
    }
    return true;
  };
  
  var populateEnemyList = function(enemies) {
    var $enemyList = $(".enemy.list", $battle);
    $enemyList.empty();
    jQuery.each(enemies, function(i, enemy) {
      $enemyList.append(Message.create(enemy.name));
    });
  };
  
  var setupEnemies = function(enemyQuantities) {
    if (!enemyQuantities || jQuery.isEmptyObject(enemyQuantities)) {
      return false;
    }
    var sizeCounts = calculateEnemySizeCounts(enemyQuantities);
    if (!isSetupValid(sizeCounts)) {
      return false;
    }
    
    var $enemies = $(".enemies", $battle); 
    var $column = null, numColumns = 0;
    var mixed = isMixedSize(sizeCounts);
    var restrictions = mixed ? RESTRICTIONS.mixed : RESTRICTIONS;
    
    $enemies.find(".column").remove();
    
    for (var s in sizeCounts) {
      var size = s;
      var enemiesBySize = sizeCounts[s].enemies;
      jQuery.each(enemiesBySize, function(i, name) {
        if (i % ENEMIES_PER_COLUMN[size] == 0) {
          $column = $("<div/>").addClass("column").addClass(size).addClass(ORDINALS[numColumns++]);
          if (mixed) {
            $column.addClass("mixed");
          }
          $enemies.append($column);
        }
        
        // TODO: determine if we need to call createForBattle here, also called in addEnemy()
        var monster = Monster.createForBattle(Monster.lookup(name));
        addEnemy(monster);
        $column.append(self.createEnemyUI(monster));
      });
      
      if (size == "small" && enemiesBySize.length % ENEMIES_PER_COLUMN[size] == 1) {
        $column.addClass("single");
      }
    }
    
    populateEnemyList(enemyQuantities);
    //console.log(jQuery.map(sizeCounts, function(obj, size) { return size + "=" + obj.enemies.length + "[" + obj.enemies.join(",") + "]"; }).join(","));
  };
  
  var setupParty = function(party) {
    $party.find(".char").remove();
    $stats.empty();
    
    jQuery.each(party, function(i, char) {
      $party.append(self.createCharUI(char));
      $stats.append(createCharStatsUI(char));
      self.resetCharUI(char);
    });
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.adjustCharStats = function(result) {
    var char = result.target;
    var $char = self.getCharUI(char); 
    var $charStats = $(".charStats." + ORDINALS[char.charIndex], $stats);
      
    if (result.targetHp) {
      // Updates the HP for the character
      $("div.hp", $charStats).empty().append(Message.create(result.targetHp + ""));
    }
    
    $char.removeClass(CHAR_ANIMATION_CLASSES.join(" "));

    if (result.died) {
      $char.addClass("dead");
      $("label.hp", $charStats).empty().append(Message.create("HP"));
      $("div.hp", $charStats).empty().append(Message.create("0"));
      return;
    }
    
    if (result.status) {
      if (result.status.battleText) {
        var $statusText = null;
        if (result.status.shrunkBattleText) {
          $statusText = Message.create(null, "shrunk " + result.status.battleText);
        } else {
          $statusText = Message.create(result.status.battleText);
        }
        $("label.hp", $charStats).empty().append($statusText);
      }
      
      if (result.status.critical) {
        $char.addClass("critical");
      }
      
      if (Status.equals(result.status, Status.Stone)) {
        $char.addClass("stone");
      }
    } else {
      if (result.clearStatuses) {
        $char.removeClass("stone").removeClass("critical");
        $("label.hp", $charStats).empty().append(Message.create("HP"));
      } else if (result.targetHp) {
        $char.toggleClass("critical", char.isCritical(result.targetHp));
      }
    }
  };
  
  self.areAllCharactersDead = function(targets) {
    var allDead = true;
    jQuery.each(targets, function(i, target) {
      if (target.isAlive()) {
        allDead = false;
        return false;
      }
    });
    return allDead;
  };
  
  self.areAllEnemiesDead = function(targets) {
    var allDead = true;
    for (var e in targets) {
      var enemiesByName = targets[e];
      jQuery.each(enemiesByName, function(i, target) {
        if (!target.isDead()) {
          allDead = false;
          return false;
        }
      });
    }
    return allDead;
  };
  
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
    jQuery.each(Party.getChars(), function(i, char) {
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
  
  self.createCharUI = function(char) {
    var $char = $("<p/>").addClass("char").addClass(char.currentClass.name);
    var $weapon = $("<span/>").addClass("weapon hidden").appendTo($char);
    if (char.equippedWeapon) {
      $weapon.addClass(char.equippedWeapon.cssClasses);
    } else if (char.currentClass.isMartialArtist()) {
      $weapon.addClass("punch");
    }
    self.resetCharUI(char);
    return $char;
  };
  
  // Expects a Monster object
  self.createEnemyUI = function(monster) {
    return $("<div/>").addClass("enemy").addClass(monster.cssClass);
  };
  
  self.createSpellUI = function(spell) {
    return $("<span/>").addClass("spell").addClass(spell.effect).addClass(spell.spellId.toLowerCase().replace("!", ""));
  };
  
  self.getCharUI = function(char) {
    if (!char) {
      return null;
    }
    return $party.find(".char").eq(char.charIndex);
  };
  
  self.getAllEnemies = function() { return enemies; };
  
  self.getEnemyUI = function(monster, index) {
    if (!monster) {
      return null;
    }
    return $enemies.find(".enemy." + monster.cssClass).eq(cleanMonsterIndex(index));
  };
  
  self.getEnemyUIByIndex = function(index) {
    return $enemies.find(".enemy:not(.dead)").eq(cleanMonsterIndex(index));
  };
  
  self.inputMessageToggler = function(roundStarting) {
    $(".input", $battle).toggle(!roundStarting);
    $(".messages", $battle).toggleClass("hidden", !roundStarting);
  };
  
  self.isAmbush = function() {
    return ambush;
  }
  
  self.isPreemptive = function() {
    return preemptive;
  };
  
  self.isRunnable = function() {
    return runnable;
  };
  
  self.killEnemyUI = function(monster, index) {
    var $enemy = (index == null ? monster : self.getEnemyUI(monster, index));
    $enemy.addClass("dead");    
  };
  
  self.lookupEnemy = function(name, index) {
    var enemiesByName = enemies[name];
    if (enemiesByName) {
      return enemiesByName[cleanMonsterIndex(index)];
    }
    return null;
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
          KeyPressNotifier.setListener(BattleMenuCursor);
          BattleMenuCursor.startListening();
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
      q.addToChain(function() { KeyPressNotifier.setListener(BattleMenuCursor); });
      q.start();
    }
  };
  
  self.resetCharUI = function(char) {
    self.adjustCharStats({
      target: char
     ,targetHp: char.hitPoints
     ,died: char.isDead()
     ,status: char.getBattleStatus()
    });
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
    runnable = opt.runnable;
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
        jQuery.when(q.start()).then(function() {
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
    BattleMenuCursor.startListening();
    // First character that can select an action walks forward to indicate they are choosing an action
    if (moveFirstChar) {
      var firstChar = null;
      jQuery.each(Party.getChars(), function(i, char) {
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
        Animation.walkAndMoveInBattle(firstChar).start();
      }
      
      // If all characters are incapacitated, move on to the enemy commands and start the round 
      if (BattleCommands.isAllPartyCommandsEntered()) {
        BattleCommands.generateEnemyCommands();
      }
    }
  };
  
  self.toggleCriticalStatus = function(char) {
    var $char = self.getCharUI(char);
    if ($char.is(".stillCritical")) {
        $char.removeClass("stillCritical").addClass("critical");
    }
  };
  
  return this;
}).call({});