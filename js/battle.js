var Battle = (function() {
  
  var $battle = null;
  var $party = null;
  var $enemies = null;
  var $stats = null;
  var $spellList = null;

  var enemies = {};
  
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  var ENEMIES_PER_COLUMN = {small:3, large:2, fiend:1};
  var ORDINALS = ["first", "second", "third", "fourth"];
  var CHAR_ANIMATION_CLASSES = ["swing", "forward", "back", "arms", "up"];
  
  // One-time initialization
  var init = function() {
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
      for (var i = 0; i < enemyObj.qty; i++) {
        sizeCounts[enemy.size].enemies.push(enemyObj.name);
      }
    });
    return sizeCounts;
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
        $column.append(createEnemyUI(monster));
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
      $party.append(createCharUI(char));
      $stats.append(createCharStatsUI(char));
      resetCharUI(char);
    });
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var areAllCharactersDead = function(targets) {
    var allDead = true;
    jQuery.each(targets, function(i, target) {
      if (target.isAlive()) {
        allDead = false;
        return false;
      }
    });
    return allDead;
  };
  
  var areAllEnemiesDead = function(targets) {
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
  
  var calculateRewards = function() {
    var totalExp = 0, goldToAdd = 0;
    for (var name in enemies) {
      var enemiesByName = enemies[name];
      for (var e in enemiesByName) {
        // TODO: Enemies that run away do not count towards exp
        totalExp += enemiesByName[e].exp;
        goldToAdd += enemiesByName[e].gold;
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
  
  var createCharUI = function(char) {
    var $char = $("<p/>").addClass("char").addClass(char.currentClass.name);
    var $weapon = $("<span/>").addClass("weapon hidden").appendTo($char);
    if (char.equippedWeapon) {
      $weapon.addClass(char.equippedWeapon.cssClasses);
    } else if (char.currentClass.isMartialArtist()) {
      $weapon.addClass("punch");
    }
    resetCharUI(char);
    return $char;
  };
  
  // Expects a Monster object
  var createEnemyUI = function(monster) {
    return $("<div/>").addClass("enemy").addClass(monster.cssClass);
  };
  
  var createSpellUI = function(spell) {
    return $("<span/>").addClass("spell").addClass(spell.effect).addClass(spell.spellId.toLowerCase().replace("!", ""));
  };
  
  var getCharUI = function(char) {
    if (!char) {
      return null;
    }
    return $party.find(".char").eq(char.charIndex);
  };
  
  var getEnemyUI = function(monster, index) {
    if (!monster) {
      return null;
    }
    return $enemies.find(".enemy." + monster.cssClass).eq(cleanMonsterIndex(index));
  };
  
  var getEnemyUIByIndex = function(index) {
    return $enemies.find(".enemy:not(.dead)").eq(cleanMonsterIndex(index));
  };
  
  var inputMessageToggler = function(roundStarting) {
    $(".input", $battle).toggle(!roundStarting);
    $(".messages", $battle).toggleClass("hidden", !roundStarting);
  };
  
  var killEnemyUI = function(monster, index) {
    var $enemy = (index == null ? monster : getEnemyUI(monster, index));
    $enemy.addClass("dead");    
  };
  
  var lookupEnemy = function(name, index) {
    var enemiesByName = enemies[name];
    if (enemiesByName) {
      return enemiesByName[cleanMonsterIndex(index)];
    }
    return null;
  };
  
  var moveCharBackwardAndOtherForward = function(charIndexChange) {
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
  
  var nextChar = function() {
    var char = Party.getChar(BattleCommands.getCharIndex());
    if (char) {
      BattleCommands.changeCharIndex(1);
      var q = Animation.walkAndMoveInBattle(char, {direction:"backward"});
      var otherChar = Party.getChar(BattleCommands.getCharIndex());
      while (otherChar && !otherChar.canTakeAction()) {
        BattleCommands.incapacitatedChar(otherChar);
        otherChar = Party.getChar(BattleCommands.getCharIndex());
      }
      if (otherChar) {
        Animation.walkAndMoveInBattle(otherChar, {queue:q});
      }
      q.start();
    }
  };
  
  var populateSpellList = function() {
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
  
  var prevChar = function() {
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
      q.start();
    }
  };
  
  var resetCharUI = function(char) {
    var $char = getCharUI(char); 
    var $charStats = $(".charStats." + ORDINALS[char.charIndex], $stats);
    
    // Updates the HP for the character
    $("div.hp", $charStats).empty().append(Message.create(char.hitPoints + ""));
    
    $char.removeClass(CHAR_ANIMATION_CLASSES.join(" "));
    $char.toggleClass("critical", char.isCritical()); 

    var battleStatus = char.getBattleStatus();
    var $status = null;
    if (battleStatus) {
      $status = battleStatus.length > 4 ? Message.create(null, "shrunk " + battleStatus) : Message.create(battleStatus);
    } else {
      $status = Message.create("HP");
    }
    
    $("label.hp", $charStats).empty().append($status);
    if (char.hasCriticalStatus()) {
      $char.addClass("critical");
    }

    if (char.isDead()) { 
      $char.addClass("dead"); 
    }
    if (char.hasStatus(Status.Stone)) { 
      $char.addClass("stone"); 
    }
  };
  
  // Called for each new battle
  // Input definition:
  // - enemies: [{name:"IMP",qty:3},...]
  // - background: background object, see Map.BattleBackgrounds
  var setup = function(opt) {
    enemies = {};
    opt = opt || {};
    if (opt.background) {
      $("#battle .background").attr("class", "background " + opt.background.cssClass);
    }
    var battleEnemies = (opt && opt.enemies) || {};
    var moveFirstChar = !opt.doNotMove;
    setupEnemies(battleEnemies);
    setupParty(Party.getChars());
    
    inputMessageToggler(false);
    
    // Clear all commands
    BattleCommands.init();
    // Start the cursor listener for the first character's action
    BattleMenuCursor.startListening();
    // First character that can select an action walks forward to indicate they are choosing an action
    if (moveFirstChar) {
      var firstChar = null;
      jQuery.each(Party.getChars(), function(i, char) {
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
  
  var toggleCriticalStatus = function(char) {
    Battle.getCharUI(char).toggleClass("critical", char.isCritical() || char.hasCriticalStatus()); 
  };
  
  return {
    init: init
   ,areAllCharactersDead: areAllCharactersDead
   ,areAllEnemiesDead: areAllEnemiesDead
   ,calculateRewards: calculateRewards
   ,createCharUI: createCharUI
   ,createEnemyUI: createEnemyUI
   ,createSpellUI: createSpellUI
   ,getAllEnemies: function() { return enemies; }
   ,getCharUI: getCharUI
   ,getEnemyUI: getEnemyUI
   ,getEnemyUIByIndex: getEnemyUIByIndex
   ,inputMessageToggler: inputMessageToggler
   ,killEnemyUI: killEnemyUI
   ,lookupEnemy: lookupEnemy
   ,moveCharBackwardAndOtherForward : moveCharBackwardAndOtherForward
   ,nextChar : nextChar
   ,populateSpellList: populateSpellList
   ,prevChar : prevChar
   ,resetCharUI: resetCharUI
   ,setup: setup
   ,toggleCriticalStatus: toggleCriticalStatus
  }  
})();