var DebugHelper = (function() {
  
  var HELPERS = {
    enemiesSplash : {view:"battleView"}
   ,battleSetup : {view:"battleView"}
   ,partySetup : {view:"battleView"} 
   ,animations : {view:"battleView"} 
   ,battleMessages : {view:"battleView", disableKeyListener:true}
  };
  
  var addOption = function($selector, value, text) {
    if (!text) {
      text = value;
    }
    $selector.append($("<option/>").text(text).val(value));
  };
  
  var loadMainView = function(helper) {
    helper = jQuery.extend({view:"world", disableKeyListener:true}, helper);
    $("body > .main").hide();
    $("#" + helper.view).show();
    
    KeyPressNotifier.clearListener();
    
    switch (helper.view) {
      case "world":
        Movement.startListening();
        break;
      case "battleView":
        if (!helper.disableKeyListener) {
          BattleMenuCursor.startListening();
        }
        break;
    };
  };
  
  var menuChange = function($menuOption) {
    $menuOption.parent().siblings().removeClass("selected");
    $menuOption.parent().addClass("selected");
    
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