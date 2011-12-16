var LocationJumperHelper = (function() {
  
  var self = this;
  var $debug = null;
  
  self.init = function() {
    $debug = $("#debug section.locationJumper");
    initTownSelector();
    initShopSelector();
  };
  
  self.event = function($target) {
    if ($target.is(".go")) {
      var $row = $target.closest(".row");
      if ($row.is(".town")) { jumpToTown($row); } 
      else if ($row.is(".shop")) { jumpToShop($row); }
    } 
  };
  
  var initTownSelector = function() {
    var $selector = $(".town .selector", $debug);
    DebugHelper.addOption($selector, "", "--Select a town--");
    DebugHelper.addOption($selector, Map.CONERIA, "Coneria");
    DebugHelper.addOption($selector, Map.PRAVOKA, "Pravoka");
    DebugHelper.addOption($selector, Map.ELFLAND, "Elfland");
    DebugHelper.addOption($selector, Map.MELMOND, "Melmond");
    DebugHelper.addOption($selector, Map.CRESCENT_LAKE, "Crescent Lake");
    DebugHelper.addOption($selector, Map.ONRAC, "Onrac");
    DebugHelper.addOption($selector, Map.GAIA, "Gaia");
    DebugHelper.addOption($selector, Map.LEFEIN, "Lefein");
  };
  
  var initShopSelector = function() {
    var $selector = $(".shop .selector", $debug);
    DebugHelper.addOption($selector, "", "--Select a shop--");
    for (var s in Shops.Types) {
      DebugHelper.addOption($selector, Shops.Types[s], Shops.Types[s]);
    }
    $selector.val(Shops.Types.WhiteMagic);
  };
  
  var jumpToTown = function($row) {
    var map = $(".selector", $row).val();
    if (map.length > 0) {
      var mapConfig = Map.getMap(map);
      var destination = new Map.AbsoluteCoords(mapConfig.worldMapExit.y, mapConfig.worldMapExit.x);
      destination.adjust(0, 1, Map.getMap(Map.WORLD_MAP));
      Party.jumpTo(Map.WORLD_MAP, destination);
    }
  };
  
  var jumpToShop = function($row) {
    Party.jumpTo(Map.CONERIA, Towns.Coneria.Config.start);
    var shopType = $(".selector", $row).val();
    if (shopType == Shops.Types.Clinic) {
      Party.getChar(0).addStatus(Status.Dead);
      Party.getChar(2).addStatus(Status.Dead);
    }
    Party.enterShop(shopType);
  };
  
  return this;
}).call({});