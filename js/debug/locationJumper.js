define(
/* DebugLocationJumper */
["jquery", "./util", "events", "maps/map", "../constants/map", "maps/transition", "party", "data/statuses", "../constants/shop"],
function($, DebugHelper, Event, Map, MapConstants, MapTransition, Party, Status, ShopConstants) {

  var $debug = null;

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

  var jumpToLocation = function($row) {
    var mapId = $row.find(".selector").val();
    var y = parseInt($row.find(".y").val(), 10);
    var x = parseInt($row.find(".x").val(), 10);
    y = isNaN(y) ? 0 : y;
    x = isNaN(x) ? 0 : x;
    Event.transmit(Event.Types.JumpTo, mapId, new Map.Coords({y:y, x:x}));
  };

  var jumpToTown = function($row) {
    var map = $(".selector", $row).val();
    if (map.length > 0) {
      Event.transmit(Event.Types.JumpTo, MapConstants.WORLD_MAP, MapTransition.toWorldMap(map).toCoords);
    }
  };

  var jumpToShop = function($row) {
    Event.transmit(Event.Types.JumpTo, MapConstants.CONERIA, Map.lookup(MapConstants.CONERIA).start);
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
      DebugHelper.initLocationSelector($debug.find(".location"));
    },

    event : function($target) {
      if ($target.is(".go")) {
        var $row = $target.closest(".row");
        if ($row.is(".town")) { jumpToTown($row); }
        else if ($row.is(".shop")) { jumpToShop($row); }
        else if ($row.is(".location")) { jumpToLocation($row); }
      }
    }
  };
});