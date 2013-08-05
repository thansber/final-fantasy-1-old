define(
/* DebugUtil */
["jquery", "events", "key-press-notifier", "movement", "./random-party",
 "../constants/cursor", "./constants", "../constants/map", "../constants/party"],
function($, Event, KeyPressNotifier, Movement, RandomParty,
         CursorConstants, DebugConstants, MapConstants, PartyConstants) {

  var addOption = function($selector, value, text) {
    if (!text) {
      text = value;
    }
    $selector.append($("<option/>").text(text).val(value));
  };

  var battleAnimationReset = function() {
    $("#battle .enemies .splash").addClass("hidden");
  };

  var initLocationSelector = function($container) {
    var maps = [MapConstants.WORLD_MAP,
                MapConstants.CONERIA, MapConstants.PRAVOKA, MapConstants.ELFLAND, MapConstants.MELMOND,
                MapConstants.CRESCENT_LAKE, MapConstants.ONRAC, MapConstants.GAIA, MapConstants.LEFEIN,
                MapConstants.CONERIA_CASTLE, MapConstants.CONERIA_CASTLE_2F, MapConstants.ELF_CASTLE,
                MapConstants.ASTOS_CASTLE, MapConstants.CASTLE_ORDEALS_1F, MapConstants.CASTLE_ORDEALS_2F, MapConstants.CASTLE_ORDEALS_3F,
                MapConstants.MATOYAS_CAVE, MapConstants.DWARF_CAVE, MapConstants.TITANS_TUNNEL, MapConstants.SARDAS_CAVE, MapConstants.WATERFALL_CAVE,
                MapConstants.TEMPLE_OF_FIENDS,
                MapConstants.MARSH_CAVE_B1, MapConstants.MARSH_CAVE_B2A, MapConstants.MARSH_CAVE_B2B, MapConstants.MARSH_CAVE_B3,
                MapConstants.EARTH_CAVE_B1, MapConstants.EARTH_CAVE_B2, MapConstants.EARTH_CAVE_B3, MapConstants.EARTH_CAVE_B4, MapConstants.EARTH_CAVE_B5,
                MapConstants.GURGU_VOLCANO_B1, MapConstants.GURGU_VOLCANO_B2, MapConstants.GURGU_VOLCANO_B3A, MapConstants.GURGU_VOLCANO_B3B, MapConstants.GURGU_VOLCANO_B4A, MapConstants.GURGU_VOLCANO_B4B, MapConstants.GURGU_VOLCANO_B5,
                MapConstants.ICE_CAVE_B1, MapConstants.ICE_CAVE_B2A, MapConstants.ICE_CAVE_B2B, MapConstants.ICE_CAVE_B3A, MapConstants.ICE_CAVE_B3B,
                MapConstants.SEA_SHRINE_B1, MapConstants.SEA_SHRINE_B2, MapConstants.SEA_SHRINE_B2A, MapConstants.SEA_SHRINE_B3, MapConstants.SEA_SHRINE_B3A, MapConstants.SEA_SHRINE_B3B, MapConstants.SEA_SHRINE_B4A, MapConstants.SEA_SHRINE_B4B, MapConstants.SEA_SHRINE_B5,
                MapConstants.CARDIA_ISLANDS_MAIN, MapConstants.CARDIA_ISLANDS_BAHAMUT, MapConstants.CARDIA_ISLANDS_BAHAMUT_2F,
                MapConstants.MIRAGE_TOWER_1F, MapConstants.MIRAGE_TOWER_2F, MapConstants.MIRAGE_TOWER_3F,
                MapConstants.FLOATING_CASTLE_1F, MapConstants.FLOATING_CASTLE_2F, MapConstants.FLOATING_CASTLE_3F, MapConstants.FLOATING_CASTLE_4F, MapConstants.FLOATING_CASTLE_5F,
                MapConstants.TEMPLE_OF_FIENDS_REV_1F, MapConstants.TEMPLE_OF_FIENDS_REV_2F, MapConstants.TEMPLE_OF_FIENDS_REV_3F,
                MapConstants.TEMPLE_OF_FIENDS_REV_B1, MapConstants.TEMPLE_OF_FIENDS_REV_B2, MapConstants.TEMPLE_OF_FIENDS_REV_B3,
                MapConstants.TEMPLE_OF_FIENDS_REV_B4, MapConstants.TEMPLE_OF_FIENDS_REV_B5];

    var $selector = $container.find(".selector");
    for (var m in maps) {
      $("<option/>").val(maps[m]).html(maps[m]).appendTo($selector);
    }
  };

  var loadMainView = function(helper) {
    helper = $.extend({view:PartyConstants.Views.WORLD_MAP, disableKeyListener:false}, helper);
    Event.transmit(Event.Types.SwitchView, helper.view);

    KeyPressNotifier.clearListener();

    switch (helper.view) {
      case PartyConstants.Views.WORLD_MAP:
        Event.transmit(Event.Types.StartGame);
        break;
      case PartyConstants.Views.BATTLE:
        if (!helper.disableKeyListener) {
          Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_MENU);
        }
        break;
      case PartyConstants.Views.MENU:
        RandomParty.create({equip:true, spells:true, consumables:true});
        Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_MENU, {prevListener:Movement});
        break;
    };
  };

  var menuChange = function($menuOption) {
    $menuOption.parent().siblings().removeClass("selected");
    $menuOption.parent().addClass("selected");
    $menuOption.blur();

    $("#debug section").hide();
    var section = $menuOption.attr("class").split(" ")[0];
    $("#debug section." + section).show();

    loadMainView(DebugConstants.Helpers[section]);
  };

  return {
    addOption: addOption
   ,battleAnimationReset : battleAnimationReset
   ,initLocationSelector: initLocationSelector
   ,loadMainView: loadMainView
   ,menuChange: menuChange
  };
});