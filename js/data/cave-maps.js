define(
/* CaveMapData */
["map-config", "map-coords-absolute", "map-tile", "constants/map", "constants/movement"], 
function(MapConfig, MapCoordsAbsolute, MapTile, MapConstants, MovementConstants) {
  
  var mapping = {
    " " : MapTile.create({cssClasses:"floor", passableUsing:[MovementConstants.Transportation.Foot]}),
    "c" : MapTile.create({cssClasses:"chest"}),
    "m" : MapTile.create({cssClasses:"mountain"}),
    "p" : MapTile.create({cssClasses:"pots"}),
    "r" : MapTile.create({cssClasses:"room", passableUsing:[MovementConstants.Transportation.Foot]}),
    "C" : MapTile.create({cssClasses:"chair", passableUsing:[MovementConstants.Transportation.Foot]}),
    "D" : MapTile.create({cssClasses:"door", passableUsing:[MovementConstants.Transportation.Foot]}),
    "J" : MapTile.create({cssClasses:"room wall tl"}),
    "K" : MapTile.create({cssClasses:"room wall top"}),
    "L" : MapTile.create({cssClasses:"room wall tr"}),
    "M" : MapTile.create({cssClasses:"room wall left"}),
    "N" : MapTile.create({cssClasses:"room wall right"}),
    "O" : MapTile.create({cssClasses:"room wall bl"}),
    "P" : MapTile.create({cssClasses:"room wall bottom", passableUsing:[MovementConstants.Transportation.Foot]}),
    "Q" : MapTile.create({cssClasses:"room wall br"}),
    "T" : MapTile.create({cssClasses:"table"}),
    "U" : MapTile.create({cssClasses:"wall left"}),
    "V" : MapTile.create({cssClasses:"wall floor left"}),
    "W" : MapTile.create({cssClasses:"wall"}),
    "X" : MapTile.create({cssClasses:"wall floor right"}),
    "Y" : MapTile.create({cssClasses:"wall right"}),
    ">" : MapTile.create({cssClasses:"stairs up"})
  };
  
  var init = function() {
    MapConfig.create({id:MapConstants.MATOYAS_CAVE, numTilesets:1, height:16, width:17, 
                      start:MapCoordsAbsolute.create({y:28, x:14}), hasBattles:false})
             .setMapping($.extend({}, mapping, {
               "s" : MapTile.create({cssClasses:"skull", passableUsing:[MovementConstants.Transportation.Foot]})
              }))
             .addTileset(["JKKKKKKKKKKKKKKKL",
                          "MsrrspprCrppsrrsN",
                          "MsrrsrprTrprsrrsN",
                          "MsrrsrrrrrrrsrrsN",
                          "McsrrsrrrrrsrrsrN",
                          "McrsrrsrrrsrrsrrN",
                          "MssssrrsrsrrssssN",
                          "McsrrssrrrssrrsrN",
                          "MrrsrrrsrsrrrsrrN",
                          "OPPrssssrssssrPPQ",
                          "UWWMrrrsrsrrrNWWY",
                          "V  OPPPPPPPPPQ >X",
                          "V  WWWWWDWWWWW  X",
                          "V               X",
                          "V               X",
                          "WWWWWWWWWWWWWWWWW"]);
    
    MapConfig.create({id:MapConstants.DWARF_CAVE, numTilesets:1, height:56, width:26, 
                      start:MapCoordsAbsolute.create({y:28, x:14}), hasBattles:false})
             .setMapping($.extend({}, mapping, {
               "a" : MapTile.create({cssClasses:"anvil"}),
               "f" : MapTile.create({cssClasses:"forge"}),
               "h" : MapTile.create({cssClasses:"hammer"}),
               "s" : MapTile.create({cssClasses:"sword", passableUsing:[MovementConstants.Transportation.Foot]})
              }))
             .addTileset(["mmmmmmmmmmmmmmmmmmmmmmmmmm",
                          "mmmmJKKKKKKKL mmmmmmmmmmmm",
                          "mmmmMfhCrsssN  mmmmmJKKKLm",
                          "mm  OParrssPQ   mmmmMrcrNm",
                          "m   WWOPPPQWW    mmmMCcCNm",
                          "m     WWDWW      mmmOPPPQm",
                          "mm                mmWWDWWm",
                          "mmmm               mm   mm",
                          "mmmmmmm   m        mm   mm",
                          "mmmmmmm   mmm   mmmmm   mm",
                          "m                       mm",
                          "m                     > mm",
                          "m                       mm",
                          "mmm   mmmm   mmmJKKKL   mm",
                          "mmm  mmmmm   mmmMCTCN   mm",
                          "mm   mmmmm   mm OPPPQ   mm",
                          "m   mmmmmm   mm WWDWW   mm",
                          "m   mmmmmm              mm",
                          "mm   mmmmm              mm",
                          "mm    mmmm              mm",
                          "mmm    mmmmm         mmmmm",
                          "mmmm   mmmmmm       mmmmmm",
                          "mmmm    mmmmmm   mmmmmmmmm",
                          "mmmm     mmmmmmmmmmmmmmmmm",
                          "mmmmm    mmmmmmmmmmmmmmmmm",
                          "mmmmmm   mmmmmmmmmmmmmmmmm",
                          "mmmmmmm  mmmmmmmmmmmmmmmmm",
                          "mmmmmmm  mmmmmmmmmmmmmmmmm",
                          "mmmmmmm  mmmmmmmmmmmmmmmmm",
                          "mmmmmmmm mmmmmmmmmmmmmmmmm",
                          "mmmmmmmm mmmmmmmmmmmmmmmmm",
                          "mmmmmmmm mmmmmmmmmmmmmmmmm",
                          "mmmmmmmm  mmmmmmmmmmmmmmmm",
                          "mmmmmmmm   mmmmmmmmmmmmmmm",
                          "mmmmmmmmmm  mmmmmmmmmmmmmm",
                          "mmmmmmmmmmm  mmmmmmmmmmmmm",
                          "m       mmmm mmmmmmmmmmmmm",
                          "m JKKLm mmmm mmmmmmmmmmmmm",
                          "m MccNm m    mmmmmmmmmmmmm",
                          "m MrrNm   m        mmmmmmm",
                          "m MrrrKKKKLmmmJKKL mmmmmmm",
                          "m MrrrrrcccKKKcccN mmmmmmm",
                          "m MrrrrrrrrrrrrrrN mmmmmmm",
                          "m MrrrrrrrrrrPPPPQ mmmmmmm",
                          "m OPrrrPPPPPQWWWWW mmmmmmm",
                          "m WWOPQWWWWWW      mmmmmmm",
                          "m   WDW           mmmmmmmm",
                          "mmm     mmmm     mmmmmmmmm",
                          "mmmmmmmmmmmmm   mmmmmmmmmm",
                          "mmmmmmmmmmmmmm  mmmmmmmmmm",
                          "mmmmmmmmmmmmmm  mmmmmmmmmm",
                          "mmmmmmmmmmmmm   mmmmmmmmmm",
                          "mmmmmmmmmmmmm   mmmmmmmmmm",
                          "mmmmmmmmmmmmmm  mmmmmmmmmm",
                          "mmmmmmmmmmmmmm  mmmmmmmmmm",
                          "mmmmmmmmmmmmmmmmmmmmmmmmmm"]);
    
    MapConfig.create({id:MapConstants.TITANS_TUNNEL, numTilesets:1, height:56, width:26, 
                      start:MapCoordsAbsolute.create({y:28, x:14}), hasBattles:true})
              .setMapping($.extend({}, mapping, {
                "n" : MapTile.create({cssClasses:"mountain other"})
               }))
              .addTileset(["  nm             ",
                           " m..m      mn     ",
                           "n....mn   m..m    ",
                           "mmn  >m   nm.m    ",
                           "m....nn   m.nmm   ",
                           "n.....m  m....mm  ",
                           "n...mmnnm..n...mm ",
                           "mnm..m......m..m  ",
                           "mnm.....mnmn...mn ",
                           " mn..nnm  m...nm  ",
                           "  mm..m   n.mn.nmn",
                           "  m..mn  m.....nm ",
                           "mn..nm  n.....mn  ",
                           "m...n  m.....n    ",
                           "n..m  nmmn.>mmm   ",
                           " m.m  nmnmmnn     ",
                           " m.mm             ",
                           " n...nmnnm        ",
                           " m..JKKKKLn       ",
                           " n..MccccN.m      ",
                           " n..OPPPPQ.m      ",
                           "  m.RRRRDR.n      ",
                           "  n.......m       ",
                           "   mnmnnnn        "]);
  };

  return {
    init : init
  };
});