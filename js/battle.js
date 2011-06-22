var Battle = (function() {
  
  var $battle = null;
  var $party = null;
  var $stats = null;
  var ordinals = ["first", "second", "third", "fourth"];
  
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  var ENEMIES_PER_COLUMN = {small:3, large:2, fiend:1};
  
  var CHAR_ANIMATION_CLASSES = ["swing", "forward", "back", "arms", "up"];
  
  // One-time initialization
  var init = function() {
    $battle = $("#battle");
    $party = $(".party", $battle);
    $stats = $(".stats", $battle);
    
    $battle.find(".commands .column").eq(0)
      .append(Message.create("FIGHT", "fight"))
      .append(Message.create("MAGIC", "magic"))
      .append(Message.create("DRINK", "drink"))
      .append(Message.create("ITEM", "item"));
    $battle.find(".commands .column").eq(1)
      .append(Message.create("RUN", "run"));
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
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

  var createCharStatsUI = function(char) {
    var $charStats = $("<div/>").addClass("charStats").addClass(ordinals[char.charIndex]);
    var $border = $("<div/>").addClass("border");
    var $name = $("<div/>").addClass("name").append(Message.create(char.charName));
    var $hpLabel = $("<label/>").addClass("hp").append(Message.create("HP"));
    var $hp = $("<div/>").addClass("hp").append(Message.create(char.hitPoints + ""));
    
    $border.append($name).append($hpLabel).append($hp);
    $charStats.append($border);
    
    return $charStats;
  };
  
  var hideInput = function() {
    $(".input", $battle).hide();
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
    jQuery.each(enemies, function(i, enemy) {
      $enemyList.append(Message.create(enemy.name));
    });
  };
  
  var setupEnemies = function(enemies) {
    var sizeCounts = calculateEnemySizeCounts(enemies);
    if (!isSetupValid(sizeCounts)) {
      return false;
    }
    
    var $enemies = $(".enemies", $battle); 
    var $column = null;
    var mixed = isMixedSize(sizeCounts);
    var restrictions = mixed ? RESTRICTIONS.mixed : RESTRICTIONS;
    
    $enemies.find(".column").remove();
    
    for (var s in sizeCounts) {
      var size = s;
      var enemiesBySize = sizeCounts[s].enemies;
      jQuery.each(enemiesBySize, function(i, name) {
        if (i % ENEMIES_PER_COLUMN[size] == 0) {
          $column = $("<div/>").addClass("column").addClass(size);
          if (mixed) {
            $column.addClass("mixed");
          }
          $enemies.append($column);
        }
        
        $column.append(createEnemyUI(Monster.lookup(name)));
      });
      
      if (size == "small" && enemiesBySize.length % ENEMIES_PER_COLUMN[size] == 1) {
        $column.addClass("single");
      }
    }
    
    populateEnemyList(enemies);
    //console.log(jQuery.map(sizeCounts, function(obj, size) { return size + "=" + obj.enemies.length + "[" + obj.enemies.join(",") + "]"; }).join(","));
  };
  
  var setupParty = function(party) {
    $party.find(".char").remove();
    $stats.empty();
    
    jQuery.each(party, function(i, char) {
      $party.append(createCharUI(char));
      $stats.append(createCharStatsUI(char));
    });
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var createCharUI = function(char) {
    var $char = $("<p/>").addClass("char").addClass(char.currentClass.name);
    var $weapon = $("<span/>").addClass("weapon hidden").appendTo($char);
    if (char.equippedWeapon) {
      $weapon.addClass(char.equippedWeapon.cssClasses);
    } else if (char.currentClass.isMartialArtist()) {
      $weapon.addClass("punch");
    }
    resetCharUI(char, $char);
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
    return $party.find(".char").eq(char.charIndex);
  };
  
  var outputRoundResults = function(results) {
    hideInput();
    $(".messages", $battle).removeClass("hidden");
    jQuery.each(results, function(i, result) {
      Message.hideAllBattleMessages();
      for (var m in result.messages) {
        var message = result.messages[m];
        if (isMessageValid(message)) {
          switch (m) {
            case "source": Message.source(message); break;
            case "target": Message.target(message); break;
            case "action": Message.action(message); break;
            case "damage": Message.damage(message); break;
            case "desc": Message.desc(message); break;
          }
        }        
      }
    });
  };
  
  var resetCharUI = function(char, $char) {
    $char.removeClass(CHAR_ANIMATION_CLASSES.join(" "));
    if (char.isCritical()) { $char.addClass("critical"); }
    if (char.isDead()) { $char.addClass("dead"); }
    if (char.hasStatus(Status.Stone)) { $char.addClass("stone"); }
  };
  
  // Called for each new battle
  // Input definition:
  // - enemies: array of {name,qty}
  var setup = function(opt) {
    var enemies = (opt && opt.enemies) || {};
    setupEnemies(enemies);
    setupParty(Party.getChars());
    BattleMenuCursor.startListening();
  };
  
  return {
    init: init
   ,createCharUI: createCharUI
   ,createEnemyUI: createEnemyUI
   ,createSpellUI: createSpellUI
   ,getCharUI: getCharUI
   ,outputRoundResults: outputRoundResults
   ,resetCharUI: resetCharUI
   ,setup: setup
  }  
})();