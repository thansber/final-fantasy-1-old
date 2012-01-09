define(
/* DebugWeaponAnimations */
["jquery", "battle-engine", "character-class", "./util", "equipment", "events", "party"],
function($, BattleEngine, CharacterClass, DebugHelper, Equipment, Event, Party) {
  
  var $debug = null;
  
  var initCharClassSelector = function() {
    var $selector = $(".selector", $debug);
    jQuery.each(CharacterClass.All, function(i, charClass) {
      DebugHelper.addOption($selector, charClass.name, charClass.name);
    });
  };
  
  var createCharWithAllEquippableWeapons = function(charClass) {
    var char = Party.createNewChar("AAAA", charClass, 0);
    var $stances = $("<div/>").addClass("attack stances").addClass(charClass);
    
    char.weapons();
    jQuery.each(Equipment.Weapon.All, function(i, weapon) {
      char.unequip();
      if (char.canEquip(weapon.name)) {
        char.drop(0).add(weapon.name).equip(0);
        $stances.append(BattleEngine.createCharUI(char)).find(".weapon").removeClass("hidden");
      }
    });
    
    if (CharacterClass.lookup(charClass).isMartialArtist()) {
      char.unequip();
      $stances.append(BattleEngine.createCharUI(char)).find(".weapon").removeClass("hidden")
    }
    
    return $stances;
  };
  
  return {
    init : function() {
      $debug = $("#debug section.weaponAnimations .container");
      initCharClassSelector();
    }
   ,event : function($target) {
      if ($target.is(".selector")) {
        if ($target.val().length > 0) {
          $(".stances", $debug).remove();
          $debug.append(createCharWithAllEquippableWeapons($target.val()));
        }
      } else if ($target.is(".start")) {
        $debug.find(".char").each(function() {
          Event.animate(Event.Animations.SwingWeapon)
               .using({$char:$(this), numAnimations:20})
               .start();
        });
      }
    }
  };
});