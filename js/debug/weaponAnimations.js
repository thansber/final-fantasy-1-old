var WeaponAnimationHelper = (function() {
  
  var $debug = null;
  var allChars = [];
  
  var init = function() {
    $debug = $("#debug section.weaponAnimations .container");
    initCharClassSelector();
  };
  
  var event = function($target) {
    if ($target.is(".selector")) {
      if ($target.val().length > 0) {
        $(".stances", $debug).remove();
        $debug.append(createCharWithAllWeapons($target.val()));
      }
    } else if ($target.is(".start")) {
      jQuery.each($(".char", $debug), function(i, char) {
        var $char = $(char);
        Animation.swingWeapon(null, {autoStart:true, $char:$char});
      });
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

      $stances.append(Battle.createCharUI(char));
      $(".weapon", $stances).removeClass("hidden");
    });
    
    if (CharacterClass.lookup(charClass).isMartialArtist()) {
      char.unequipWeapon();
      $stances.append(Battle.createCharUI(char));
      $(".weapon", $stances).removeClass("hidden");
    }
    
    return $stances;
  };
  
  return {
    init: init
   ,event: event
  };
})();