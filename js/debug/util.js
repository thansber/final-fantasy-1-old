var DebugHelper = (function() {
  
  var HELPERS = {
    battleBackground: "battleView"
   ,battleSetup: "battleView"
  };
  
  var loadMainView = function(mainView) {
    mainView = mainView || "world";
    $("body > .main").hide();
    $("#" + mainView).show();
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