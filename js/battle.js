var Battle = (function() {
  
  var $battle = null;
  
  // One-time initialization
  var init = function() {
    $battle = $("#battle");
    $battle.find(".commands .column").eq(0)
      .append(Message.create("FIGHT"))
      .append(Message.create("MAGIC"))
      .append(Message.create("DRINK"))
      .append(Message.create("ITEM"));
    $battle.find(".commands .column").eq(1)
      .append(Message.create("RUN"));
  };
  
  // Called for each new battle
  var setup = function(opt) {
    
  };
  
  return {
    init: init
   ,setup: setup
  }
  
})();