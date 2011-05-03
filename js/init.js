$(document).ready(function() {
  
  Movement.init({view:"#view"});
  Map.init();
  Message.init();
  Party.init({player:"#player"});
  
  Debug.init({
    debug:"#debug"
   ,worldMap:{tilesets:"#debug .world-map .tilesets"}
  });
  
  $("#debug .menu a").click(function() { Debug.menuChange($(this)); });
  $("#debug .movement").click(function(event) { Debug.MovementHelper.event($(event.target)); });
  $("#debug .world-map").click(function(event) { Debug.WorldMapHelper.event($(event.target)); });
  $("#debug .coords button").click(function(event) { Debug.CoordsHelper.event($(event.target)); });
  
  $(window).keydown(function(event) {
    Movement.keyPressChange(event.keyCode, true);
  });
  
  $(window).keyup(function(event) {
    Movement.keyPressChange(event.keyCode, false);
  });
  
  $("#debug .menu a.messages").click();  

  Movement.startListening();
});