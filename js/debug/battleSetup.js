var BattleSetupHelper = (function() {
  
  var $debug = null;
  
  var init = function() {
    $debug = $("#debug section.battleSetup");
    initializeSelectors();
  };
  
  var event = function($target) {
    var enemies = [];
    $(".small.row .selectors div", $debug).each(function() {
      var enemyQty = readEnemyQty($(this));
      if (enemyQty) {
        enemies.push(enemyQty);
      }
    });
    
    $(".large.row .selectors div", $debug).each(function() {
      var enemyQty = readEnemyQty($(this));
      if (enemyQty) {
        enemies.push(enemyQty);
      }
    });
    
    var fiendQty = readEnemyQty($(".fiend.row"));
    if (fiendQty) {
      enemies.push(fiendQty);
    }
    
    Battle.setup(enemies);
  };
  
  var readEnemyQty = function($parent) {
    var enemy = $(".selector", $parent).val();
    var qty = $(".qty", $parent).val();
    if (enemy.length > 0 && qty.length > 0) {
      return {name:enemy, qty:parseInt(qty)};
    }
    return null;
  };
  
  var initializeSelectors = function() {
    var $smallSelectors = $(".small .selector", $debug);
    var $largeSelectors = $(".large .selector", $debug);
    var $fiendSelectors = $(".fiend .selector", $debug);
    
    var defaultOption = {value:"", text:"-- Select an enemy --"};
    $smallSelectors.append($("<option/>", defaultOption));
    $largeSelectors.append($("<option/>", defaultOption));
    $fiendSelectors.append($("<option/>", defaultOption));
    
    var smallMonsters = getMonstersBySize("small");
    var largeMonsters = getMonstersBySize("large");
    var fiends = getMonstersBySize("fiend");
    
    jQuery.each(smallMonsters, function(i, name) { $smallSelectors.append($("<option/>", {value:name, text:name})); });
    jQuery.each(largeMonsters, function(i, name) { $largeSelectors.append($("<option/>", {value:name, text:name})); });
    jQuery.each(fiends, function(i, name) { $fiendSelectors.append($("<option/>", {value:name, text:name})); });
  };
  
  var getMonstersBySize = function(size) {
    return jQuery.map(Monster.All, function(monster) {
      return monster.size == size ? monster.name : null;
    }).sort(sortByNameIgnoreCase);
  };
  
  var sortByNameIgnoreCase = function(a, b) {
    b = b.toLowerCase();
    a = a.toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  };
  
  return {
    init: init
   ,event: event
  };
})();