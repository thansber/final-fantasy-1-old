var Battle = (function() {
  
  var $battle = null;
  
  // One-time initialization
  var init = function() {
    $battle = $("#battle");
    var $firstCol = $battle.find(".commands .column").eq(0);
    var $secondCol = $battle.find(".commands .column").eq(1);
    $firstCol.append(Message.create("FIGHT"));
    $firstCol.append(Message.create("MAGIC"));
    $firstCol.append(Message.create("DRINK"));
    $firstCol.append(Message.create("ITEM"));
    $secondCol.append(Message.create("RUN"));
  };
  
  // Called for each new battle
  var setup = function(opt) {
    
  };
  
  return {
    init: init
   ,setup: setup
  }
  
})();