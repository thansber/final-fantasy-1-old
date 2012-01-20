define(
/* TempleOfFiendsMapData */
["map-config", "map-coords-absolute", "map-tile", "constants/map", "constants/movement"], 
function(MapConfig, MapCoordsAbsolute, MapTile, MapConstants, MovementConstants) {
  
  var mapping = {
    " " : MapTile.create({cssClasses:"floor", passableUsing:[MovementConstants.Transportation.Foot]}),
    "c" : MapTile.create({cssClasses:"chest"}),
    "d" : MapTile.create({cssClasses:"gargoyle right"}),
    "e" : MapTile.create({cssClasses:"gargoyle left"}),
    "n" : MapTile.create({cssClasses:"orb top"}),
    "o" : MapTile.create({cssClasses:"orb bottom"}),
    "p" : MapTile.create({cssClasses:"pillar"}),
    "r" : MapTile.create({cssClasses:"room", passableUsing:[MovementConstants.Transportation.Foot]}),
    "s" : MapTile.create({cssClasses:"statue"}),
    "D" : MapTile.create({cssClasses:"door", passableUsing:[MovementConstants.Transportation.Foot]}),
    "J" : MapTile.create({cssClasses:"room wall tl"}),
    "K" : MapTile.create({cssClasses:"room wall top"}),
    "L" : MapTile.create({cssClasses:"room wall tr"}),
    "M" : MapTile.create({cssClasses:"room wall left"}),
    "N" : MapTile.create({cssClasses:"room wall right"}),
    "O" : MapTile.create({cssClasses:"room wall bl"}),
    "P" : MapTile.create({cssClasses:"room wall bottom", passableUsing:[MovementConstants.Transportation.Foot]}),
    "Q" : MapTile.create({cssClasses:"room wall br"}),
    "U" : MapTile.create({cssClasses:"wall left"}),
    "V" : MapTile.create({cssClasses:"wall floor left"}),
    "W" : MapTile.create({cssClasses:"wall"}),
    "X" : MapTile.create({cssClasses:"wall floor right"}),
    "Y" : MapTile.create({cssClasses:"wall right"}),
    "." : MapTile.create({cssClasses:"none"}),
    ">" : MapTile.create({cssClasses:"stairs up"})
  };
  
  var init = function() {
    MapConfig.create({id:MapConstants.TEMPLE_OF_FIENDS, numTilesets:1, height:37, width:42, 
                      start:MapCoordsAbsolute.create({y:28, x:14}), hasBattles:true})
             .setMapping(mapping)
             .addTileset(["UWWWWY..............................UWWWWY",
                          "V    X..............................V    X",
                          "VJKKLX..............................VJKKLX",
                          "VMccNX..............................VMccNX",
                          "VOPPQ Y............................U OPPQX",
                          "VWWDW  WWWWWWWWWYWWWWWWWUWWWWWWWWWW  WDWWX",
                          "V               Xp     pV                X",
                          "WWWV  XWWWWWWWV  WWp pWW  XWWWWWWWV  XWWWW",
                          "...WV X       WV         XW       V XW....",
                          "....V X        WWWWp pWWWW        V X.....",
                          "....V X                          U  X.....",
                          "....V  Y           p p          U   X.....",
                          "....V   Y                       V   X.....",
                          "....UWV X          p p          V XWY.....",
                          "....VpV X      JKKKKKKKKKL      V XpX.....",
                          "....V W W      MsrrrrrrrsN      W W X.....",
                          "....V p p p p JrrsrrnrrsrrL p p p p X.....",
                          "....V         MrrrsdoesrrrN         X.....",
                          "....V p p p p MrrsrrrrrsrrN p p p p X.....",
                          "....V U Y     MrsrrrrrrrsrN     U Y X.....",
                          "....VpV X     WMrrrrrrrrrNW     V XpX.....",
                          "....UW  X      OPPPdrePPPQ      V  WY.....",
                          "....V  XW      WWWWMrNWWWW      V   X.....",
                          "....V XW           OPQ          WV  X.....",
                          "....V X            WDW           WV X.....",
                          "....V X            p p            V X.....",
                          "....V X                           V X.....",
                          "....V X        UWWWp pWWWY        V X.....",
                          "...U  X       U           Y       V  Y....",
                          "UWW    WWWWWWW  XWWp pWWV  WWWWWWW    WWWY",
                          "V               Xp  >  pV                X",
                          "VJKL  XWWWWWWWWWWWWWWWWWWWWWWWWWWWWV  JKLX",
                          "VMcN XW............................WV McNX",
                          "VOPQ X..............................V OPQX",
                          "VWDW X..............................V WDWX",
                          "V    X..............................V    X",
                          "WWWWWW..............................WWWWWW"]);
    
   
  };

  return {
    init : init
  };
});