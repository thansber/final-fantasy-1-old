$(document).ready(function() {
  
  KeyPressNotifier.init();
  Movement.init();
  Cursor.init();
  Map.init();
  Message.init();
  Party.init({player:"#player"});
  Battle.init();
  
  WorldMapHelper.init({tilesets:"#debug .world-map .tilesets"});
  MessageHelper.init();
  EnemyHelper.init();
  BattleSetupHelper.init();
  PartySetupHelper.init();
  SpellEffectHelper.init();
  WeaponHelper.init();
  WeaponAnimationHelper.init();
  
  Cursor.initCursors();
  
  $("#debug .menu a").click(function() { DebugHelper.menuChange($(this)); return false; });
  
  $("#debug .movement").click(function(event) { MovementHelper.event($(event.target)); });
  $("#debug .world-map").click(function(event) { WorldMapHelper.event($(event.target)); });
  $("#debug .coords button").click(function(event) { CoordsHelper.event($(event.target)); });
  $("#debug .enemies select").change(function(event) { EnemyHelper.event($(event.target)); });
  $("#debug .battleSetup button").click(function(event) { BattleSetupHelper.event($(event.target)); });
  $("#debug .partySetup button").click(function(event) { PartySetupHelper.event($(event.target)); });
  $("#debug .spellEffects button").click(function(event) { SpellEffectHelper.event($(event.target)); });
  $("#debug .weapons select").change(function(event) { WeaponHelper.event($(event.target)); });
  $("#debug .weaponAnimations select").change(function(event) { WeaponAnimationHelper.event($(event.target)); });
  $("#debug .weaponAnimations button").click(function(event) { WeaponAnimationHelper.event($(event.target)); });
  $("#debug .animations button").click(function(event) { AnimationHelper.event($(event.target)); });
  
  $("#debug .menu a.partySetup").click();  
});