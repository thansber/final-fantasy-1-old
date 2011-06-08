var DebugHelper = (function() {
  
  var loadMainView = function(mainView) {
    $("body > .main").hide();
    $("#" + mainView).show();
  };
  
  var menuChange = function($menuOption) {
    $menuOption.parent().siblings().removeClass("selected");
    $menuOption.parent().addClass("selected");
    
    $("#debug section").hide();
    var section = ($menuOption.attr("className").split(" ")[0]);
    $("#debug section." + section).show();
  };
  
  return {
    loadMainView: loadMainView
   ,menuChange: menuChange
  }
  
})();