var CoordsHelper = (function() {
  
  var event = function($target) {
    if ($target.is(".go")) { moveParty($target); }
    else if ($target.is(".absolute")) { showAbsolute($target); }
  };
  
  var moveParty = function($target) {
    var coords = toCoords($target);
    Party.jumpTo(coords.toAbsolute());
  };
  
  var showAbsolute = function($target) {
    var $absoluteContainer = $target.closest(".container").find(".absolute.container");
    var coords = toCoords($target);
    var absolute = coords.toAbsolute();
    $(".absolute.y", $absoluteContainer).html(absolute.y);
    $(".absolute.x", $absoluteContainer).html(absolute.x);
    $absoluteContainer.removeClass("hidden");
  };
  
  var toCoords = function($target) {
    var $container = $target.closest("div");
    var tilesetY = parseInt($("input.tileset.y", $container).val()); 
    var tilesetX = parseInt($("input.tileset.x", $container).val());
    var tileY = parseInt($("input.tile.y", $container).val());
    var tileX = parseInt($("input.tile.x", $container).val());
    var coords = new Map.Coords(tilesetY, tilesetX, tileY, tileX);
    return coords;
  };
  
  return {
    event: event
  };
})();