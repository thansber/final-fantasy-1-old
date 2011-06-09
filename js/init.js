$(document).ready(function() {
  
  Movement.init({view:"#view"});
  Map.init();
  Message.init();
  Party.init({player:"#player"});
  Battle.init();
  
  WorldMapHelper.init({tilesets:"#debug .world-map .tilesets"});
  MessageHelper.init();
  BattleBackgroundHelper.init();
  EnemyHelper.init();
  BattleSetupHelper.init();
  
  $("#debug .menu a").click(function() { DebugHelper.menuChange($(this)); });
  
  $("#debug .movement").click(function(event) { MovementHelper.event($(event.target)); });
  $("#debug .world-map").click(function(event) { WorldMapHelper.event($(event.target)); });
  $("#debug .coords button").click(function(event) { CoordsHelper.event($(event.target)); });
  $("#debug .battleBackground select").change(function(event) { BattleBackgroundHelper.event($(event.target)); });
  $("#debug .enemies select").change(function(event) { EnemyHelper.event($(event.target)); });
  $("#debug .battleSetup button").click(function(event) { BattleSetupHelper.event($(event.target)); });
  
  $(window).keydown(function(event) {
    Movement.keyPressChange(event.keyCode, true);
  });
  
  $(window).keyup(function(event) {
    Movement.keyPressChange(event.keyCode, false);
  });
  
  $("#debug .menu a.battleSetup").click();  

  Movement.startListening();
});