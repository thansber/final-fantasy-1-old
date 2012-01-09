define( 
/* DebugEnemies */
["jquery", "./util", "events", "monster"], 
function($, DebugHelper, Event, Monster) {
  
  var $container = null;
  
  var initializeEnemySelector = function() {
    var $selector = $(".enemy.selector", $container);
    DebugHelper.addOption($selector, "", "-- Select --");
    var sortedMonsters = jQuery.map(Monster.All, function(monster) {
      return monster.name;
    }).sort(sortByNameIgnoreCase);
    jQuery.each(sortedMonsters, function(i, name) { 
      DebugHelper.addOption($selector, name);
    });
  };
  
  var initializeSplashSelector = function() {
    var $selector = $(".splash.selector", $container);
    DebugHelper.addOption($selector, "", "-- Select --");
    var splashColors = ["blue", "royal blue", "gold", "light green", "sea green", "green", "grey", "magenta", "orange", "pink", "purple", "red", "turquoise", "white"];
    for (var c in splashColors) {
      DebugHelper.addOption($selector, splashColors[c]);
    }
  };
  
  var sortByNameIgnoreCase = function(a, b) {
    b = b.toLowerCase();
    a = a.toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  };
  
  return {
    init: function() {
      $container = $("#debug section.enemiesSplash");
      initializeEnemySelector();
      initializeSplashSelector();
    }
   ,event: function($target) {
     
     var selectedEnemy = $(".enemy.selector", $container).val();
     if (selectedEnemy == null) {
       return false;
     }
     var monster = Monster.lookup(selectedEnemy);
     var $monsterContainer = null;

     if (monster) {
       $monsterContainer = $(".monster." + monster.size, $container);
     }
     
     if ($target.is(".enemy")) {
       $(".monster", $container).hide();
       if (monster) {
         $monsterContainer.empty();
         $monsterContainer.append($("<div/>").addClass("enemy").addClass(monster.cssClass));
         $monsterContainer.show();
       }
     } else if ($target.is(".show.splash")) {
       var $enemy = $(".enemy", $monsterContainer);
       var splashColors = $(".splash.selector", $container).val();
       var showOverlay = $(".splash.overlay", $container).prop("checked");
       Event.animate(Event.Animations.Splash).using({$enemy:$enemy, splashColors:splashColors, overlay:showOverlay}).start();
     }
   }
  };
});