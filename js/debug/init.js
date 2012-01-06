define( 
/* Debug */
["jquery", "./util", "./battle-animations", "./battle-setup", "./coordinates", "./enemies", "./locationJumper", "./messages", "./spell-effects", "./weapon-animations", "./weapons"], 
function($, DebugHelper, DebugBattleAnimations, DebugBattleSetup, DebugCoords, DebugEnemies, DebugLocationJumper, DebugMessages, DebugSpellEffects, DebugWeaponAnimations, DebugWeapons) {
  
  var currentMenu = "battleSetup";
  
  var init = function() {
    DebugBattleSetup.init();
    DebugEnemies.init();
    DebugLocationJumper.init();
    DebugMessages.init();
    DebugSpellEffects.init();
    DebugWeapons.init();
    DebugWeaponAnimations.init();
    
    $("#debug .menu a").click(function() { DebugHelper.menuChange($(this)); return false; });
    
    $("#debug .locationJumper button").click(function(event) { DebugLocationJumper.event($(event.target)); });
    $("#debug .battleSetup button").click(function(event) { DebugBattleSetup.event($(event.target)); });
    $("#debug .coords button").click(function(event) { DebugCoords.event($(event.target)); });
    $("#debug .enemiesSplash select").change(function(event) { DebugEnemies.event($(event.target)); });
    $("#debug .enemiesSplash button").click(function(event) { DebugEnemies.event($(event.target)); });
    $("#debug .spellEffects button").click(function(event) { DebugSpellEffects.event($(event.target)); });
    $("#debug .weapons select").change(function(event) { DebugWeapons.event($(event.target)); });
    $("#debug .weaponAnimations select").change(function(event) { DebugWeaponAnimations.event($(event.target)); });
    $("#debug .weaponAnimations button").click(function(event) { DebugWeaponAnimations.event($(event.target)); });
    $("#debug .animations button").click(function(event) { DebugBattleAnimations.event($(event.target)); });
    
    $("#debug .menu a." + currentMenu).click();  
  };
  
  return {
    init : init
  };
});