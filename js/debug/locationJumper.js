define( 
/* DebugLocationJumper */
["jquery", "./util", "events", "map-config", "map-coords-absolute", "party", "statuses", "../constants/map", "../constants/shop"], 
function($, DebugHelper, Event, MapConfig, MapCoordsAbsolute, Party, Status, MapConstants, ShopConstants) {

  return (function() {
    
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
      DebugHelper.addOption($selector, MapConstants.CONERIA, "Coneria");
      DebugHelper.addOption($selector, MapConstants.PRAVOKA, "Pravoka");
      DebugHelper.addOption($selector, MapConstants.ELFLAND, "Elfland");
      DebugHelper.addOption($selector, MapConstants.MELMOND, "Melmond");
      DebugHelper.addOption($selector, MapConstants.CRESCENT_LAKE, "Crescent Lake");
      DebugHelper.addOption($selector, MapConstants.ONRAC, "Onrac");
      DebugHelper.addOption($selector, MapConstants.GAIA, "Gaia");
      DebugHelper.addOption($selector, MapConstants.LEFEIN, "Lefein");
    };
    
    var initShopSelector = function() {
      var $selector = $(".shop .selector", $debug);
      DebugHelper.addOption($selector, "", "--Select a shop--");
      for (var s in ShopConstants) {
        DebugHelper.addOption($selector, ShopConstants[s], ShopConstants[s]);
      }
      $selector.val(ShopConstants.Clinic);
    };
    
    var jumpToTown = function($row) {
      var map = $(".selector", $row).val();
      if (map.length > 0) {
        var townConfig = MapConfig.lookup(map);
        var destination = MapCoordsAbsolute.create({y:townConfig.worldMapExit.y, x:townConfig.worldMapExit.x});
        destination.adjust(0, 1, MapConfig.lookup(MapConstants.WORLD_MAP));
        Event.transmit(Event.Types.JumpTo, MapConstants.WORLD_MAP, destination);
      }
    };
    
    var jumpToShop = function($row) {
      Event.transmit(Event.Types.JumpTo, MapConstants.CONERIA, MapConfig.lookup(MapConstants.CONERIA).start);
      var shopType = $(".selector", $row).val();
      if (shopType == ShopConstants.Clinic) {
        Party.getChar(0).addStatus(Status.Dead);
        Party.getChar(2).addStatus(Status.Dead);
      }
      Event.transmit(Event.Types.ShopEnter, shopType);
    };
    
    return this;
  }).call({});
});