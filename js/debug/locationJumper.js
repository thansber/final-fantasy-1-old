var WeaponHelper = (function() {
  
  var self = this;
  var $debug = null;
  
  self.init = function() {
    $debug = $("#debug section.locationJumper");
    initLocationSelector();
  };
  
  self.event = function($target) {
    if ($target.is(".go")) {
      var mapConfig = Map.getMap($(".selector", $debug).val());
    } 
  };
  
  var initLocationSelector = function() {
    var $selector = $(".selector", $debug);
    DebugHelper.addOption($selector, Map.CONERIA, "Coneria");
    DebugHelper.addOption($selector, Map.PRAVOKA, "Pravoka");
  };
  
  
  
  return this;
}).call({});