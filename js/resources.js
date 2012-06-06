define(/* */
["events", "logger", "constants/map", "js/lib/PxLoader.js", "js/lib/PxLoaderImage.js"],
function(Event, Logger, MapConstants) {
  
  var $loaderPercent = null;
  var ALL = {};
  var IMAGES = {};
  
  var loader = new PxLoader({statusInterval:400});
  
  var Resource = function(id, fileName) {
    this.id = id;
    this.fileName = fileName;
    
    if (!IMAGES[fileName]) {
      this.image = loader.addImage(fileName);
      IMAGES[fileName] = this.image;
    } else {
      this.image = IMAGES[fileName];
    }
    ALL[id] = this;
  };
  
  var everythingFinishedLoading = function() {
    setTimeout(function() {
      $("#loader").hide();
      Event.transmit(Event.Types.ResourcesFinished);
    }, 300);
  };
  
  var imageFinishedLoading = function(e) {
    var percent = Math.floor(100 * e.completedCount / e.totalCount);
    $loaderPercent.text(percent);
  };
  
  return {
    init: function() {
      new Resource(MapConstants.WORLD_MAP, "images/maps/world-map-sheet.png");
      
      new Resource(MapConstants.CONERIA, "images/maps/town-sheet.png");
      new Resource(MapConstants.PRAVOKA, "images/maps/town-sheet.png");
      new Resource(MapConstants.ELFLAND, "images/maps/town-sheet.png");
      new Resource(MapConstants.MELMOND, "images/maps/town-sheet.png");
      new Resource(MapConstants.CRESCENT_LAKE, "images/maps/town-sheet.png");
      new Resource(MapConstants.ONRAC, "images/maps/town-sheet.png");
      new Resource(MapConstants.GAIA, "images/maps/town-sheet.png");
      new Resource(MapConstants.LEFEIN, "images/maps/town-sheet.png");
      
      new Resource(MapConstants.CONERIA_CASTLE, "images/maps/castle-sheet.png");
      new Resource(MapConstants.CONERIA_CASTLE_2F, "images/maps/castle-sheet.png");
      new Resource(MapConstants.ELF_CASTLE, "images/maps/castle-sheet.png");
      new Resource(MapConstants.ASTOS_CASTLE, "images/maps/castle-sheet.png");
      
      new Resource(MapConstants.MATOYAS_CAVE, "images/maps/matoya-cave-sheet.png");
      new Resource(MapConstants.DWARF_CAVE, "images/maps/dwarf-cave-sheet.png");
      new Resource(MapConstants.TITANS_TUNNEL, "images/maps/titans-tunnel-sheet.png");
      new Resource(MapConstants.SARDAS_CAVE, "images/maps/sardas-cave-sheet.png");
      
      new Resource(MapConstants.TEMPLE_OF_FIENDS, "images/maps/temple-of-fiends-sheet.png");
      new Resource(MapConstants.EARTH_CAVE_B1, "images/maps/earth-cave-sheet.png");
      new Resource(MapConstants.EARTH_CAVE_B2, "images/maps/earth-cave-sheet.png");
      new Resource(MapConstants.EARTH_CAVE_B3, "images/maps/earth-cave-sheet.png");
      new Resource(MapConstants.EARTH_CAVE_B4, "images/maps/earth-cave-sheet.png");
      new Resource(MapConstants.EARTH_CAVE_B5, "images/maps/earth-cave-sheet.png");
      
      loader.addProgressListener(imageFinishedLoading);
      loader.addCompletionListener(everythingFinishedLoading);
      loader.start();
      
      $loaderPercent = $("#loader span");
    },
    
    lookup: function(id) {
      return ALL[id];
    }
  };
});