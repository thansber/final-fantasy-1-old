var DebugHelper = (function() {
  
  var HELPERS = {
    battleSetup : "battleView"
   ,partySetup : "battleView" 
  };
  
  var loadMainView = function(mainView) {
    mainView = mainView || "world";
    $("body > .main").hide();
    $("#" + mainView).show();
    
    KeyPressNotifier.clearListener();
    
    switch (mainView) {
      case "world":
        Movement.startListening();
        break;
      case "battleView":
        BattleMenuCursor.startListening();
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
    loadMainView: loadMainView
   ,menuChange: menuChange
  }
})();