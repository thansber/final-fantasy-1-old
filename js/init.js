$(document).ready(function() {
  
  Logger.enable().setLevel(Logger.DEBUG);
  RNG.useDefault();
    
  KeyPressNotifier.init();
  Movement.init();
  Map.init();
  Message.init({messages:"#battle .messages"});
  Party.init({player:"#player"});
  Battle.init();
  Menus.init();
  
  WorldMapHelper.init({tilesets:"#debug .world-map .tilesets"});
  MessageHelper.init();
  EnemyHelper.init();
  BattleSetupHelper.init();
  SpellEffectHelper.init();
  WeaponHelper.init();
  WeaponAnimationHelper.init();
  ActionHelper.init();
  
  Cursor.init();
  
  var currentMenu = "menus";
  
  $("#debug .menu a").click(function() { DebugHelper.menuChange($(this)); return false; });
  
  $("#debug .movement").click(function(event) { MovementHelper.event($(event.target)); });
  $("#debug .world-map").click(function(event) { WorldMapHelper.event($(event.target)); });
  $("#debug .coords button").click(function(event) { CoordsHelper.event($(event.target)); });
  $("#debug .enemiesSplash select").change(function(event) { EnemyHelper.event($(event.target)); });
  $("#debug .enemiesSplash button").click(function(event) { EnemyHelper.event($(event.target)); });
  $("#debug .battleSetup button").click(function(event) { BattleSetupHelper.event($(event.target)); });
  $("#debug .spellEffects button").click(function(event) { SpellEffectHelper.event($(event.target)); });
  $("#debug .weapons select").change(function(event) { WeaponHelper.event($(event.target)); });
  $("#debug .weaponAnimations select").change(function(event) { WeaponAnimationHelper.event($(event.target)); });
  $("#debug .weaponAnimations button").click(function(event) { WeaponAnimationHelper.event($(event.target)); });
  $("#debug .animations button").click(function(event) { AnimationHelper.event($(event.target)); });
  $("#debug .battleMessages button").click(function(event) { BattleMessageHelper.event($(event.target)); });
  $("#debug .actions button").click(function(event) { ActionHelper.event($(event.target)); });
  $("#debug .menus button").click(function(event) { MenuHelper.event($(event.target)); });
  
  $("#debug .menu a." + currentMenu).click();  
});