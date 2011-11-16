var DebugHelper = (function() {
  
  var HELPERS = {
    enemiesSplash : {view:Party.BATTLE}
   ,battleSetup : {view:Party.BATTLE}
   ,partySetup : {view:Party.BATTLE} 
   ,animations : {view:Party.BATTLE} 
   ,battleMessages : {view:Party.BATTLE, disableKeyListener:true} 
   ,actions : {view:Party.BATTLE}
   ,menus: {view:Party.MENU}
  };
  
  var addOption = function($selector, value, text) {
    if (!text) {
      text = value;
    }
    $selector.append($("<option/>").text(text).val(value));
  };
  
  var loadMainView = function(helper) {
    helper = jQuery.extend({view:Party.WORLD_MAP, disableKeyListener:false}, helper);
    Party.switchView(helper.view);
    
    KeyPressNotifier.clearListener();
    
    switch (helper.view) {
      case Party.WORLD_MAP:
        Movement.startListening();
        break;
      case Party.BATTLE:
        if (!helper.disableKeyListener) {
          Cursors.lookup(Cursors.BATTLE_MENU).startListening();
          //BattleMenuCursor.startListening();
        }
        break;
      case Party.MENU:
        Cursors.lookup(Cursors.CHAR_MENU).startListening({prevListener:Movement});
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
    
    loadMainView(HELPERS[section]);
  };
  
  return {
    addOption: addOption
   ,loadMainView: loadMainView
   ,menuChange: menuChange
  }
})();