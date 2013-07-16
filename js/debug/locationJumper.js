define(
/* DebugLocationJumper */
["jquery", "./util", "events", "map-config", "../constants/map", "map-coords-absolute", "maps/transition", "party", "statuses", "../constants/shop"],
function($, DebugHelper, Event, MapConfig, MapConstants, MapCoordsAbsolute, MapTransition, Party, Status, ShopConstants) {

  var $debug = null;

  var findTownCoords = function(map) {
    var transitions = MapTransition.All[MapConstants.WORLD_MAP];
    for (var t = 0; t < transitions.length; t++) {
      if (map === transitions[t].to) {
        return transitions[t].fromCoords;
      }
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
      var townCoords = findTownCoords(map);
      Event.transmit(Event.Types.JumpTo, MapConstants.WORLD_MAP, townCoords);
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

  return {
    init : function() {
      $debug = $("#debug section.locationJumper");
      initTownSelector();
      initShopSelector();
    },

    event : function($target) {
      if ($target.is(".go")) {
        var $row = $target.closest(".row");
        if ($row.is(".town")) { jumpToTown($row); }
        else if ($row.is(".shop")) { jumpToShop($row); }
      }
    }
  };
});