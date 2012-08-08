define( 
/* DebugUtil */
["jquery", "events", "key-press-notifier", "movement", "./constants", "../constants/cursor", "../constants/map", "../constants/party"], 
function($, Event, KeyPressNotifier, Movement, DebugConstants, CursorConstants, MapConstants, PartyConstants) {
  
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
                MapConstants.MATOYAS_CAVE, MapConstants.DWARF_CAVE, MapConstants.TITANS_TUNNEL, MapConstants.SARDAS_CAVE,
                MapConstants.TEMPLE_OF_FIENDS, 
                MapConstants.MARSH_CAVE_B1, MapConstants.MARSH_CAVE_B2A, MapConstants.MARSH_CAVE_B2B, MapConstants.MARSH_CAVE_B3,
                MapConstants.EARTH_CAVE_B1, MapConstants.EARTH_CAVE_B2, MapConstants.EARTH_CAVE_B3, MapConstants.EARTH_CAVE_B4, MapConstants.EARTH_CAVE_B5,
                MapConstants.CARDIA_ISLANDS_MAIN, MapConstants.CARDIA_ISLANDS_BAHAMUT, MapConstants.CARDIA_ISLANDS_BAHAMUT_2F];
    
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