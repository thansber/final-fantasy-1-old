var EnemyHelper = (function() {
  
  var $debugContainer = null;
  
  var init = function() {
    $debugContainer = $("#debug section.enemies");
    DebugHelper.loadMainView("world");
    initializeSelector();
  };
  
  var initializeSelector = function() {
    var $selector = $("#enemySelector");
    $selector.append($("<option/>").text("-- Select an enemy --").val(""));
    var sortedMonsters = jQuery.map(Monster.All, function(monster) {
      return monster.name;
    }).sort(sortByNameIgnoreCase);
    jQuery.each(sortedMonsters, function(i, name) { 
      $selector.append($("<option/>").text(name).val(name));
    });
  };
  
  var sortByNameIgnoreCase = function(a, b) {
    b = b.toLowerCase();
    a = a.toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  };
  
  var event = function($target) {
    var selectedEnemy = $target.val();
    if (selectedEnemy.length == 0) {
      return false;
    }
    var monster = Monster.lookup(selectedEnemy);
    $(".monster", $debugContainer).hide();
    if (monster) {
      var $monsterContainer = $(".monster." + monster.size, $debugContainer);
      $monsterContainer.empty();
      $monsterContainer.append(Battle.createEnemyUI(monster));
      $monsterContainer.show();
    }
  };
  
  return {
    init: init
   ,event: event
  };
})();