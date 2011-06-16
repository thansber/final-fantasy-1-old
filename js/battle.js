var Battle = (function() {
  
  var $battle = null;
  var $party = null;
  
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  var ENEMIES_PER_COLUMN = {small:3, large:2, fiend:1};
  
  var CHAR_ANIMATION_CLASSES = ["swing", "forward", "back", "arms", "up"];
  
  // One-time initialization
  var init = function() {
    $battle = $("#battle");
    $party = $(".party", $battle);
    
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

  // Expects a Monster object
  var createEnemyUI = function(monster) {
    return $("<p/>").addClass("enemy").addClass(monster.cssClass);
  };
  
  var isMixedSize = function(sizeCounts) {
    var numSizes = 0;
    if (sizeCounts.small.enemies.length > 0) { numSizes++; } 
    if (sizeCounts.large.enemies.length > 0) { numSizes++; }
    if (sizeCounts.fiend.enemies.length > 0) { numSizes++; }
    return numSizes > 1;
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
      var enemies = sizeCounts[s].enemies;
      jQuery.each(enemies, function(i, name) {
        if (i % ENEMIES_PER_COLUMN[size] == 0) {
          $column = $("<div/>").addClass("column").addClass(size);
          if (mixed) {
            $column.addClass("mixed");
          }
          $enemies.append($column);
        }
        
        $column.append(createEnemyUI(Monster.lookup(name)));
      });
      
      if (size == "small" && enemies.length % ENEMIES_PER_COLUMN[size] == 1) {
        $column.addClass("single");
      }
    }
    
    //console.log(jQuery.map(sizeCounts, function(obj, size) { return size + "=" + obj.enemies.length + "[" + obj.enemies.join(",") + "]"; }).join(","));
  };
  
  var setupParty = function(party) {
    $party.find(".char").remove();
    
    jQuery.each(party, function(i, char) {
      $party.append(createCharUI(char));
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
  
  var getCharUI = function(char) {
    return $party.find(".char").eq(char.charIndex);
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
   ,getCharUI: getCharUI
   ,resetCharUI: resetCharUI
   ,setup: setup
  }  
})();