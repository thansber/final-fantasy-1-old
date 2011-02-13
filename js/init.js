$(document).ready(function() {
  
  Movement.init({view:"#view"});
  Debug.init({
    debug:"#debug"
   ,worldMap:{tilesetX:"#tileSetX", tilesetY:"#tileSetY"}
  });
  
  $("#debug .menu a").click(function() { Debug.menuChange($(this)); });
  $("#debug .movement").click(function(event) { Debug.move($(event.target)); });
  $("#debug .world-map").click(function(event) { Debug.WorldMapHelper.event($(event.target)); });
  
  $(window).keydown(function(event) {
    switch (event.keyCode) {
      case 37: Movement.left(); break;
      case 38: Movement.up(); break;
      case 39: Movement.right(); break;
      case 40: Movement.down(); break;
    }
  });
  
  $("#debug .menu a:first").click();
  $("#tileSetY").val("1");
  $("#tileSetX").val("13");
  $("#debug #loadTileSet").click();  
  
});