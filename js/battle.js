var Battle = (function() {
  
  var $battle = null;
  var RESTRICTIONS = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0}}; 
  
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
    var sizeCounts = {small:0, large:0, fiend:0, chaos:0};
    jQuery.each(enemies, function(i, enemyObj) {
      var enemy = Monster.lookup(enemyObj.name);
      sizeCounts[enemy.size] += enemyObj.qty;
    });
    return sizeCounts;
  };
  
  var isMixedSize = function(sizeCounts) {
    var numSizes = 0;
    if (sizeCounts.small > 0) { numSizes++; } 
    if (sizeCounts.large > 0) { numSizes++; }
    if (sizeCounts.fiend > 0) { numSizes++; }
    return numSizes > 1;
  };
  
  var isSetupValid = function(sizeCounts) {
    if (isMixedSize(sizeCounts)) {
      var isValid = 
        sizeCounts.small <= RESTRICTIONS.mixed.small && 
        sizeCounts.large <= RESTRICTIONS.mixed.large &&
        sizeCounts.fiend <= RESTRICTIONS.mixed.fiend;
      if (!isValid) {
        alert("Mixed enemies found, must have less than " + RESTRICTIONS.mixed.small + " small, " + RESTRICTIONS.mixed.large + " large, and " + RESTRICTIONS.mixed.fiend + " enemies");
      }
      return isValid;
    }
    
    for (var s in sizeCounts) {
      if (sizeCounts[s] > RESTRICTIONS[s]) {
        alert("Too many " + s  + " enemies [" + sizeCounts[s] + "], must be less than [" + RESTRICTIONS[s] + "]");
        return false;
      }
    }
    return true;
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
    var sizeCounts = calculateEnemySizeCounts(opt);
    if (!isSetupValid(sizeCounts)) {
      return false;
    }
    
    console.log(jQuery.map(sizeCounts, function(qty, size) { return size + "=" + qty; }).join(","));
  };
  
  
  return {
    init: init
   ,setup: setup
   ,createEnemyUI: createEnemyUI
  }
  
})();