var BattleMessageHelper = (function() {
  
  var init = function() {
    
  };
  
  var event = function($target) {
    var $container = $target.closest(".container");
    if ($target.is(".show")) {
      var message = {};
      message.source = $(".source.message", $container).val();
      message.target = $(".target.message", $container).val();
      message.action = $(".action.message", $container).val();
      message.damage = $(".damage.message", $container).val();
      message.desc = $(".desc.message", $container).val();
      Battle.outputRoundResults([{messages:message}]);
    }
  };
  
  return {
    event: event
  };
})();