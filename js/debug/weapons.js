define(
/* DebugWeapons */
["jquery", "battle", "character-class", "./util", "equipment", "party"],
function($, Battle, CharacterClass, DebugHelper, Equipment, Party) {
  
  var $debug = null;
  
  var initCharClassSelector = function() {
    var $selector = $(".selector", $debug);
    $.each(CharacterClass.All, function(i, charClass) {
      DebugHelper.addOption($selector, charClass.name, charClass.name);
    });
  };
  
  var createCharWithAllWeapons = function(charClass) {
    var char = Party.createNewChar("AAAA", charClass, 0);
    var $stances = $("<div/>").addClass("attack stances").addClass(charClass);
    
    char.weapons();
    $.each(Equipment.Weapon.All, function(i, weapon) {
      char.unequip();
      if (char.canEquip(weapon.name)) {
        char.drop(0).add(weapon.name).equip(0);
        $stances.append(Battle.createCharUI(char).addClass("swing back"));
        $stances.append(Battle.createCharUI(char).addClass("swing forward"));
        $(".weapon", $stances).removeClass("hidden");
      }
    });
    
    if (CharacterClass.lookup(charClass).isMartialArtist()) {
      char.unequip();
      $stances.append(Battle.createCharUI(char).addClass("swing back"));
      $stances.append(Battle.createCharUI(char).addClass("swing forward"));
      $(".weapon", $stances).removeClass("hidden");
    }
    
    return $stances;
  };
  
  return {
    init : function() {
      $debug = $("#debug section.weapons .container");
      initCharClassSelector();
    }
   ,event : function($target) {
      if ($target.is(".selector")) {
        if ($target.val().length > 0) {
          $(".stances", $debug).remove();
          $debug.append(createCharWithAllWeapons($target.val()));
        }
      } 
    }
  };
});