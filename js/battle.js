var Battle = (function() {
  
  var $battle = null;
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  var ENEMIES_PER_COLUMN = {small:3, large:2, fiend:1};
  
  // One-time initialization
  var init = function() {
    $battle = $("#battle");
    $battle.find(".commands .column").eq(0)
      .append(Message.create("FIGHT"))
      .append(Message.create("MAGIC"))
      .append(Message.create("DRINK"))
      .append(Message.create("ITEM"));
    $battle.find(".commands .column").eq(1)
      .append(Message.create("RUN"));
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ----------------------------------------- */
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
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  
  // Expects a Monster object
  var createEnemyUI = function(monster) {
    return $("<p/>").addClass("enemy").addClass(monster.cssClass);
  };
  
  // Called for each new battle
  // Input definition:
  // - enemies: array of {name,qty}
  var setup = function(opt) {
    setupEnemies(opt.enemies);
  };
  
  
  return {
    init: init
   ,setup: setup
   ,createEnemyUI: createEnemyUI
  }
  
})();