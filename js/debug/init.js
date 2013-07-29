define(
/* Debug */
["jquery", "./actions", "./battle-animations", "./battle-messages", "./battle-setup", "./chars-walking",
 "./enemies", "./util", "./locationJumper", "./maps", "./messages", "./menus",
 "./spell-effects", "./tiles", "./weapon-animations", "./weapons", "events"],
function($, DebugActions, DebugBattleAnimations, DebugBattleMessages, DebugBattleSetup, DebugCharsWalking,
         DebugEnemies, DebugHelper, DebugLocationJumper, DebugMaps, DebugMessages, DebugMenu,
         DebugSpellEffects, DebugTiles, DebugWeaponAnimations, DebugWeapons, Event) {

  var currentMenu = "locationJumper";

  var init = function() {
    DebugActions.init();
    DebugBattleSetup.init();
    DebugCharsWalking.init();
    DebugEnemies.init();
    DebugLocationJumper.init();
    DebugMaps.init();
    DebugMessages.init();
    DebugSpellEffects.init();
    DebugTiles.init();
    DebugWeapons.init();
    DebugWeaponAnimations.init();

    $("#debug")
    .on("click", ".charsWalking button", function(e) { DebugCharsWalking.fire($(e.target)); });

    $("#debug .menu a").click(function() { DebugHelper.menuChange($(this)); return false; });
    $("#debug section button").click(function() { this.blur(); });

    $("#debug .tiles button").click(function(event) { DebugTiles.event($(event.target)); });
    $("#debug .tiles input").change(function(event) { DebugTiles.event($(event.target)); });
    $("#debug .full-maps button").click(function(event) { DebugMaps.event($(event.target)); });
    $("#debug .full-maps input").change(function(event) { DebugMaps.event($(event.target)); });
    $("#debug .locationJumper button").click(function(event) { DebugLocationJumper.event($(event.target)); });
    $("#debug .battleSetup button").click(function(event) { DebugBattleSetup.event($(event.target)); });
    $("#debug .coords button").click(function(event) { DebugCoords.event($(event.target)); });
    $("#debug .enemiesSplash select").change(function(event) { DebugEnemies.event($(event.target)); });
    $("#debug .enemiesSplash button").click(function(event) { DebugEnemies.event($(event.target)); });
    $("#debug .battleMessages button").click(function(event) { DebugBattleMessages.event($(event.target)); });
    $("#debug .spellEffects button").click(function(event) { DebugSpellEffects.event($(event.target)); });
    $("#debug .weapons select").change(function(event) { DebugWeapons.event($(event.target)); });
    $("#debug .weaponAnimations select").change(function(event) { DebugWeaponAnimations.event($(event.target)); });
    $("#debug .weaponAnimations button").click(function(event) { DebugWeaponAnimations.event($(event.target)); });
    $("#debug .battleAnimations button").click(function(event) { DebugBattleAnimations.event($(event.target)); });
    $("#debug .actions button").click(function(event) { DebugActions.event($(event.target)); });
    $("#debug .menus button").click(function(event) { DebugMenu.event($(event.target)); });

    Event.listen(Event.Types.ResourcesFinished, start);
  };

  var start = function() {
    $("#debug").show().find(".menu a." + currentMenu).click();
  };

  return {
    init : init
  };
});