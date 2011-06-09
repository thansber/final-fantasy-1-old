var BattleBackgroundHelper = (function() {
  
  var init = function(opt) {
    initializeSelector();
  };
  
  var initializeSelector = function() {
    var $selector = $("#battleBackgroundSelector");
    $selector.append($("<option/>").text("-- Select a background --").val(""));
    for (var b in Map.BattleBackgrounds) {
      var background = Map.BattleBackgrounds[b]; 
      $selector.append($("<option/>").text(b).val(b));
    }
  };
  
  var event = function($target) {
    var selectedBackground = $target.val();
    if (selectedBackground.length == 0) {
      return false;
    }
    var background = Map.BattleBackgrounds[selectedBackground];
    $("#battle .background").attr("class", "background " + background.cssClass);
  };

  return {
    init: init
   ,event: event
  };
})();