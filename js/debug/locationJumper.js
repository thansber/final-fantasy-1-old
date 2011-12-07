var LocationJumperHelper = (function() {
  
  var self = this;
  var $debug = null;
  
  self.init = function() {
    $debug = $("#debug section.locationJumper");
    initLocationSelector();
  };
  
  self.event = function($target) {
    if ($target.is(".go")) {
      var map = $(".selector", $debug).val();
      if (map.length > 0) {
        var mapConfig = Map.getMap(map);
        var destination = new Map.AbsoluteCoords(mapConfig.worldMapExit.y, mapConfig.worldMapExit.x);
        destination.adjust(0, 1, Map.getMap(Map.WORLD_MAP));
        Party.jumpTo(Map.WORLD_MAP, destination);
      }
    } 
  };
  
  var initLocationSelector = function() {
    var $selector = $(".selector", $debug);
    DebugHelper.addOption($selector, Map.CONERIA, "Coneria");
    DebugHelper.addOption($selector, Map.PRAVOKA, "Pravoka");
    DebugHelper.addOption($selector, Map.ELFLAND, "Elfland");
    DebugHelper.addOption($selector, Map.MELMOND, "Melmond");
    DebugHelper.addOption($selector, Map.CRESCENT_LAKE, "Crescent Lake");
    DebugHelper.addOption($selector, Map.ONRAC, "Onrac");
    DebugHelper.addOption($selector, Map.GAIA, "Gaia");
    DebugHelper.addOption($selector, Map.LEFEIN, "Lefein");
  };
  
  
  
  return this;
}).call({});