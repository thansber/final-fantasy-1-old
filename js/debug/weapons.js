var WeaponHelper = (function() {
  
  var $debug = null;
  
  var init = function() {
    $debug = $("#debug section.weapons .container");
    initCharClassSelector();
  };
  
  var event = function($target) {
    if ($target.is(".selector")) {
      if ($target.val().length > 0) {
        $(".stances", $debug).remove();
        $debug.append(createCharWithAllWeapons($target.val()));
      }
    } 
  };
  
  var initCharClassSelector = function() {
    var $selector = $(".selector", $debug);
    jQuery.each(CharacterClass.All, function(i, charClass) {
      $selector.append($("<option/>").val(charClass.name).text(charClass.name));
    });
  };
  
  var createCharWithAllWeapons = function(charClass) {
    var char = Party.createNewChar("AAAA", charClass, 0);
    var $stances = $("<div/>").addClass("attack stances").addClass(charClass);
    
    jQuery.each(Equipment.Weapon.All, function(i, weapon) {
      char.unequipWeapon();
      char.weapon(weapon.name, true);

      $stances.append(Battle.createCharUI(char).addClass("swing back"));
      $stances.append(Battle.createCharUI(char).addClass("swing forward"));
      
      $(".weapon", $stances).removeClass("hidden");
    });
    
    if (CharacterClass.lookup(charClass).isMartialArtist()) {
      char.unequipWeapon();
      $stances.append(Battle.createCharUI(char).addClass("swing back"));
      $stances.append(Battle.createCharUI(char).addClass("swing forward"));
      $(".weapon", $stances).removeClass("hidden");
    }
    
    return $stances;
  };
  
  return {
    init: init
   ,event: event
  };
})();