define( 
/* DebugUtil */
["jquery", "events", "key-press-notifier", "movement", "./constants", "../constants/cursor", "../constants/party"], 
function($, Event, KeyPressNotifier, Movement, DebugConstants, CursorConstants, PartyConstants) {
  
  var addOption = function($selector, value, text) {
    if (!text) {
      text = value;
    }
    $selector.append($("<option/>").text(text).val(value));
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
   ,loadMainView: loadMainView
   ,menuChange: menuChange
  };
});