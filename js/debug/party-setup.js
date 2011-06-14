var PartySetupHelper = (function() {
  
  var $debug = null;
  
  var init = function() {
    $debug = $("#debug section.partySetup");
    jQuery.each($(".row", $debug), function() {
      var $radioButtons = $(this).find("input[type='radio']");
      if (!($radioButtons.is(":checked"))) {
        $radioButtons.eq(0).click();
      }
    });
  };
  
  var event = function($target) {
    var chars = [];
    $debug.find("input[type='radio']:checked").each(function(i, elem) {
      var charClass = elem.value;
      var name = "";
      for (var n = 0; n < 4; n++) { 
        name += String.fromCharCode(65 + i); 
      }
      Party.addChar(Party.createNewChar(name, charClass));
    });
    
    jQuery.each(Party.getChars(), function(i, char) { console.log(char.toString()); });
    
    Battle.setup();
  };
  
  return {
    init: init
   ,event: event
  };
})();