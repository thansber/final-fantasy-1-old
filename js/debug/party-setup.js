var PartySetupHelper = (function() {
  
  var $debug = null;
  
  var init = function() {
    $debug = $("#debug section.partySetup");
    jQuery.each($(".row", $debug), function() {
      var $radioButtons = $(".classes input[type='radio']", $(this));
      if (!($radioButtons.is(":checked"))) {
        $radioButtons.eq(0).click();
      }
    });
    
    jQuery.each($(".row .statuses", $debug), function() {
      var $radioButtons = $(this).find("input[type='radio']");
      if (!($radioButtons.is(":checked"))) {
        $radioButtons.eq(0).click();
      }
    });
  };
  
  var event = function($target) {
    var chars = [];
    Party.clearChars();
    $debug.find(".classes input[type='radio']:checked").each(function(i, elem) {
      var $this = $(elem);
      var charClass = elem.value;
      var name = "";
      for (var n = 0; n < 4; n++) { 
        name += String.fromCharCode(65 + i); 
      }
      
      var char = Party.createNewChar(name, charClass, i);
      Party.addChar(char);
      
      equipRandomWeapon(char);
      
      var status = $this.closest(".row").find(".statuses input[type='radio']:checked").val();
      switch (status) {
        case "dead":
          char.addStatus(Status.Dead);
          break;
        case "stone":
          char.addStatus(Status.Stone);
          break;
        case "critical":
          char.applyDamage(Math.floor(char.maxHitPoints * 0.75) + 1);
          break;
      }
    });
    
    //jQuery.each(Party.getChars(), function(i, char) { console.log(char.toString()); });
    
    Battle.setup();
  };
  
  var equipRandomWeapon = function(char) {
    var weaponArray = jQuery.map(Equipment.Weapon.All, function(weapon, name) {
      return weapon;
    });
    weaponArray.unshift(null);
    var weapon = RNG.randomArrayElement(weaponArray);
    if (weapon) {
      char.weapon(weapon.name, true);
    } else {
      char.unequipWeapon();
    }
  };
  
  return {
    init: init
   ,event: event
  };
})();