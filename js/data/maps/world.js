define(/* WorldMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var rowIndex = -1;

  var mapOptions = {
    wrapsX: true,
    wrapsY: true
  };

  var sections = [];
  var SECTIONS_PER_ROW = 8;
  var Transport = MovementConstants.Transportation;

  var tiles = {
      "." : Map.newTile({y:3, x:8, desc:"plains"}).passableBy(Transport.Foot),
      "..": Map.newTile({y:0 ,x:13, desc:"town empty"}).passableBy(Transport.Foot),

      "BR": Map.newTile({y:5, x:3, desc:"bridge"}), // initially not passable
      "CV": Map.newTile({y:5, x:5, desc:"cave"}).passableBy(Transport.Foot),
      "C1": Map.newTile({y:0, x:16, desc:"castle upper left"}),
      "C2": Map.newTile({y:0, x:17, desc:"castle upper right"}),
      "C3": Map.newTile({y:1, x:16, desc:"castle lower left"}).passableBy(Transport.Foot),
      "C4": Map.newTile({y:1, x:17, desc:"castle lower right"}).passableBy(Transport.Foot),
      "CL": Map.newTile({y:3, x:15, desc:"crescent lake"}).passableBy(Transport.Foot),
      "CO": Map.newTile({y:2, x:13, desc:"coneria town"}).passableBy(Transport.Foot),
      "D1": Map.newTile({y:4, x:13, desc:"docks upper left"}).passableBy(Transport.Foot),
      "D2": Map.newTile({y:4, x:14, desc:"docks upper middle"}).passableBy(Transport.Foot),
      "D3": Map.newTile({y:4, x:15, desc:"docks upper right"}).passableBy(Transport.Foot),
      "D4": Map.newTile({y:5, x:13, desc:"docks lower left"}).passableBy(Transport.Foot),
      "D5": Map.newTile({y:5, x:15, desc:"docks lower right"}).passableBy(Transport.Foot),
      "EL": Map.newTile({y:3, x:13, desc:"elfland"}).passableBy(Transport.Foot),
      "GA": Map.newTile({y:3, x:14, desc:"gaia"}).passableBy(Transport.Foot),
      "LF": Map.newTile({y:2, x:13, desc:"lefein"}).passableBy(Transport.Foot),
      "M1": Map.newTile({y:4, x:16, desc:"mirage tower upper left"}),
      "M2": Map.newTile({y:4, x:17, desc:"mirage tower upper right"}),
      "M3": Map.newTile({y:5, x:16, desc:"mirage tower lower left"}).passableBy(Transport.Foot),
      "M4": Map.newTile({y:5, x:17, desc:"mirage tower lower right"}).passableBy(Transport.Foot),
      "ML": Map.newTile({y:3, x:14, desc:"melmond"}).passableBy(Transport.Foot),
      "O" : Map.newTile({y:5, x:1, desc:"hole"}).passableBy(Transport.Foot),
      "ON": Map.newTile({y:3, x:14, desc:"onrac"}).passableBy(Transport.Foot),
      "PR": Map.newTile({y:2, x:13, desc:"pravoka"}).passableBy(Transport.Foot),
      "T1": Map.newTile({y:0, x:14, desc:"temple of fiends upper middle"}),
      "T2": Map.newTile({y:0, x:15, desc:"temple of fiends upper right"}),
      "T3": Map.newTile({y:1, x:13, desc:"temple of fiends lower left"}).passableBy(Transport.Foot),
      "T4": Map.newTile({y:1, x:14, desc:"temple of fiends lower middle"}).passableBy(Transport.Foot),
      "T5": Map.newTile({y:1, x:15, desc:"temple of fiends lower right"}).passableBy(Transport.Foot),
      "V1": Map.newTile({y:2, x:16, desc:"gurgu volcano upper left"}).passableBy(Transport.Foot),
      "V2": Map.newTile({y:2, x:17, desc:"gurgu volcano upper right"}).passableBy(Transport.Foot),
      "V3": Map.newTile({y:3, x:16, desc:"gurgu volcano lower left"}).passableBy(Transport.Foot),
      "V4": Map.newTile({y:3, x:17, desc:"gurgu volcano lower right"}).passableBy(Transport.Foot),
      "WF": Map.newTile({y:5, x:14, desc:"waterfalls"}).passableBy(Transport.Canoe),
      "^-": Map.newTile({y:2, x:10, desc:"coneria castle upper left"}),
      "-^": Map.newTile({y:2, x:11, desc:"coneria castle upper right"}),
      "[-": Map.newTile({y:3, x:10, desc:"coneria castle middle left"}),
      "-]": Map.newTile({y:3, x:11, desc:"coneria castle middle right"}),
      "[_": Map.newTile({y:4, x:10, desc:"coneria castle lower left"}).passableBy(Transport.Foot),
      "_]": Map.newTile({y:4, x:11, desc:"coneria castle lower right"}).passableBy(Transport.Foot),
      "+-": Map.newTile({y:0, x:10, desc:"wall corner upper left"}),
      "-+": Map.newTile({y:0, x:11, desc:"wall corner upper right"}),
      "+_": Map.newTile({y:5, x:9, desc:"wall corner lower left"}),
      "_+": Map.newTile({y:5, x:12, desc:"wall corner lower right"}),
      "+.": Map.newTile({y:5, x:7, desc:"wall corner grass lower left"}),
      ".+": Map.newTile({y:5, x:8, desc:"wall corner grass lower right"}),
      "-/": Map.newTile({y:1, x:9, desc:"wall upper left outer"}),
      "|-": Map.newTile({y:1, x:10, desc:"wall upper left inner"}),
      "-|": Map.newTile({y:1, x:11, desc:"wall upper right inner"}),
      "/-": Map.newTile({y:1, x:12, desc:"wall upper right outer"}),
      "/.": Map.newTile({y:2, x:9, desc:"wall middle left"}),
      "./": Map.newTile({y:2, x:12, desc:"wall middle right"}),
      "/,": Map.newTile({y:3, x:9, desc:"wall middle lower left"}),
      ",/": Map.newTile({y:3, x:12, desc:"wall middle lower right"}),
      "/:": Map.newTile({y:4, x:9, desc:"wall lower left"}),
      ":/": Map.newTile({y:4, x:12, desc:"wall lower right"}),
      "--": Map.newTile({y:4, x:8, desc:"wall upper"}),
      "_|": Map.newTile({y:5, x:10, desc:"wall gate left"}),
      "|_": Map.newTile({y:5, x:11, desc:"wall gate right"}),

      // all ocean/mountain/forest tiles have descs
      // in the direction the tile points
      "f" : Map.newTile({y:1, x:1, desc:"forest"}).passableBy(Transport.Foot),
      "f1": Map.newTile({y:0, x:0, desc:"forest upper left"}).passableBy(Transport.Foot),
      "f2": Map.newTile({y:0, x:1, desc:"forest upper"}).passableBy(Transport.Foot),
      "f3": Map.newTile({y:0, x:2, desc:"forest upper right"}).passableBy(Transport.Foot),
      "f4": Map.newTile({y:1, x:0, desc:"forest left"}).passableBy(Transport.Foot),
      "f5": Map.newTile({y:1, x:2, desc:"forest right"}).passableBy(Transport.Foot),
      "f6": Map.newTile({y:2, x:0, desc:"forest lower left"}).passableBy(Transport.Foot),
      "f7": Map.newTile({y:2, x:1, desc:"forest lower"}).passableBy(Transport.Foot),
      "f8": Map.newTile({y:2, x:2, desc:"forest lower right"}).passableBy(Transport.Foot),
      "m" : Map.newTile({y:1, x:7, desc:"mountains"}),
      "m1": Map.newTile({y:0, x:6, desc:"mountains upper left"}),
      "m2": Map.newTile({y:0, x:7, desc:"mountains upper"}),
      "m3": Map.newTile({y:0, x:8, desc:"mountains upper right"}),
      "m4": Map.newTile({y:1, x:6, desc:"mountains left"}),
      "m5": Map.newTile({y:1, x:8, desc:"mountains right"}),
      "m6": Map.newTile({y:2, x:6, desc:"mountains lower left"}),
      "m7": Map.newTile({y:2, x:7, desc:"mountains lower"}),
      "m8": Map.newTile({y:2, x:8, desc:"mountains lower right"}),
      "w" : Map.newTile({y:1, x:4, desc:"ocean"}).passableBy(Transport.Ship),
      "w1": Map.newTile({y:0, x:3, desc:"coastline upper left"}).passableBy(Transport.Foot),
      "w2": Map.newTile({y:0, x:4, desc:"coastline upper"}).passableBy(Transport.Ship),
      "w3": Map.newTile({y:0, x:5, desc:"coastline upper right"}).passableBy(Transport.Foot),
      "w4": Map.newTile({y:1, x:3, desc:"coastline left"}).passableBy(Transport.Ship),
      "w5": Map.newTile({y:1, x:5, desc:"coastline right"}).passableBy(Transport.Ship),
      "w6": Map.newTile({y:2, x:3, desc:"coastline lower left"}).passableBy(Transport.Foot),
      "w7": Map.newTile({y:2, x:4, desc:"coastline lower"}).passableBy(Transport.Ship),
      "w8": Map.newTile({y:2, x:5, desc:"coastline lower right"}).passableBy(Transport.Foot),

      "d" : Map.newTile({y:5, x:6, desc:"desert"}).passableBy(Transport.Foot),
      "d1": Map.newTile({y:3, x:6, desc:"desert upper left"}).passableBy(Transport.Foot),
      "d2": Map.newTile({y:3, x:7, desc:"desert upper right"}).passableBy(Transport.Foot),
      "d3": Map.newTile({y:4, x:6, desc:"desert lower left"}).passableBy(Transport.Foot),
      "d4": Map.newTile({y:4, x:7, desc:"desert lower right"}).passableBy(Transport.Foot),
      "g" : Map.newTile({y:5, x:0, desc:"grass"}).passableBy(Transport.Foot),
      "g1": Map.newTile({y:3, x:0, desc:"grass upper left"}).passableBy(Transport.Foot),
      "g2": Map.newTile({y:3, x:1, desc:"grass upper right"}).passableBy(Transport.Foot),
      "g3": Map.newTile({y:4, x:0, desc:"grass lower left"}).passableBy(Transport.Foot),
      "g4": Map.newTile({y:4, x:1, desc:"grass lower right"}).passableBy(Transport.Foot),
      "r" : Map.newTile({y:5, x:2, desc:"river"}).passableBy(Transport.Canoe),
      "r1": Map.newTile({y:3, x:2, desc:"river upper left"}).passableBy(Transport.Canoe),
      "r2": Map.newTile({y:3, x:3, desc:"river upper right"}).passableBy(Transport.Canoe),
      "r3": Map.newTile({y:4, x:2, desc:"river lower left"}).passableBy(Transport.Canoe),
      "r4": Map.newTile({y:4, x:3, desc:"river lower right"}).passableBy(Transport.Canoe),
      "s" : Map.newTile({y:5, x:4, desc:"swamp"}).passableBy(Transport.Foot),
      "s1": Map.newTile({y:3, x:4, desc:"swamp upper left"}).passableBy(Transport.Foot),
      "s2": Map.newTile({y:3, x:5, desc:"swamp upper right"}).passableBy(Transport.Foot),
      "s3": Map.newTile({y:4, x:4, desc:"swamp lower left"}).passableBy(Transport.Foot),
      "s4": Map.newTile({y:4, x:5, desc:"swamp lower right"}).passableBy(Transport.Foot)
  };

  var addSection = function(map) {
    if (!sections[rowIndex] || sections[rowIndex].length % SECTIONS_PER_ROW === 0) {
      sections[++rowIndex] = [];
    }
    sections[rowIndex].push(map);
  };

  var allWater = function() {
    var s = [];
    for (var i = 0; i < 32; i++) {
      s.push("w");
    }
    return s.join("  ");
  };

  var init = function() {

    addSection(
      Map.create("WORLD-MAP-0-0")
         .repeatSprites(allWater(), 16)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w7 w7 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  .  .  w6 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  .  .  m1 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m1 m2 m3 .  .  m1 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m1 m  m  m5 .  .  m6 m7 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m1 m  m  m  m8 g1 g  g  g2 m6 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  m4 m  m  m5 g1 g  g  g  g  g  g2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  m1 m  m  m  m8 g3 g  g  g  g  g  g2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  m4 m  m  m8 g1 g  g  g  g  g  g  g4")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  m1 m  m  m5 g1 g  g  g  g  g  g4 m1 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f2 f3 m4 m  m  m5 g3 g  g  g  g  g  g2 m4 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f5 m4 m  m  m  m3 g3 g  g  g  g  g2 m6 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f5 m4 m  m  m  m  m3 g3 g  g  g  g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f5 m6 m  m  m  m  m  m2 m2 m3 g3 g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f3 m6 m  m  m  m  m  m  m  m2 m2 m2 m3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w8 f4 f  f  f  f  f  f  f  f3 m6 m  m  m  m  m  m  m  m  m  m")
    );
    addSection(
      Map.create("WORLD-MAP-0-1")
         .repeatSprites(allWater(), 15)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w8 .  .  .")
         .sprites("w7 w7 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 .  .  .  .  .  .  m1 m2 m2")
         .sprites("m2 m2 m2 m3 w6 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w8 m1 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m")
         .sprites("m  m  m  m  m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m7 m7 m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m8 r1 r  r  r  r  r2 m6 m7 m7 m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m6 m  m5 r1 r  r  r  r  r  r  r  r  r  r2 m6 m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites(".  m4 m5 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r2 m6 m7 m7 m7 m  m  m  m  m  m  m  m  m")
         .sprites("m1 m  m5 r3 r  r  r  r  r  r  r  r  r  r4 m1 m2 m2 m3 r3 r  r  r  r2 m4 m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m2 m2 m2 m3 r3 r  r  r  r  r4 m1 m  m  m  m  m2 m2 m2 m3 r  m4 m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m  m  m  m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m  m5 r  m4 m  m  m  m  m  m  m  m")
         .sprites("m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m  m  m  m  m  m")
         .sprites("g2 m6 m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m  m  m  m  m  m")
         .sprites("g4 f1 f2 f2 f2 f3 m6 m7 m  m  m  m  m  m  m  m  m  m  m7 m7 m7 m7 WF m7 m  m  m  m  m  m  m  m")
         .sprites(".  f6 f7 f  f  f  f2 f3 m6 m7 m  m  m  m  m  m  m  m5 r1 r  r  r  r  r2 m4 m  m  m  m  m  m  m")
         .sprites("m2 m2 m3 f6 f  f  f  f  f2 f3 m6 m7 m  m  m  m  m  m5 r  r  r  r  r  r  m4 m  m  m  m  m  m  m"));

    addSection(
      Map.create("WORLD-MAP-0-2")
         .repeatSprites(allWater(), 15)
         .sprites("w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 .  .  .  .  .  .  .  .  .  .  w1 w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m8 .  .  .  w1 w2 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m7 m7 m8 w1 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m7 m8 w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m8 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-0-3")
         .repeatSprites(allWater(), 24)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 s1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f7 f8 w1"));

    addSection(
      Map.create("WORLD-MAP-0-4")
         .repeatSprites(allWater(), 13)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w7 w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 s1 s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 s1 s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w8 s1 s  s  s  s  s  s  s4 m1 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 s1 s  s  s  s  s  s  s  s  s  s  m1 m2 m2 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w8 s1 s  s  s  s  s  s  s  s  s  s  s  s  s4 m6 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w7 w8 s1 s  s  s  s  s  s  s  s  s  s  s  s4 w1 w2 w2 w2 w2 w2 w2")
         .sprites("w  w  w  w  w  w  w  w  w  w8 f1 f3 s  s  s  s  s  s  s  s  s  s  s  s4 w1 w  w  w7 w7 w7 w7 w7")
         .sprites("w  w  w  w  w  w  w  w8 f1 f2 f  f5 s3 s  s  s  s  s  s  s  s  s4 w1 w2 w  w7 w8 f1 f2 f2 f2 f2")
         .sprites("w  w  w  w  w  w  w8 f1 f  f  f  f  f2 f2 f3 s3 s  s  s4 w1 w2 w2 w  w  w8 f1 f2 f  f  f  f  f")
         .sprites("w  w  w7 w7 w7 w8 f1 f  f  f  f  f  f  f7 f8 w1 w2 w2 w2 w  w  w  w  w8 f1 f  f  f  f  f  f  f")
         .sprites("w7 w8 s1 s  s2 f1 f  f  f  f  f  f  f8 w1 w2 w  w  w  w  w  w  w  w8 f1 f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s  s4 f4 f  f  f  f7 f7 f8 w1 w  w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s4 f1 f2 f  f  f  f8 w1 w2 w2 w  w  w  w  w  w  w  w  w7 w8 f6 f7 f7 f7 f7 f7 f7 f7 f7 f7")
         .sprites("f2 f2 f2 f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w7 w8 s1 s  s  s  s  s  s  s  s4 m1 m2 m2")
         .sprites("f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w7 w7 w7 w8 s1 s  s  s  s  s  s  s  s  s4 m1 m  m  m")
         .sprites("f  f  f  f  f7 f8 w1 w  w  w  w  w  w7 w8 s1 s  s  s  s  s  s  s  s  s  s  s4 m1 m2 m  m  m  m")
         .sprites("f7 f7 f7 f8 w1 w2 w  w  w  w  w  w8 s1 s  s  s  s  s  s  s  s  s  s  s4 m1 m2 m  m  m  m  m  m")
         .sprites("w2 w2 w2 w2 w  w  w  w  w  w  w8 s1 s  s  s  s  s  s  s  s  s  s  s4 m1 m  m  m  m  m  m  m  m"));

    addSection(
      Map.create("WORLD-MAP-0-5")
         .repeatSprites(allWater(), 13)
         .sprites("w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s2 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s2 w6 w7 w7 w7 w7 w7 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m3 s3 s  s  s  s  s  s  s2 m1 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m2 m3 s3 s  s  s  s  s  m4 m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m7 m  m  m3 s  s  s  s  s  m6 m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w3 m6 m  m5 s  s  s  s  s  s2 m6 m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w7 w7 w3 m6 m8 s3 s  s  s  s  s  s2 m4 m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f2 f2 f2 f2 f2 f3 s  s  s  s  s  s4 m4 m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f8 s3 s  s  s4 m1 m2 m  m  m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f8 m1 m2 m2 m2 m2 m  m  m  m  m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f8 m1 m  m  m  m  m  m  m  m  m  m  m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f5 m1 m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f7 f8 m6 m7 m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m3 d1 d  d  d  d  d  d2 m6 m7 m7 m7 m7 m  m  m  m  m  m5 .  w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 d  d  d  d  d  d  d  d  d  d  d  d2 m6 m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  m6 m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 d3 d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m7 m8 w4 w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-0-6")
         .repeatSprites(allWater(), 23)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w  w  w  w7 w8 m1 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m3 w6 w7 w8 m1 m2 m  m  m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 m1 m  m  m2 m2 m2 m  m  m  m8 GA GA")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2 m  m  m  m  m  m  m  m  m8 GA GA m1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m7 m7 m  m  m  m  m  m  m8 g1 g4 m1 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m8 w1 w3 m4 m  m  m7 m7 m8 g1 g4 m1 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  m1 m  m8 w1 w  w8 m4 m  m8 g1 g  g  g4 m1 m  m  m"));

    addSection(
      Map.create("WORLD-MAP-0-7")
         .repeatSprites(allWater(), 17)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w7 w7 w8 .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 .  m1 m3 .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w7 w8 m1 m2 m7 m8 .  .  .  .  .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w7 w7 w8 m1 m2 m  m8 .  .  .  .  .  .  .  w1 w2 w2 w3 .  w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 m1 m2 m2 m  m  m5 .  .  .  .  w1 w2 w2 w2 w  w  w  w  w3 .  w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m  m  m  m  m  m8 .  .  .  w1 w  w  w  w  w  w  w  w  w  w3 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m8 .  .  w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m  m  m7 m8 .  .  w1 w  w  w  w  w8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m1 m  m8 w1 w2 w2 w2 w7 w  w  w7 w8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m8 w1 w  w  w7 w8 .  w6 w8 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 w1 w  w  w8 .  .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 w6 w7 w8 .  .  w1 w3 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m3 .  .  .  w1 w  w  w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-1-0")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f  f  f  f  f3 m4 m  m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f  f5 m4 m  m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f  f  f  f  f  f  f5 m6 m  m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w7 w7 w  w  w  w  w3 f6 f  f  f  f  f  f  f  f  f  f3 m6 m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w8 .  .  w6 w  w  w  w  w3 f4 f  f  f  f  f  f  f  f  f  f3 m6 m7 m7 m7 m7 m7 m  m")
         .sprites("w  w  w7 w8 .  .  w1 w2 w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f  f8 w1 w2 w2 w2 w2 w3 m6 m")
         .sprites("w  w8 .  .  .  w1 w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w3 m6")
         .sprites("w5 .  .  w1 w2 w  w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w5 .")
         .sprites("w5 .  .  w4 w  w  w  w  w  w  w  w  w8 f4 f  f  f  f  f  f7 f8 w1 w  w  w  w  w  w  w  w  w5 m1")
         .sprites("w5 .  .  w4 w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f8 w1 w2 w  w  w  w  w  w  w  w  w  w8 m4")
         .sprites("w5 .  w1 w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w8 m1 m")
         .sprites("w5 .  w2 w  w  w  w  w  w  w  w  w8 f4 f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w7 w8 m1 m  m")
         .sprites("w5 .  w6 w  w  w  w  w  w  w  w8 f1 f  f  f  f8 w1 w  w  w  w  w  w  w  w  w7 w8 m1 m2 m  m  m")
         .sprites("w5 .  .  w4 w  w  w  w  w  w8 f1 f  f  f7 f8 w1 w  w  w  w  w  w  w  w  w8 m1 m2 m  m  m  m  m")
         .sprites("w5 .  .  w6 w  w  w  w7 w8 f1 f  f7 f8 w1 w2 w  w  w  w  w  w7 w7 w7 w8 m1 m  m  m  m  m  m  m")
         .sprites("w  w3 .  .  w6 w7 w8 .  .  f6 f8 w1 w2 w  w  w  w  w  w  w8 m1 m2 m2 m2 m  m  m  m  m  m7 m7 m7")
         .sprites("w  w  w3 .  .  .  .  .  w1 w2 w2 w  w  w  w  w  w  w7 w8 m1 m  m  m  m  m  m  m  m  m8 d1 d2 f1")
         .sprites("w  w  w  w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w8 m1 m2 m  m  m  m7 m7 m7 m7 m7 m8 d1 d  d4 f4")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m7 m8 d1 d  d  d  d  d2 d3 d4 f1 f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m8 d1 d  d  d  d  d  d  d  d2 f1 f  f8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m8 d1 d  d  d  d  d  d  d  d  d  f6 f8 d1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m8 d1 d  d  d  d  d  d  d  d  d  d  d2 d1 d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m6 m7 m8 .  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 f1 f2 f2 f2 f3 d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f5 d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f5 d3 d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d  d"));

    addSection(
      Map.create("WORLD-MAP-1-1")
         .sprites("m  m  m  m3 f6 f  f  f  f  f  f2 f3 m6 m  m  m  m  m5 r3 r  r  r  r  r4 m4 m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m3 f4 f  f  f  f  f  f  f3 m6 m7 m  m  m  m3 r3 r  r4 m1 m2 m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m5 f4 f  f  f  f  f  f  f  f2 f3 m4 m  m  m  m3 r  m1 m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m5 f4 f  f  f  f  f  f  f  f  f5 m4 m  m  m  m5 r  m4 m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m8 f4 f  f  f  f  f  f  f  f  f5 m4 m  m  m  m5 r  m4 m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m5 f1 f  f  f  f  f  f  f  f  f  f5 m4 m  m  m  m5 r  m4 m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m5 f4 f  f  f  f  f  f  f  f  f  f5 m6 m7 m  m  m5 r  m6 m7 m7 m7 m  m  m  m  m  m  m")
         .sprites("m  m  m  m5 f4 f  f  f  f  f  f  f  f  f  f  f2 f3 m4 m  m5 r3 r  r  r  r2 m4 m  m  m  m  m  m")
         .sprites("m  m  m  m5 f6 f  f  f  f  f  f  f  f  f  f  f  f5 m4 m  m  m2 m2 m2 m3 r  m4 m  m  m  m  m  m")
         .sprites("m  m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f  f5 m4 m  m  m  m  m  m5 r  m4 m  m  m  m  m  m")
         .sprites("m  m  m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f5 m6 m7 m  m  m  m  m5 r  m6 m7 m7 m  m  m  m")
         .sprites("m  m  m  m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f2 f3 m6 m  m  m  m5 r3 r  r  r2 m4 m  m  m")
         .sprites("m  m  m  m  m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f  f3 m4 m  m  m  m2 m2 m3 r  m4 m  m  m")
         .sprites("m  m  m  m  m  m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f5 m6 m  m  m  m  m  m5 r  m4 m  m  m")
         .sprites("m  m  m  m  m  m  m  m  m  m3 f6 f7 f7 f  f  f  f  f  f  f  f3 m4 m  m  m  m  m8 r  m4 m  m  m8")
         .sprites("m7 m7 m7 m7 m7 m  m  m  m  m  m2 m2 m3 f6 f7 f7 f7 f  f  f  f5 m6 m  m  m  m5 r1 r4 m4 m  m5 f1")
         .sprites("f3 d1 d  d  d2 m6 m7 m7 m  m  m  m  m  m2 m2 m2 m3 f6 f  f  f  f3 m6 m  m  m5 r  m1 m  m  m5 f4")
         .sprites("f5 d  d  d  d  d  d  d2 m6 m  m  m  m  m  m  m  m  m3 f6 f  f  f  f3 m4 m  m5 r  m4 m  m  m8 f4")
         .sprites("f8 d  d  d  d  d  d  d  d2 m6 m7 m  m  m  m  m  m  m  m3 f4 f  f  f5 m6 m  m5 r  m4 m  m5 f1 f")
         .sprites("d1 d  d  d  d  d  d  d  d  d  d2 m6 m  m  m  m  m  m  m5 f6 f  f  f  f3 m4 m5 r  m4 m  m5 f4 f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m  m  m  m  m3 f4 f  f  f8 m6 m8 r  m4 m  m8 f4 f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m  m  m5 f4 f  f5 r1 r  r  r4 m4 m5 f1 f  f8")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m  m  m5 f4 f  f5 r  m1 m2 m2 m  m8 f4 f5 w1")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m  m  m8 f4 f  f5 r  m4 m  m  m8 f1 f  f5 w4")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m  m5 f1 f  f  f5 r  m4 m  m5 f1 f  f7 f8 w4")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m  m  m  m  m5 f4 f  f  f5 r  m4 m  m5 f4 f5 ON ON w4")
         .sprites("d  d  d  d  d  d  d  d  d  d  d4 m1 m  m  m  m  m  m  m5 f4 f  f  f5 r  m4 m  m5 f4 f5 ON ON w4")
         .sprites("d  d  d  d  d  d  d  d  d  d4 m1 m  m  m  m  m  m  m  m8 f4 f  f  f5 r  m4 m  m5 f4 f  f3 w1 w")
         .sprites("d  d  d  d  d  d  d4 m1 m2 m2 m  m  m  m  m  m  m7 m8 f1 f  f  f7 f8 r  m4 m  m8 f4 f  f5 w4 w")
         .sprites("d  d  d  d  d  d  m1 m  m  m  m  m  m  m  m  m8 f1 f2 f  f  f5 r1 r  r4 m6 m8 f1 f  f  f5 w4 w")
         .sprites("d  d  d  d  d  d  m4 m  m  m  m  m  m  m  m5 f1 f  f  f  f  f5 r  f1 f2 f2 f2 f  f  f  f5 w4 w")
         .sprites("d  d  d  d  d  d4 m6 m  m  m  m  m  m  m  m5 f4 f  f  f  f  f5 r  f4 f  f  f  f  f  f  f5 w6 w"));

    addSection(
      Map.create("WORLD-MAP-1-2")
         .sprites("m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m3 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m2 m3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m2 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m7 m7 m7 m7 m7 m8 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m8 w1 w2 w2 w2 w2 w3 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m8 w1 w  w  w  w  w  w  w2 w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 w1 w  w  w  w  w  w  w  w  w  w2 w3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m8 w6 w  w  w  w  w  w  w  w  w  w  w5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f1 f2 f3 w6 w  w  w  w  w  w  w  w  w  w5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f3 w6 w  w  w  w  w  w  w  w  w5 .  w4 w  w  w  w  w  w  w  w  w7 w7 w7 w7 w  w  w  w")
         .sprites("f  f  f  f  f3 w6 w  w  w  w  w  w  w  w5 .  w6 w  w  w  w  w  w  w  w  w3 .  f1 f3 w6 w  w  w")
         .sprites("f  f  f  f  f  f3 w4 w  w  w  w  w  w  w5 g1 g2 w6 w  w  w  w  w  w  w  w  w3 f6 f5 O  w6 w7 w")
         .sprites("f  f  f  f  f  f5 w4 w  w  w  w  w  w  w5 g3 O  g2 w4 w  w  w  w  w  w  w  w  w3 f6 f2 f2 f3 w6")
         .sprites("f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w3 g3 g4 w4 w  w  w  w  w  w  w  w  w  w3 f6 f  f  f3")
         .sprites("f  f  f7 f7 f8 w1 w  w  w  w  w  w  w  w  w5 g1 g2 w4 w  w  w  w  w  w  w  w  w  w  w3 f6 f7 f")
         .sprites("f7 f8 w1 w2 w2 w  w  w  w  w  w  w  w  w  w5 g3 g4 w4 w  w  w  w  w  w  w  w  w  w  w  w2 w3 f6")
         .sprites("w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w  w  w  w7 w7 w7 w7 w7 w7 w7 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  s  s  s  s  s  w6 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 s3 s  s  s  O  s2 w6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 s3 s  s  s2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 s3 s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-1-3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f  f  f  f8 w1 w2 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f8 w1 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f8 w1 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  f6 f7 f8 w1 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w1 w2 w  w  w  w  w7 w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w  w  w  w  w  w8 f1 f2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f5 m1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f1 f  f  f5 m6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f4 f  f  f8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f7 f8 s1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m1 m3 s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m5 s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m5 s3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m")
         .sprites("w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m  m")
         .sprites("O  w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m")
         .sprites("f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m4")
         .sprites("f6 f7 f8 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6")
         .sprites("w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8")
         .sprites("w6 w7 w  w  w  w  w  w  w3 O  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 w1")
         .sprites("s  s2 w6 w7 w7 w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s2 w6 w  w  w  w  w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w3 s3 s  s4 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 w4 w  w  w")
         .sprites("w  w  w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w8 .  w1 w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-1-4")
         .sprites("w  w  w  w  w7 w7 w  w7 w7 w8 s1 s  s4 m1 m2 m2 m3 f1 f2 f3 m1 m2 m2 m  m  m  m7 m7 m7 m7 m7 m")
         .sprites("w  w  w  w8 s  s  r  f1 f2 f3 s3 s4 m1 m  m  m  m8 f4 f  f5 m4 m  m  m  m  m8 f1 f2 f2 f2 f3 m6")
         .sprites("w  w  w8 s1 r1 r  r4 f4 f  f  f3 m1 m  m  m  m8 f1 f  f  f8 m6 m7 m7 m7 m8 f1 f  f  f  f  f  f3")
         .sprites("w7 w8 f1 f3 r  f1 f2 f  f  f  f8 m4 m  m  m8 f1 f  f  f8 w1 w2 w2 w3 .  .  f6 f7 f  f  f  f  f")
         .sprites("f1 f2 f  f5 r  f6 f7 f7 f7 f8 m1 m  m  m5 f1 f  f  f5 w1 w  w  w  w  w2 w2 w2 w3 f6 f  f  f  f")
         .sprites("f  f  f  f5 r3 r  r  r2 m1 m2 m  m  m  m8 f4 f  f  f5 w4 w  w  w  w  w  w  w  w  w3 f6 f  f  f")
         .sprites("f  f7 f7 f8 m1 m2 m3 r  m4 m  m  m  m8 f1 f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w3 f6 f7 f7")
         .sprites("m2 m2 m2 m2 m  m  m8 r  m6 m  m  m5 f1 f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2")
         .sprites("m  m  m  m  m  m5 r1 r  r2 m4 m  m5 f4 f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m6 m7 m7 m7 m  m5 r3 r  r4 m4 m  m8 f4 f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s2 m6 m  m2 m2 m2 m  m5 f1 f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s2 m6 m  m  m  m  m5 f4 f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  C1 C2 s  s  s2 m6 m7 m7 m7 m8 f6 f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  C3 C4 s  s  s  w1 w2 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s4 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m3 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m6 m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-1-5")
         .sprites("m  m  m3 d3 d  d  d  d  d  d  d  d  d  d  d  d  f1 f2 f3 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m2 m2 m2 m3 d3 d  d  d  d  d  d  d  d  f4 f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m6 m  m  m  m  m  m  m2 m2 m2 m3 d3 d  d  d  d4 f4 f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f3 m6 m7 m7 m  m  m  m  m  m  m  m2 m2 m2 m3 f1 f  f  f  f3 w6 w7 w7 w7 w7 w  w  w  w  w  w  w")
         .sprites("f  f2 f2 f3 m6 m7 m7 m  m  m  m  m  m  m  m5 f4 f  f  f  f  f2 f2 f2 f2 f3 w6 w7 w7 w7 w7 w7 w7")
         .sprites("f  f  f  f  f2 f2 f3 m6 m7 m7 m7 m7 m7 m7 m8 f4 f  f  f  f  f  f  f  f  f  f3 g1 g  g  g  g  g2")
         .sprites("f7 f7 f7 f7 f7 f7 f  f2 f2 f2 f2 f2 f2 f2 f2 f  f  f  f  f  f  f  f  f  f  f5 g3 g  g  g  g  g4")
         .sprites("w2 w2 w2 w2 w2 w3 f6 f  f  f  f  f  f  f  f  f  f  f  f7 f7 f7 f7 f7 f7 f7 f8 g1 g  g2 w1 w2 w2")
         .sprites("w  w  w  w  w  w  w3 f6 f  f  f  f  f  f  f  f  f  f8 w1 w2 w8 m1 m2 m2 m3 g1 g  g  g4 w4 w  w")
         .sprites("w  w  w  w  w  w  w  w3 f4 f  f  f  f  f  f  f  f8 w1 w  w8 m1 m  m  m  m5 g3 g  g2 w1 w  w  w")
         .sprites("w  w  w  w  w  w  w  w8 f4 f  f  f  f  f  f  f8 w1 w  w8 m1 m  m  m  m  m8 g1 g  g2 w4 w  w  w")
         .sprites("w  w  w  w  w  w  w5 .  f4 f  f  f  f  f  f5 w1 w  w  w3 m4 m  m  m8 g1 g  g  g  g  w4 w  w  w")
         .sprites("w  w  w  w  w  w  w  w3 f6 f  f  f  f  f  f8 w4 w  w  w5 m6 m  m5 g1 g  g  g  g  g4 w4 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w3 f6 f  f  f  f8 w1 w  w  w  w  w3 m4 m  m3 g3 g  g  g  g2 w6 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w3 f6 f7 f8 w1 w  w  w  w  w  w5 m4 m  m  m2 m3 g3 g  g  g2 w6 w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w  w  w  w  w  w  w8 m4 m  m  m  m  m2 m2 m2 m2 m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m  m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m7 m7 m7 m7 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m  m8 d1 d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w8 m1 m  m  m  m8 d1 d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w7 w7 w7 w7 w7 w7 w7 w7 w7 w8 m1 m2 m2 m2 m  m  m  m8 d1 d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w8 m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m  m  m  m7 m8 d1 d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w8 m1 m  m  m  m  m  m  m  m  m  m  m  m  m7 m7 m8 d1 d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w5 m1 m  m  m  m  m  m  m  m  m  m  m7 m7 m8 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w8 m4 m  m  m  m  m  m  m  m  m  m8 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w8 m1 m  m  m  m  m  m  m  m  m  m5 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("m1 m  m  m  m  m  m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("m6 m  m  m  m  m  m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w3 m6 m7 m  m  m  m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w2 w3 m6 m7 m7 m  m  m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d"));

    addSection(
      Map.create("WORLD-MAP-1-6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m8 w1 w  w8 m1 m  m8 g1 g  g4 m1 m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 w1 w  w8 m1 m  m8 g1 g4 m1 m2 m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m5 g1 g4 m1 m  m  m  m  m  m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m2 m2 m  m  m  m  m  m  m  m  m8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m  m  m  m  m  m  m  m  m  m  m8 w1")
         .sprites("w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m  m  m  m  m  m  m  m  m  m8 w1 w")
         .sprites(".  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m  m  m  m  m7 m8 w1 w  w")
         .sprites("w2 w2 w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w3 m4 m  m  m  m  m  m  m  m8 w1 w2 w  w  w")
         .sprites("w  w  w  w3 .  w6 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w8 m4 m  m  m7 m7 m  m  m8 w1 w  w  w  w  w")
         .sprites("w  w  w  w5 .  .  m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m8 w1 w3 m6 m8 w1 w  w  w  w  w  w")
         .sprites("w  w  w  w5 .  m1 m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w1 w  w  w3 w1 w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 m1 m  m  m  m  m7 m7 m7 m7 m7 m  m  m  m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  m1 m  m  m  m  m5 d1 d  d  d  d2 m6 m7 m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w7 w8 m4 m  m  m  m  m8 d  d  d  d  d  d  d2 m6 m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w")
         .sprites("w8 m1 m2 m  m  m7 m7 m8 d1 d  d  d  d  d  d  d  d2 m4 m  m  m  m  m3 w6 w  w  w  w  w  w  w  w")
         .sprites("m  m  m7 m7 m8 d1 d  d  d  d  d  d  d  d  d  d  d  m6 m  m  m  m  m  m3 w6 w7 w  w  w  w  w  w")
         .sprites("m  m8 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m  m  m5 f1 f3 w6 w7 w7 w  w  w")
         .sprites("m8 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m5 f4 f  f  f  f3 w6 w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m  m  m  m8 f4 f  f  f  f  f3 w6 w7")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m1 m  m  m  m7 m8 f1 f  f  f  f  f  f  f2 f2")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m1 m  m  m  m8 .  f1 f  f  f  f  f  f  f  f  f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m  m8 f1 f2 f  f  f  f7 f7 f7 f7 f7 f7 f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m1 m  m  m8 f1 f  f  f  f  f5 r1 r  r  r  r  r2 f6")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 f1 f  f  f  f  f  f5 r  r  r  r  r  r  r")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 f4 f  f  f  f  f  f5 r  r  r  r  r  r  r")
         .sprites("d  d  M1 M2 d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 f4 f  f  f  f  f  f5 r3 r  r  r  r  r  r")
         .sprites("d  d  M3 M4 d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 f4 f  f  f  f  f  f  f2 f3 r3 r  r  r  r")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 f6 f  f  f  f  f  f  f  f  f2 f2 f2 f2 f2")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m3 f6 f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m6 m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f  f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m  m  m  m3 f6 f  f  f  f  f  f  f  f  f  f7")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m  m2 m3 f6 f  f  f  f  f  f  f8 w1"));

    addSection(
      Map.create("WORLD-MAP-1-7")
         .sprites("m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w7 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f2 f2 f3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f  f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r2 f4 f  f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  f4 f  f  f  f  f  f  f3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  f4 f  f  f  f  f  f  f  f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r4 f4 f  f  f  f  f  f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f2 f  f  f  f  f  f  f  f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f  f  f  f  f  f  f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f7 f7 f7 f  f  f  f  f  f  f  f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f7 f7 f8 w1 w2 w3 f6 f7 f7 f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w2 w2 w2 w  w  w  w2 w2 w3 f6 f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-2-0")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f3 d3 d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f2 f2 f3 d3 d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f4 f  f  f  f  f  f2 f2 f2 f2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f7 f7 f7 f7 f7 f7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s1 s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3 s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  f1 f2 f2 f2 f3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f1 f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f4 f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  f6 f7 f7 f7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  g1 g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 g1 g  g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 g  g  g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 g  g  g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 g3 g  g  g  g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2 m2 m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-2-1")
         .sprites("d  d  d  d  d4 .  .  m6 m  m  m  m  m  m  m5 f6 f  f  f  f  f5 r  f4 f  f  f  f  f  f  f  f3 w6")
         .sprites("d  d  d4 f1 f2 f2 f2 f3 m6 m  m  m  m  m  m  m3 f6 f  f  f  f5 r  f4 f  f  f7 f7 f7 f7 f  f  f3")
         .sprites("f2 f2 f2 f  f  f  f  f  f3 m6 m7 m7 m  m  m  m  m3 f4 f  f  f5 r  f4 f  f8 w1 w2 w2 w3 f6 f7 f8")
         .sprites("f  f  f  f  f  f  f  f  f  f2 f2 f3 m6 m  m  m  m5 f4 f  f  f5 r  f4 f5 w1 w  w  w  w  w2 w2 w2")
         .sprites("f  f  f  f  f  f  f  f  f  f  f  f  f3 m6 m  m  m5 f6 f  f  f5 r  f4 f5 w4 w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f  f  f  f  f  f  f3 m4 m  m  m3 f4 f  f5 r  f4 f5 w6 w  w  w  w  w  w  w")
         .sprites("f7 f7 f7 f  f  f  f  f  f  f  f  f  f  f8 m4 m  m  m5 f4 f  f5 r  f4 f  f3 w6 w  w  w  w  w  w")
         .sprites("s  s  s2 f6 f7 f7 f7 f7 f7 f7 f7 f7 f8 m1 m  m  m  m8 f4 f  f8 r  f4 f  f  f3 w4 w  w  w  w  w")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s2 m4 m  m  m5 f1 f  f5 r1 r4 f4 f  f  f5 w4 w  w  w  w  w")
         .sprites("s3 s  s  s  s  s  s  s  s  s  s  s  s  m6 m  m  m5 f4 f  f5 r  f1 f  f  f  f5 w6 w  w  w  w  w")
         .sprites("f3 s3 s  s  s  s  s  s  s  s  s  s  s  s2 m6 m7 m8 f6 f7 f8 r  f4 f  f  f  f  f3 w4 w  w  w  w")
         .sprites("f  f3 s  r1 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r4 f4 f  f  f  f  f5 w6 w  w  w  w")
         .sprites("f  f8 s  r  s  s  s  s  s  s  s4 m1 m2 m2 m3 f1 f2 f2 f2 f2 f2 f  f  f  f  f  f  f3 w6 w  w  w")
         .sprites("f5 r  r  r4 s  s  s  s  s  s4 m1 m  m  m  m5 f6 f  f  f  f  f  f7 f7 f7 f7 f7 f7 f8 w1 w  w  w")
         .sprites("f  f3 s  s  s  s  s  s  s  m1 m  m  m  m  m  m3 f6 f7 f7 f7 f8 w1 w2 w2 w2 w2 w2 w2 w  w  w  w")
         .sprites("f  f8 s  s  s  s  s  s  s4 m4 m  m  m  m  m  m8 w1 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f8 .  s3 s  s  s  s  s4 m1 m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("g  g  g  g  g  g2 .  m1 m  m  m  m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("g  g  g  g  g  g4 m1 m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("g  g  g  g  g4 m1 m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("g  g4 m1 m2 m2 m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("g4 m1 m  m  m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m  m  m  m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m3 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w3 m6 m7 m7 m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w2 w2 w2 w3 m6 m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m2 m2 m3 w6 w7 w7 w7 w7 w7 w  w  w  w")
         .sprites("w  w  w  w  w  w2 w2 w2 w2 w3 m6 m7 m7 m7 m7 m7 m  m  m  m  m  m  m2 m2 m2 m2 m2 m3 w6 w  w  w"));

    addSection(
      Map.create("WORLD-MAP-2-2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 29));

    addSection(
      Map.create("WORLD-MAP-2-3")
         .sprites("w  w  w  w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w8 f1 f2 f2 f3 .  .  w1 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w3 .  w6 w7 w7 w7 w7 w7 w7 w8 f1 f  f  f  f8 .  w1 w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w3 .  .  f1 f2 f2 f2 f2 f2 f  O  f  f8 w1 w2 w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w3 .  f6 f7 f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 f6 f7 f7 f7 f7 f8 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 26));

    addSection(Map.create("WORLD-MAP-2-4").repeatSprites(allWater(), 32));

    addSection(
      Map.create("WORLD-MAP-2-5")
         .sprites("w  w  w  w2 w2 w3 m6 m  m  m  m  m5 d3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w3 m6 m  m  m  m  m3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w5 .  m6 m  m  m  m5 d3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w3 .  m4 m  m  m  m3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w5 .  m4 m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w3 m6 m  m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w3 m6 m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w3 m4 m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w8 m4 m  m8 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w8 m1 m  m5 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w8 m1 m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w8 .  m4 m  m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w7 w8 .  .  m4 m  m  m5 d3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w8 .  .  .  .  m6 m  m  m  m2 m3 d3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w2 w2 w2 w2 w2 w3 m6 m7 m  m  m  m3 d3 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w2 w3 m6 m  m  m  m2 m2 m2 m2 m2 m2 m2 m2 m3 d3 d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m  m7 m  m  m  m  m2 m2 m3 d3 d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m8 .  m6 m7 m7 m  m  m  m  m3 d3 d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m3 .  w1 w2 w3 m6 m7 m7 m  m  m3 d3 d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m3 w4 w  w  w2 w2 w3 m4 m  m  m3 d3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m5 w4 w  w  w  w  w5 m4 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m4 m  m5 w4 w  w  w  w  w5 m6 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m  m5 w4 w  w  w  w  w  w3 m6 m7 m7 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m8 w6 w  w  w  w  w  w  w3 .  .  m6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w6 w  w  w  w  w  w  w2 w2 w3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w6 w  w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w4 w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 w6 w  w  w  w  w  w  w5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 w4 w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  ."));

    addSection(
      Map.create("WORLD-MAP-2-6")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m  m  m3 f  f  f  f  f  f  w1 w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m6 m  m  m  m  m  m3 f  f  f  f  w1 w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m  m  m  m  m  m3 f  f  w1 w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  .  m4 m  m  m  m  m  m2 m3 w6 w7 w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m1 m  m  m  m  m  m  m  m  m2 m3 w6 w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m1 m  m  m  m  m  m  m  m  m  m  m  m3 w6")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m8 w1")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m1 m  m  m  m8 w1 w2 w2 w2 w2 w2 w2 w2 w2 w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m1 m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m6 m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m  m5 w6 w7 w  w  w  w  w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m  m2 m3 w6 w7 w7 w  w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m6 m7 m  m2 m2 m3 w6 w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 .  m6 m  m  m  m3 w6 w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 .  m4 m  m  m5 .  w4 w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m8 w1 w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 w1 w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 w4 w  w  w  w  w  w")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m5 w4 w  w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m3 d3 d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m5 w4 w  w  w  w  w  w")
         .sprites("m  m  m  m  m7 m7 m7 m7 m8 d1 d  d  d  d  d  d  d  d  d  d  d  m1 m  m  m8 w4 w  w  w  w  w  w")
         .sprites("m  m  m  m8 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m4 m  m5 w1 w  w  w  w  w  w  w")
         .sprites("m  m  m5 d1 d  d  d  d  d  d  d  d  d  d  d  d  d  d4 .  m1 m2 m  m  m5 w4 w  w  w  w  w  w  w")
         .sprites("m4 m  m5 d  d  d  d  d  d  d  d  d  d  d  d  d  d4 m1 m2 m  m  m  m  m8 w4 w  w  w  w  w  w  w")
         .sprites("m4 m  m5 d3 d  d  d  d  d  d  d  d  d  d4 m1 m3 .  m6 m7 m7 m7 m7 m8 .  w6 w  w  w  w  w  w  w")
         .sprites("m4 m  m  m2 m3 d3 d  d  d  d  d  d  d4 m1 m  m8 .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w")
         .sprites("m6 m  m  m  m  m3 d3 d  d  d  d  d4 m1 m  m5 w1 w2 w2 w2 w2 w2 w2 w3 .  .  .  w6 w  w  w  w  w")
         .sprites("w3 m4 m  m  m  m  m2 m2 m2 m2 m2 m2 m  m  m5 w4 w  w  w  w  w  w  w  w3 w1 w2 w3 w4 w  w  w  w")
         .sprites("w8 m4 m  m  m  m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m1 m  m  m7 m7 m7 m7 m  m  m  m  m  m  m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m6 m7 m8 w1 w2 w2 w3 m6 m7 m  m  m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-2-7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 f6 f7 f7 f  f  f5 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w8 s1 s  s2 f6 f  f  f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w5 s1 s  s  s  s2 f6 f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w5 s3 s  s  s  s  s2 f4 f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w3 s  s  s  s  s  f4 f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 s3 s  s  s  s4 f4 f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w3 s3 s4 f1 f2 f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w5 f1 f2 f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w8 f4 f  f  f  f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w7 w8 f1 f  f  f  f7 f7 f7 f7 f8 w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w8 f1 f2 f  f  f  f8 s1 s  s  s  s2 w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w7 w8 f1 f  f  f  f7 f8 s1 s  s  s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 f1 f2 f  f  f  f8 s1 s  s  s  s  s  s  s  w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 f1 f  f  f  f  f8 s1 s  s  s  s  s  s  s  s  s2 w6 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 f6 f  f  f  f5 s1 s  s  s  s  s  s  s  s  s  s4 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 f6 f  f  f5 s  s  s  s  s  s  s  s  s4 w1 w2 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w3 f4 f  f5 s3 s  s  s  s  s4 w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 f4 f  f  f3 s  s  s  s4 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 f1 f  f  f  f5 s  s4 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 f1 f  f  f  f  f5 s4 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w8 f4 f  f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f1 f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f4 f  f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f4 f  f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 f4 f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f1 f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f6 f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w3 f6 f7 f  f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w2 w3 f6 f7 f7 f  f  f  f3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 w6 w  w2 w2 w3 f6 f  f  f  f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f1 f3 w6 w  w  w  w3 f6 f  f  f  f  f  f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f6 f  f3 w6 w  w  w  w3 f4 f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(Map.create("WORLD-MAP-3-0").repeatSprites(allWater(), 32));
    addSection(
      Map.create("WORLD-MAP-3-1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w3 m6 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m8 w1 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w2 w2 w2 w2 w2 w2 w  w  w  w")
         .repeatSprites(allWater(), 30));

    addSection(Map.create("WORLD-MAP-3-2").repeatSprites(allWater(), 32));

    addSection(
      Map.create("WORLD-MAP-3-3")
         .repeatSprites(allWater(), 23)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  f1 f2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3"));

    addSection(
      Map.create("WORLD-MAP-3-4")
         .repeatSprites(allWater(), 23)
         .sprites("w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  T1 T2 w6 w7 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("T3 T4 T5 .  .  .  .  w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8")
         .sprites("f2 f2 f2 f2 f2 f2 f2 f3 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .")
         .sprites("f  f  f  f  f  f  f  f  f3 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  f1 f2")
         .sprites("f  f  f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  f1 f  f")
         .sprites("f6 f7 f7 f  f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f  f  f"));

    addSection(
      Map.create("WORLD-MAP-3-5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2")
         .repeatSprites(allWater(), 16)
         .sprites("w  w  w  w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w7 w8 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 m1 m2 m2 m3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 m1 m  m  m  m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w7 w8 .  m6 m7 CV m7 m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 .  .  .  .  .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w8 .  .  .  .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 .  f1 f2 f2 f2 f3 .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 .  f4 f  f  f  f  f3 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 f1 f  f  f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f1 f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f7 f7 f7 f7 f7 f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-3-6")
         .sprites("w2 w2 w2 w  w  w  w  w2 w3 m6 m7 m7 m7 m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w2 w2 w3 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 12)
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .repeatSprites(allWater(), 15));

    addSection(
      Map.create("WORLD-MAP-3-7")
         .sprites("w  w  w  w3 f4 f  f3 w6 w  w  w8 f6 f7 f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f6 f  f  f3 w6 w8 +- -- -+ f6 f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w3 f6 f  f  f3 -/ |- LF -| /- f4 f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 f4 f  f5 /. LF LF LF ./ f4 f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w5 f4 f  f5 +. _| .. |_ .+ f4 f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w5 f4 f  f  f2 f2 f2 f2 f2 f  f5 w1 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w5 f6 f  f  f  f  f  f  f  f  f5 w8 f1 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w3 f4 f  f  f  f  f  f  f  f  f2 f  f  f3 w6 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 f4 f  f  f  f  f  f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 f1 f  f  f  f  f7 f7 f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w8 f1 f  f  f  f  f8 w1 w3 f6 f7 f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 f1 f  f  f  f  f8 w1 w  w  w2 w3 f6 f7 f7 f  f5 w1 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f1 f  f  f  f  f8 w1 w  w  w  w  w  w2 w2 w3 f4 f5 w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w7 w7 w8 f4 f  f  f  f5 w1 w  w  w  w  w  w  w  w  w5 f6 f8 w4 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f1 f2 f2 f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w3 w1 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f6 f7 f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w3 f6 f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w3 f6 f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w3 f4 f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f4 f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 f6 f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w3 f4 f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 f4 f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 f6 f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w5 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(Map.create("WORLD-MAP-4-0").repeatSprites(allWater(), 32));

    addSection(
      Map.create("WORLD-MAP-4-1")
         .repeatSprites(allWater(), 23)
         .sprites("w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 .  .  w6 w7 w7 w  w  w  w  w8 s1 s2 w6 w7 w7 w7 w7 w7 w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w2 w3 .  .  .  .  w6 w7 w7 w8 s1 s  s  s2 m1 m2 m2 m2 m3 w6 w7 w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w2 w3 .  .  s1 s  s  s  s  s  s  s  m6 m7 m  m  m  m2 m3 w6 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w2 w3 s  s  m1 m2 m2 m3 s3 s  s  s2 m6 m  m  m  m  m3 w6 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 s3 s  m6 m7 m  m  m3 s  s  s  s2 m6 m7 m  m  m  m3 w6 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  m6 m  m5 s  s  s  s  s  s2 m6 m7 m  m  m3 w6 w7 w8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  m6 m8 s  s  s  s  s  s  s  s2 m6 m7 m8 s1 s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s"));

    addSection(
      Map.create("WORLD-MAP-4-2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 .  w6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 m1 m2 m2 m3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2 m  m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 .  m6 m7 m  m  m  m8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 s1 s  s  s  s2 m6 m7 m8 w1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 s1 s  s  s  s  s  s  s  s  s  s2 w6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s1 s  s  s  s  s  s  s  s  s  s  s  s2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  s  s  s  s4 m1 m3 s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3 s  s  s  s  s4 m1 m  m5 s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  s  m1 m  m  m5 s3 s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s  s  s  m4 m  m  m  m3 s3 s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  m4 m  m  m  m  m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  m6 m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  s2 m6 m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  s  s2 m6 m7 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s  s  s  s  s  s  s  s  s  s2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w8 s3 s  s  s  s  s  s  s  s  s4 w1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 m1 m2 m2 m2 m2 m2 m3 s  s  s  s  s  s  s4 w1 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 m1 m2 m  m  m  m  m  m  m8 s3 s  s  s4 w1 w2 w2 w  w")
         .sprites("w  w  w  w  w7 w7 w7 w7 w7 w7 w7 w8 .  .  m4 m  m  m  m  m  m  m8 w1 w2 w2 w2 w2 w  w  w  w  w")
         .sprites("w  w  w  w8 s1 s  s  s  s  s  s  s  s  s2 m6 m  m  m  m  m7 m8 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 s1 s  s  s  s  s  s  s  s  s  s  s2 m6 m  m  m5 w1 w2 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w8 s1 s  s  s  s  s  s  s  s  s  s  s  s  s2 m6 m7 m8 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 s1 s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s2 w1 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  f1 f2 f3 s3 s  s  s  s  s  s  s  s4 w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  f6 f  f  f3 s  s  s  s  s  s4 .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  s2 f6 f7 f8 s  s  s  s  D1 D2 .  ML .  .  w6 w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-4-3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 f1 f2 f3 w6 w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f  f  f  f3 w4 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 f1 f  f  f  f  f  f5 w4 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w7 w8 f1 f2 f  f  f  f  f  f  f8 w4 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w7 w7 w8 g1 g  g2 .  .  f1 f2 f  f  f  f  f  f  f  f8 .  w4 w  w  w7 w  w")
         .sprites("w  w  w  w  w  w7 w8 g1 g  g  g  g  g  g4 .  f6 f  f  f  f  f  f7 f7 f8 .  .  w4 w  w8 .  w6 w")
         .sprites("w  w  w  w  w8 g1 g  g  g  g  g  g4 m1 m2 m2 m3 f6 f7 f7 f7 f8 m1 m2 m2 m3 .  w6 w5 .  m1 m3 w6")
         .sprites("w  w  w  w8 g1 g  g  g  g  g  g4 m1 m  m  m  m  m2 m3 .  .  m1 m  m  m  m5 .  .  w8 m1 m  m  m2")
         .sprites("w6 w7 w8 g1 g  g  g  g  g  g  g2 m4 m  m  m  m  m  m8 .  m1 m  m  m  m  m8 .  .  .  m4 m  m  m")
         .sprites("s2 .  g1 g  g  g  g  g  g  g  g4 m6 m7 m7 m7 m7 m8 .  .  m6 m  m  m  m8 D1 D2 D3 .  m4 m  m  m")
         .sprites("s  s2 g3 g  g  g  g  g  g  g4 .  .  .  f1 f2 f2 f2 f3 .  .  m6 m7 m8 .  D4 w  D5 .  m6 m  m  m")
         .sprites("s  s4 .  g3 g  g  g  g  g4 .  .  .  f1 f  f  f  f  f5 .  .  .  .  .  .  .  w  w1 w2 w3 m6 m  m")
         .sprites("m1 m2 m3 g1 g  g  g  g4 w1 w2 w3 f1 f  f  f  f7 f7 f8 .  .  .  .  w1 w2 w2 w  w  w  w  w3 m6 m7")
         .sprites("m  m  m5 g3 g  g  g4 w1 w  w  w5 f4 f  f  f5 r1 r  r2 .  .  w1 w2 w  w  w  w  w  w  w  w  w2 w2")
         .sprites("m  m  m5 .  .  .  w1 w  w  w  w8 f4 f  f  f5 r3 r  r4 .  w1 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m7 m8 .  .  w1 w  w  w  w5 f1 f  f  f  f  f2 f2 f2 f3 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m8 .  .  .  w1 w  w  w  w  w8 f6 f  f  f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w1 w2 w  w  w7 w7 w8 .  .  f4 f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w2 w  w  w7 w8 .  .  .  .  .  f4 f  f  f  f  f8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 .  .  .  m1 m2 m3 .  f6 f  f  f  f5 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 m1 m2 m2 m2 m  m  m5 .  .  f6 f7 f  f5 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w8 m1 m  m  m  m  m  m  m  m3 .  .  .  f6 f8 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 m1 m  m  m  m  m  m7 m7 m7 m  m2 m3 .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 m4 m  m  m  m  m8 f1 f2 f3 m6 m  m  m3 .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 m4 m  m  m  m5 .  f4 f  f  f3 m6 m7 m8 .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w5 m6 m  m  m  m  m3 f4 f  f  f  f3 .  .  .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w3 m6 m7 CV m7 m8 f4 f  f  f7 f8 m1 m2 m3 .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w3 f1 f2 f2 f2 f  f  f8 m1 m2 m  m  m  m3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f6 f  f  f7 f7 f8 m1 m  m  m7 m7 m7 m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w3 f6 f8 m1 m2 m2 m  m  m8 .  w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 .  .  m6 m  m  m  m8 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-4-4")
         .sprites("w2 w2 w3 f6 f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f2 f  f  f  f  f5")
         .sprites("w  w  w  w3 f6 f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w3 f6 f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w5 .  f6 f7 f8 w4 w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f7 f7 f7 f7 f7 f7")
         .sprites("w  w  w  w  w5 .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f5 r  r  r  r  r  r")
         .sprites("w  w  w  w  w8 .  s1 s2 .  .  w4 w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f  f2 f2 f2 f2 f2 f2")
         .sprites("w  w  w  w5 .  s1 s  s  s2 .  w4 w  w  w  w  w  w  w  w5 f6 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f")
         .sprites("w7 w7 w7 w8 s1 s  s  s  s  s2 w4 w  w  w  w  w  w  w  w8 m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 f6")
         .sprites("m2 m2 m2 m3 s  s  s  s  s  s  w4 w  w  w  w  w7 w7 w8 m1 m  m  m  m  m  m  m  m  m  m  m  m5 .")
         .sprites("m  m  m  m8 s  s  s  s  s  s  w4 w  w  w  w8 m1 m2 m2 m  m  m  m  m  m  m  m  m  m  m  m  m5 .")
         .sprites("m  m  m  m3 s3 s  s  s  s  s  w6 w7 w7 w8 m1 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 .")
         .sprites("m  m  m  m  m2 m3 .  s3 s  s4 .  .  .  m1 m  m  m  m  m7 m7 m  m  m  m  m  m  m  m7 m7 m7 m8 .")
         .sprites("m  m  m  m  m  m  m2 m3 .  .  .  f1 f3 m6 m  m  m  m8 w1 w3 m6 m7 m  m  m  m  m8 .  .  .  .  .")
         .sprites("m7 m7 m7 m7 m7 m7 m7 m8 .  f1 f2 f  f  f3 m6 m7 m8 w1 w  w  w2 w3 m6 m7 m7 m8 .  .  D2 D2 D2 D3")
         .sprites("w2 w3 .  .  .  .  .  f1 f2 f  f  f  f  f5 .  .  w1 w  w  w  w  w  w2 w2 w2 w2 w2 w2 w  w  w  D5")
         .sprites("w  w  w3 .  .  .  f1 f  f  f  f  f  f  f  f2 f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .")
         .sprites("w  w  w  w3 .  .  f4 f  f  f  f  f  f  f  f  f5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .")
         .sprites("w  w  w  w  w3 .  f6 f  f  f  f  f  f  f  f  f8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w5 .  m1")
         .sprites("w  w  w  w  w  w3 .  f6 f7 f  f  f  f  f7 f8 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m6")
         .sprites("w  w  w  w  w  w5 .  .  .  f6 f7 f7 f8 .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w7 w8 .  .  .")
         .sprites("w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w7 w8 .  .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  w6 w7 w  w  w  w  w  w8 .  .  .  .  w1 w2 w2 w2")
         .sprites("w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  w6 w  w  w  w8 .  .  .  .  w1 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w2 w3 .  .  .  .  .  .  .  w6 w  w  w7 w7 w7 w7 w2 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 .  .  .  .  .  w6 w8 .  .  .  .  w6 w7 w7 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .  f1 f2 f2 f2 f2 f2 f2 f3 w6 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  f1 f  f  f  f  f  f  f  f  f3 w6 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  f1 f  f  f  f7 f7 f7 f7 f  f  f  f3 w6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  f1 f  f  f  f8 .  ^- -^ .  f6 f  f  f  f3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  f4 f  f  f8 .  +- [- -] -+ .  f6 f  f  f5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .  f4 f  f5 .  -/ |- [_ _] -| /- .  f4 f  f5"));

    addSection(
      Map.create("WORLD-MAP-4-5")
         .sprites("r  r  r  r  r  r  r  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f2 f2 f3 r  f1 f2 f3 w4 w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f5 r  f4 f  f5 w6 w  w  w  w  w3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f7 f8 r  f4 f  f  f3 w6 w7 w7 w7 w8 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  r4 f4 f  f  f  f2 f3 .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f2 f2 f2 f2 f  f  f  f  f  f5 d1 d  d  d2 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f  f  f8 d  d  d  d  d  d  d2 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f  f8 .  d3 d  d  d  d  d  d  d2 w6 w  w  w  w  w  w  w  w  w  w7 w7 w  w")
         .sprites("f7 f7 f  f  f  f  f  f8 m1 m2 m3 d  d  d  d  d  d  d  d2 w4 w  w  w  w  w  w  w  w8 .  .  w6 w7")
         .sprites(".  .  f6 f7 f7 f7 f8 m1 m  m  m5 d3 d  d  d  d  d  d  d4 w6 w7 w  w  w  w  w  w8 .  .  .  .  .")
         .sprites("m1 m2 m2 m2 m2 m2 m2 m  m  m  m8 .  .  f1 f2 f2 f2 f2 f2 f2 f3 w6 w7 w7 w7 w8 .  .  .  .  .  .")
         .sprites("m4 m  m  m  m  m  m  m  m  m8 s1 s  s2 f6 f  f  f  f  f  f  f  f2 f2 f2 f2 f2 f2 f2 f2 f2 f2 f2")
         .sprites("m4 m  m  m  m  m  m  m7 m8 s1 s  s  s  s2 f6 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("m6 m  m  m  m  m  m8 s1 s  s  s  s  s  s  .  f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites(".  m4 m  m  m  m8 s1 s  s  s  s  s  s  s  s2 f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites(".  m4 m  m  m5 s1 s  s  s  w1 w2 w2 w3 s3 s  f6 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("m2 m  m  m  m8 s  s  w1 w2 w  w  w  w5 .  s  s2 f6 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("m  m  m7 m8 s1 s  w1 w  w  w  w  w  w  w3 s  s4 .  f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f7")
         .sprites("m7 m8 s1 s  s  w1 w  w  w  w  w  w  w  w8 s3 .  f1 f  f  f  f  f7 f7 f7 f7 f7 f7 f7 f7 f7 f8 .")
         .sprites(".  .  .  w1 w2 w  w  w  w  w  w  w  w8 f1 f2 f2 f  f  f  f  f8 .  .  .  w1 w2 w2 w2 w2 w2 w3 .")
         .sprites(".  w1 w2 w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f  f  f5 .  .  w1 w2 w  w  w  w  w  w  w  w")
         .sprites("w1 w  w  w  w  w  w  w  w  w  w5 .  f4 f  f  f  f  f  f  f8 .  w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 .  f6 f7 f7 f7 f7 f7 f8 .  w1 w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  m1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m1 m2 m2 m2 m")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m  m7")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m1 m  m  m  m8 f1")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m6 m  m  m5 .  f4"));

    addSection(
      Map.create("WORLD-MAP-4-6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  w6 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w7 w7 w8 .  .  .  .  .  w1 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 .  .  .  .  .  .  .  .  .  .  .  .  w1 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w8 .  .  .  .  .  .  .  .  w1 w2 w2 w2 w2 w2 w2 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  .  .  .  w1 w2 w2 w2 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w8 .  f1 f2 f2 f2 f2 f3 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w7 w8 .  f1 f  f  f  f  f  f  f3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w6 w7 w  w  w  w8 .  .  f1 f  f  f  f  f  f  f  f  f3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w6 w7 w8 .  f1 f2 f  f  f  f  f  f  f  f  f  f5 .  w6 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f3 .  .  .  .  .  f6 f7 f7 f7 f7 f7 f  f  f  f  f  f  f3 .  w6 w7 w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f3 .  .  .  .  .  .  .  .  .  .  f6 f  f  f  f  f  f  f3 .  .  w6 w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f3 .  .  .  .  .  w1 w2 w2 w3 .  f6 f  f  f  f  f  f  f2 f3 .  w6 w  w  w  w  w  w  w  w")
         .sprites("f  f  f5 .  .  .  .  w1 w  w  w  w5 .  .  f6 f  f  f  f  f  f  f  f3 .  w6 w  w  w  w  w  w  w")
         .sprites("f  f  f8 .  .  .  w1 w  w  w  w  w  w3 .  .  f4 f  f  f  f  f  f  f  f3 .  w4 w  w  w  w  w  w")
         .sprites("f  f8 .  .  .  .  w4 w  w  w  w  w  w  w3 .  f4 f  f  f  f  f  f  f  f  f3 w6 w  w  w  w  w  w")
         .sprites("f8 .  .  .  .  w1 w  w  w  w  w  w  w  w5 f1 f  f  f  f  f  f  f  f  f  f  f3 w6 w  w  w  w  w")
         .sprites(".  .  .  .  w1 w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f  f  f  f3 w4 w  w  w  w")
         .sprites(".  .  .  w1 w  w  w  w  w  w  w  w  w  w8 f4 f  f  f7 f7 f7 f  f  f  f  f  f  f5 w4 w  w  w  w")
         .sprites("w2 w2 w2 w  w  w  w  w  w  w  w  w7 w8 f1 f  f  f8 +- -- -+ f6 f  f  f  f  f  f8 w4 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f  f  f8 -/ |- PR -| /- f6 f7 f7 f7 f8 w1 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w5 f1 f  f  f  f8 .  /. PR .. PR ./ .  .  .  w1 w2 w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w8 f6 f7 f7 f8 .  .  +. _| .. |_ .+ .  .  .  w4 w  w  w  w  w  w  w")
         .sprites("w  w7 w7 w7 w7 w7 w  w  w  w3 .  .  .  .  .  .  .  D2 D2 D3 .  .  .  .  w4 w  w  w  w  w  w  w")
         .sprites("w8 .  .  .  .  .  w6 w  w  w  w2 w2 w2 w2 w3 .  .  w  w  D5 .  .  .  .  w6 w7 w7 w7 w7 w  w  w")
         .sprites(".  .  .  .  .  .  w1 w  w  w  w  w  w  w  w5 .  .  w  .  .  .  f1 f3 .  m1 m2 m2 m2 m3 w6 w7 w7")
         .sprites("m2 m2 m2 m2 m3 .  w4 w  w  w  w  w  w  w  w5 .  .  w  .  .  .  f4 f5 m1 m  m  m  m  m  m2 m2 m2")
         .sprites("m  m  m  m  m5 .  w6 w  w  w  w  w  w  w  w  w  w  w  .  .  f1 f  f5 m4 m  m  m  m  m  m  m  m")
         .sprites("m7 m7 m7 m7 m8 .  .  w6 w  w  w  w  w  w  w5 .  .  f1 f2 f2 f  f  f8 m6 m7 m7 m7 m7 m7 m  m  m")
         .sprites("f2 f2 f2 f2 f3 .  .  .  w6 w7 w7 w7 w7 w7 w8 f1 f2 f  f  f  f  f8 .  .  .  .  .  .  .  m6 m  m")
         .sprites("f  f  f  f  f  f2 f2 f2 f3 .  .  .  .  .  .  f6 f7 f7 f7 f7 f8 .  .  .  .  .  .  .  .  .  m6 m7"));

    addSection(
      Map.create("WORLD-MAP-4-7")
         .sprites("w  w  w  w  w  w5 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w7 w8 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 f1 f2 f2 f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 f1 f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w8 f1 f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 f1 f  f  f  f  f  f8 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  f4 f  f  f  f  f5 m1 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  f4 f  f  f  f  f8 m4 m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w3 f6 f  f  f  f5 m1 m  m  m  m  m3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w3 f6 f  f  f5 m4 m  m  m  m  m  m2 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w3 f6 f7 f8 m4 m  m  m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w3 .  .  m6 m  m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 .  .  .  m4 m  m  m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 .  .  .  m6 m7 m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w3 .  .  .  .  m6 m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 .  .  .  .  m6 m7 m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w3 .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w3 .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w3 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w5 .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w8 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w8 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w5 .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 w  D5 .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w7 w8 .  w  D5 .  m1 m3 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 .  .  .  w6 D5 .  m4 m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m3 .  .  .  .  m1 m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 .  .  .  .  m4 m  m5 w6 w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 .  .  .  .  m6 m7 m  m2 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 .  .  .  .  .  .  m6 m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m8 .  .  m1 m2 m3 .  .  m6 m  m  m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-5-0")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m6 m7 m7 CV m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m1 m2 m2 m2 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m1 m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m6 m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m6 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m4 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  m6 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m4 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 CV m8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  ."));

    addSection(
      Map.create("WORLD-MAP-5-1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3 s  s  s  s  s  s  s  s  f1 f2 f2 f2 f2 f3 s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  m1 m3 s3 s  s  s  f4 f  f  f  f  f8 s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 m4 m  m3 s  s  s  f6 f  f  f  f8 s1 s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m4 m  m5 s3 s  s  s2 f6 f7 f8 s1 s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m4 m  m  m3 s  s  s  s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  m1 m  m  m  m5 s  s  s  s  s  s  s  s4 .  .  .  ")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m4 m  m  m  m5 s3 s  s  s  s  s  s4 .  w1 w2 w2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  m6 m  m  m  m8 .  s3 s  s  s  s4 .  w1 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f2 f3 m6 m7 m8 .  .  .  s3 s  s4 .  .  w4 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f3 .  .  .  m1 m2 m3 .  .  .  w1 w  w  w  w")
         .sprites("w7 w7 w7 w7 w7 w7 w7 w7 w7 w7 w8 .  f6 f  f  f  f  f8 m1 m2 m2 m  m  m5 .  .  w1 w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 f6 f7 f7 f8 m1 m  m  m  m  m  m8 .  .  w4 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m3 .  .  .  m4 m  m  m  m  m8 .  .  .  w4 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m8 .  .  .  m6 m7 m7 m7 m8 .  .  .  .  w4 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  CV m7 m8 .  .  .  w1 w2 w2 w2 w2 w3 .  .  .  .  w4 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m8 .  .  .  .  .  w1 w  w  w  w  w  w  w3 .  .  .  w4 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m8 w1 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w3 .  .  w6 w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  w4 w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w6 w  w  w  w8")
         .sprites("m  m  m  m  m  m7 m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w6 w7 w8 .")
         .sprites("m  m  m  m7 m8 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .")
         .sprites("m  m  m8 .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m1 m3 .  .  m1")
         .sprites("m  m8 .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m1 m  m  m2 m2 m")
         .sprites("m8 .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w8 .  m1 m  m  m  m  m  m")
         .sprites(".  .  m1 m2 m3 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m6 m  m  m  m  m  m")
         .sprites("m1 m2 m  m  m8 .  .  w4 w  w  w  w  w  w  w  w  w  w7 w8 .  m1 m2 m2 m3 .  .  m4 m  m  m  m  m")
         .sprites("m  m  m  m5 .  .  w1 w  w  w  w  w  w  w  w  w  w8 .  .  m1 m  m  m  m  m3 .  m6 m7 m7 m  m  m")
         .sprites("m  m  m  m8 .  w1 w  w  w  w  w  w  w  w  w  w8 .  m1 m2 m  m  m  m  m  m5 .  .  .  .  m6 m7 m8")
         .sprites("m  m7 m8 .  .  w4 w  w  w  w  w  w  w  w  w8 .  .  m6 m7 m7 m7 m7 m  m  m  m2 m2 m3 .  .  .  s1")
         .sprites("m8 .  .  .  w1 w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  m6 m7 m7 m7 m  m  m2 m2 m3 s3")
         .sprites(".  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w3 .  .  .  .  m6 m7 m7 m7 m  m2")
         .sprites("w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w3 .  .  .  .  m6 m7"));

    addSection(
      Map.create("WORLD-MAP-5-2")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s  s  D4 w  .  ML ML .  .  w4 w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s  s4 D4 w  .  .  .  .  w1 w  w  w  w7 w  w  w  w  w  w  w")
         .sprites("s  s  s  s  s  s4 .  w1 w2 w2 w2 w2 w2 w2 w2 w  w2 w2 w2 w2 w  w  w  w8 .  w6 w7 w  w  w  w  w")
         .sprites("s  s  s4 .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  w6 w7 w7 w  w")
         .sprites("s4 .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  w6 w")
         .sprites(".  .  .  w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 .  .  .  .  w6")
         .sprites("w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 .  w1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w8 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w8 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w8 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 .  m1 m3 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 .  m1 m  m5 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w7 w8 .  m1 m  m  m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  m1 m  m  m  m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  m1 m  m  m  m8 s1 s2 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("m1 m  m  m  m8 s1 s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("m  m  m  m5 s1 s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m5 s  s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m5 s3 s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m3 s  s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m5 s3 s  s  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 CV m7 m  m  m3 s3 s4 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s1 s  s1 m4 m  m  m3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("s  s  s4 m6 m7 m7 m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("s  s4 .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("m2 m2 m2 m3 .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5")
         .sprites("m  m  m  m  m3 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8"));

    addSection(
      Map.create("WORLD-MAP-5-3")
         .sprites("w  w  w  w5 .  .  .  m4 m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 .  .  .  m6 m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w3 .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w3 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  r  r2 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w5 .  r  r  r  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w8 .  r  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 .  r1 r4 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w8 .  r  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w8 .  .  r  .  r1 r  r  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 .  r1 r  r4 .  r  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w7 r  r  r4 .  .  .  r  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 .  .  .  .  .  .  .  r  f1 f2 f3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  .  .  f1 f2 f3 r  f4 f  f  f3 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  r1 r  f4 f  f5 r4 f4 f  f  f5 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w3 .  .  r  f1 f  f  f  f2 f  f  f  f5 .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w2 r  r4 f4 f  f  f  f  f  f  f  f5 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w3 f1 f  f  f  f7 f  f  f  f  f  f3 r1 r  r  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w5 f6 f  f  f8 .  f6 f  f  f  f  f5 r  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w8 .  f6 f8 C1 C2 .  f4 f  f  f  f5 r  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w8 f1 f2 f3 .  C3 C4 f1 f  f  f  f  f5 r  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w8 f1 f  f  f  f3 .  .  f6 f7 f7 f7 f7 f8 r  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f1 f  f  f  f  f5 r  r  r  r  r  r  r  r  r4 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f4 f  f  f  f  f  f2 f2 f2 f2 f3 r  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f6 f  f  f  f  f  f  f  f  f  f8 r3 r  r  w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  f6 f7 f7 f7 f7 f7 f7 f7 f8 .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-5-4")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  f4 f  f5 .  /. CO .. .. CO ./ .  f4 f  f5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  f4 f  f5 .  /, CO .. .. CO ,/ .  f4 f  f5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 .  .  f4 f  f5 .  /: CO .. .. CO :/ .  f4 f  f5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  f4 f  f  f3 +_ _| .. .. |_ _+ f1 f  f  f5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  f6 f  f  f  f3 .  .  .  .  f1 f  f  f  f8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  f6 f  f  f5 .  .  .  .  f4 f  f  f8 .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  f6 f7 f8 .  .  .  .  f6 f7 f8 .  w1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .  .  .  .  .  .  .  w1 w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  D1 D2 D3 .  .  w1 w2 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  D4 w  D5 .  w1 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  D4 w  w1 w2 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  w1 w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  w1 w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 w1 w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 16));

    addSection(
      Map.create("WORLD-MAP-5-5")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m6 m  m  m3 f6")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m4 m  m5 .")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m3")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w8 .  .  m4 m  m  m")
         .sprites("w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 .  .  .  m1 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m2 m3 .  m1 m2 m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m2 m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m  m  m  m  m  m  m  m  m  m  m  m8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m  m  m  m  m5 g1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m  m  m  m  m5 g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m  m  m  m  m  m  m  m  m  m  m5 g3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m  m  m  m  m  m3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m  m  m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m6 m  m  m  m  m  m  m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 m4 m  m  m  m  m  m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m7 m7 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m5 r1 r  r  r  r  r")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m4 m  m5 r  m1 m2 m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m  m  m5 r  m4 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m5 r  m4 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m4 m  m  m5 r  m6 m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m5 r3 r2 m4 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m  m3 r  m6 m7 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m  m  m  m  m  m  m5 r  r  r2 m4 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m  m5 r  r  r  m4 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m4 m  m  m  m  m  m  m5 r3 r  r4 m6 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m  m  m  m  m3 g3 g  g  g2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m  m  m  m  m  m  m  m  m  m  m2 m2 m3 g3"));

    addSection(
      Map.create("WORLD-MAP-5-6")
         .sprites("f  f  f  f  f  f  f  f  f  f2 f2 f2 f3 .  .  .  .  .  .  m1 m2 m2 m2 m2 m2 m2 m2 m3 .  .  .  .")
         .sprites("f  f  f  f  f  f  f  f  f  f  f  f  f  f3 .  .  .  m1 m2 m  m  m  m  m  m  m  m  m  m3 .  .  .")
         .sprites("f6 f  f  f  f  f  f  f  f  f  f  f  f  f8 .  .  m1 m  m  m  m  m  m  m  m  m  m  m  m  m3 .  .")
         .sprites("m3 f6 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f8 .  m1 m2 m  m  m  m  m  m  m  m  m  m  m  m  m  m5 .  .")
         .sprites("m  m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m3 .")
         .sprites("m  m  m  m  m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m  m  m  m  m  m  m2")
         .sprites("m  m  m7 m7 m7 m7 m8 g1 g  g  g  r  r  r  r  r  r  r  r  r  r  r  r  r  r2 m4 m  m  m  m  m  m")
         .sprites("m7 m8 g1 g  g  g  g  g  g  g  g4 m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 r  m4 m  m  m  m  m  m")
         .sprites("g1 g  g  g  g  g  g  g  g  g4 m1 m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m7 m8 r  m6 m7 m7 m7 m7 m7 m7")
         .sprites("g  g  g  g  g  g4 m1 m2 m2 m2 m  m  m  m5 r1 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r")
         .sprites("g  g  g  g4 m1 m2 m  m  m  m  m  m  m  m5 r  m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3")
         .sprites("g  g  g4 m1 m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m7 m7 m7 m7 m  m  m  m  m  m  m  m  m  m5")
         .sprites("g3 g  g2 m6 m  m  m  m7 m7 m7 m7 m7 m7 m8 r  m4 m  m5 r  r  r  r2 m4 m  m  m  m  m  m  m  m  m5")
         .sprites("g3 g  g  g2 m4 m  m5 r1 r  r  r  r  r  r  r  m4 m  m  m2 m2 m3 r  m4 m  m  m  m  m  m  m  m  m5")
         .sprites("g3 g  g  g4 m4 m  m5 r  m1 m2 m2 m2 m2 m3 r  m4 m  m  m  m  m5 r  m6 m7 m7 m7 m7 m  m  m  m  m5")
         .sprites("g3 g  g4 m1 m  m  m5 r  m4 m  m  m  m  m5 r  m4 m  m  m  m  m5 r  r  r  r  r  r2 m6 m7 m7 m  m5")
         .sprites("m3 .  m1 m  m  m  m5 r  m4 m  m  m  m  m5 r  m4 m  m  m  m  m5 r  m1 m2 m2 m3 r3 r  r  r2 m6 m8")
         .sprites("m  m2 m  m  m  m7 m8 r  m4 m  m  m  m  m5 r  m4 m  m  m  m  m5 r  m4 m  m  m  m2 m2 m3 r  r  r")
         .sprites("m  m  m  m  m5 r1 r  r4 m4 m  m  m  m  m5 r  m4 m  m  m  m  m5 r  m6 m7 m7 m  m  m  m5 r  m1 m2")
         .sprites("m7 m7 m7 m7 m8 r  m1 m2 m  m  m  m7 m7 m8 r  m4 m  m  m  m  m5 r3 r  r  r2 m4 m  m  m8 r  m4 m")
         .sprites("r  r  r  r  r  r4 m4 m  m  m  m5 r  r  r  r4 m4 m  m  m  m  m  m2 m2 m3 r  m4 m  m5 r1 r4 m4 m")
         .sprites("m2 m2 m2 m2 m2 m2 m  m  m  m  m  m2 m2 m2 m2 m  m  m  m  m  m  m  m  m5 r  m4 m  m5 r  m1 m  m")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r  m4 m  m5 r  m4 m  m")
         .sprites("m  m  m  m7 m7 CV m7 m7 m7 m7 m7 m  m  m  m  m7 m  m  m  m  m  m  m7 m8 r  m6 m7 m8 r  m4 m  m")
         .sprites("m  m  m8 g1 g  g  g  g  g  g  g2 m6 m  m  m5 r  m4 m  m  m  m  m5 r1 r  r  r  r  r  r  m6 m7 m7")
         .sprites("m  m5 g1 g  g  g  g  g  g  g  g  g2 m4 m  m5 r  m4 m  m  m7 m7 m8 r  m1 m2 m3 r3 r  r  r  r  r")
         .sprites("m  m  m3 g3 g  g  g  g  g  g  g4 m1 m  m  m5 r  m4 m  m8 f1 f2 f2 f3 m4 m  m  m2 m2 m3 r  m1 m2")
         .sprites("m  m  m  m2 m2 m2 m3 g  m1 m2 m2 m  m  m  m5 r  m4 m5 f1 f  f  f  f5 m4 m  m  m  m  m5 r  m4 m")
         .sprites("m  m  m  m  m  m  m5 g  m4 m  m  m  m  m  m5 r  m4 m5 f6 f  f  f  f8 m6 m7 m7 m7 m7 m8 r  m4 m")
         .sprites("m  m  m  m  m  m  m5 g  m4 m  m  m  m  m  m5 r  m6 m  m3 f6 f7 f8 .  .  r  r  r  r  r  r4 m4 m")
         .sprites("m7 m7 m7 m7 m7 m7 m8 g  m4 m  m  m  m  m  m5 r3 r2 m4 m  m3 .  .  .  m1 m2 m3 r  m1 m2 m2 m  m")
         .sprites("g  g  g  g  g  g  g  g  m4 m  m  m  m  m  m  m3 r  m4 m  m  m2 m2 m2 m  m  m5 r  m4 m  m  m  m"));

    addSection(
      Map.create("WORLD-MAP-5-7")
         .sprites(".  .  .  m1 m  m  m  m3 .  .  m4 m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  m1 m  m  m  m  m5 .  .  m4 m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  m4 m  m  m  m  m5 .  .  m6 m  m  m  m  m3 w6 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  m6 m7 m7 m7 m7 m8 .  .  .  m6 m  m  m  m  m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  .  .  .  .  .  .  .  .  .  m6 m  m  m  m  m  m3 w6 w7 w7 w  w  w  w  w  w  w  w  w  w")
         .sprites("m3 .  .  .  .  m1 m2 m2 m2 m2 m3 .  .  m6 m  m  m  m  m  m2 m2 m3 w6 w  w  w  w  w  w  w  w  w")
         .sprites("m  m3 .  .  m1 m  m  m  m  m  m  m3 .  .  m6 m7 m7 m7 m7 m  m  m  m3 w6 w  w  w  w  w  w  w  w")
         .sprites("m  m  m2 m2 m  m  m7 m7 m7 m  m  m  m3 .  .  .  .  .  .  m6 m  m  m  m3 w4 w  w  w  w  w  w  w")
         .sprites("m7 m  m  m  m  m8 .  .  .  m6 m  m  m  m3 .  .  .  .  .  m1 m  m  m  m5 w4 w  w  w  w  w  w  w")
         .sprites("r2 m4 m  m  m5 .  .  .  .  .  m6 m  m  m5 .  .  m1 m2 m2 m  m  m  m  m8 w4 w  w  w  w  w  w  w")
         .sprites("r  m4 m  m  m  m3 .  .  .  .  .  m6 m7 m8 .  .  m4 m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w")
         .sprites("r  m4 m  m  m  m  m2 m3 s1 s  s  s  s  s  s  s2 m6 m7 m7 m  m  m5 w1 w  w  w  w  w  w  w  w  w")
         .sprites("r  m4 m  m  m  m7 m7 m8 s  s  s  s  s  s  s  s  s2 .  .  m6 m7 m8 w4 w  w  w  w  w  w  w  w  w")
         .sprites("r  m4 m  m  m8 s1 s  s  s  s  s  s  s  s  s  s  s  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w")
         .sprites("r  m4 m  m5 s1 s  s  s  s  s  s  s  s  s  s  s  s  .  .  .  .  .  .  w6 w7 w  w  w  w  w  w  w")
         .sprites("r  m4 m  m5 s3 s  s  s  s  s  s  s  s  s  s  s  s  D1 D2 D3 .  .  .  .  .  w6 w  w  w  w  w  w")
         .sprites("r  m4 m  m  m3 s3 s  s  s  s  s  s  s  s  s  s  s4 D4 w  D5 .  .  .  .  .  .  w6 w  w  w  w  w")
         .sprites("r4 m4 m  m  m  m3 s  s  s  s  s  s  s  s  s  s4 .  D4 w  D5 .  .  .  .  .  .  .  w4 w  w  w  w")
         .sprites("m2 m  m  m  m  m5 s  s  s  s  s  s  s  s  s4 w1 w2 w2 w  w2 w3 .  .  .  .  .  .  w4 w  w  w  w")
         .sprites("m  m  m  m  m  m5 s  s  s  s  s  s  s4 w1 w2 w  w  w  w  w  w5 .  .  .  .  .  .  w4 w  w  w  w")
         .sprites("m  m  m  m  m  m5 s3 s  s  s  s  s  w1 w  w  w  w  w  w  w  w5 .  .  .  .  .  .  w4 w  w  w  w")
         .sprites("m  m  m  m  m  m  m3 s  s  s  s  s4 w4 w  w  w  w  w  w  w  w5 .  .  .  .  .  .  w4 w  w  w  w")
         .sprites("m  m  m  m7 m7 m7 m8 s3 s  s  s4 w1 w  w  w  w  w  w  w  w  w5 .  .  .  .  .  w1 w  w  w  w  w")
         .sprites("m  m  m5 r1 r  r  r  r  r  r  w2 w  w  w  w  w  w  w  w  w  w5 .  .  .  .  w1 w  w  w  w  w  w")
         .sprites("m7 m7 m8 r  m1 m2 m2 m3 .  .  w6 w  w  w  w  w  w  w  w  w  w8 .  .  .  w1 w  w  w  w  w  w  w")
         .sprites("r  r  r  r4 m4 m  m  m5 .  .  .  w6 w7 w  w  w  w  w  w  w8 .  .  .  w1 w  w  w  w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m  m  m  m  m3 .  .  .  .  w6 w7 w7 w  w  w5 .  .  .  w1 w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m5 .  .  .  .  .  .  .  w6 w  w8 .  w1 w2 w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m5 .  .  .  .  .  .  w1 w2 w  w2 w2 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m5 .  .  .  .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m5 .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m3 .  m1 m2 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(
      Map.create("WORLD-MAP-6-0")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  w1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w")
         .repeatSprites(allWater(), 30));

    addSection(
      Map.create("WORLD-MAP-6-1")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w3 .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3")
         .repeatSprites(allWater(), 30));

    addSection(
      Map.create("WORLD-MAP-6-2")
         .sprites("m6 m7 m7 m  m  m2 m2 m3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .")
         .sprites(".  .  .  m6 m  m  m  m5 .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .")
         .sprites("w2 w2 w3 .  m6 m7 m  m  m3 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .")
         .sprites("w  w  w  w3 .  .  m6 m  m5 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .")
         .sprites("w  w  w  w  w2 w3 .  m6 m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w3 .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w3 .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w3 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m1")
         .sprites("w  w  w  w  w  w  w  w  w  w3 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m1 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m1 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  m1 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  m4 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .  m6 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  .  .  .  .  m6 m7 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  m6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  f1 f2 f2 f3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w3 f4 f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 f6 f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  f4 f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w8 .  f4 f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w8 .  f1 f2 f2 f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  .  .  .  .  f4 f  f  f  f7 f8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m1 m2 m2 m3 f6 f7 f7 f8 m1 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m  m3 .  .  m1 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m6 m  m  m  m5 .  .  m4 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m7 m7 m8 .  m1 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  m4 m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w3 .  .  .  m6 m  m  m5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 .  .  m6 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  m4 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  .  m4"));

    addSection(
      Map.create("WORLD-MAP-6-3")
         .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  .  .  .  f1 f2 f2 f2 f2 f2 f2 f2 f3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  .  .  .  f1 f  f  f  f  f  f  f  f  f  f3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  m1 m3 f1 f  f  f  f  f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  m1 m  m5 f4 f  f  f  f  f  f  f  f  f  f  f5 r  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m1 m  m  m8 f4 f  f  f  f  f  f  f  f  f  f  f5 r  .  w6 w7 w7 w7 w7 w7 w7 w7 w  w  w  w  w  w")
         .sprites("m  m  m5 f1 f  f  f  f  f  f  f  f  f  f  f  f5 r  .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w")
         .sprites("m  m  m8 f4 f  f  f  f  f  f  f  f  f  f7 f7 f8 r  .  .  f1 f2 f2 f2 f2 f2 f2 f3 w4 w  w  w  w")
         .sprites("m  m5 f1 f  f  f  f  f7 f7 f7 f  f  f5 r1 r  r  r4 f1 f2 f  f  f  f  f  f  f  f5 w6 w  w  w  w")
         .sprites("m  m5 f6 f  f  f  f5 r1 r  r2 f6 f7 f8 r  f1 f2 f2 f  f  f  f  f  f  f  f  f  f  f3 w4 w  w  w")
         .sprites("m  m  m3 f6 f  f  f5 r  r  r  .  r1 r  r4 f4 f  f  f  f  f  f  f  f  f  f  f  f  f5 w4 w  w  w")
         .sprites("m  m  m  m3 f6 f  f5 r3 r  r  r  r4 f1 f2 f  f  f  f  f  f  f7 f7 f7 f7 f7 f7 f7 f8 w6 w7 w7 w7")
         .sprites("m  m  m  m  m3 f4 f  f3 r3 r4 f1 f2 f  f  f  f  f  f  f7 f8 m1 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2")
         .sprites("m  m  m  m  m5 f4 f  f  f2 f2 f  f  f  f  f  f  f  f5 m1 m2 m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m8 f6 f  f  f  f  f  f  f  f  f  f  f  f5 m6 m7 m7 m7 m7 m7 m7 m7 m7 m7 m  m  m  m")
         .sprites("m6 m7 m7 m8 .  .  f6 f  f  f  f  f  f  f  f  f  f  f  f2 f2 f2 f2 f2 f2 f2 f2 f2 f3 m6 m7 m7 m")
         .sprites("f3 .  .  .  .  .  .  f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f2 f2 f3 m6")
         .sprites("f  f3 m1 m2 m2 m2 m3 f6 f7 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f3")
         .sprites("f  f5 m4 m  m  m  m  m2 m3 f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f5")
         .sprites("f  f5 m4 m  m  m  m  m  m8 f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f8")
         .sprites("f7 f8 m4 m  m  m  m  m5 .  f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f8 m1")
         .sprites("m2 m2 m  m  m  m  m  m5 .  f4 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f8 m1 m")
         .sprites("m  m  m  m  m  m  m  m8 .  f6 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f8 m1 m  m")
         .sprites("m  m  m  m  m  m  m8 .  .  .  f6 f7 f7 f7 f7 f  f  f  f  f  f  f  f  f  f  f  f  f5 m1 m  m  m")
         .sprites("m  m  m7 m7 m7 m8 .  .  .  .  m1 m2 m2 m2 m3 f6 f  f  f  f  f  f  f  f  f  f  f  f5 m4 m  m  m")
         .sprites("m  m8 .  g1 g  g  g2 .  .  m1 m  m  m  m  m  m3 f4 f  f  f  f  f  f  f  f  f  f  f5 m4 m  m  m")
         .sprites("m8 g1 g  g  g  g  g  g4 m1 m  m  m  m  m  m  m5 f4 f  f  f  f  f  f  f  f  f  f  f5 m4 m  m  m")
         .sprites(".  g3 g  g  g  g4 m1 m2 m  m  m  m  m  m  m  m5 f4 f  f  f  f  f  f  f  f  f  f  f8 m4 m  m  m")
         .sprites("m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m  m  m5 f6 f  f  f  f  f  f  f  f7 f7 f8 m1 m  m  m  m")
         .sprites("m  m  m  m  m  m  m7 m7 m7 m7 m7 m7 m  m  m  m  m3 f4 f  f  f  f  f7 f8 m1 m2 m2 m  m  m  m  m8")
         .sprites("m  m  m7 m7 m7 m8 s1 s  s  s  s  s2 m6 m  m  m  m5 f6 f  f  f  f5 m1 m2 m  m  m  m  m  m  m5 .")
         .sprites("m  m8 s1 s  s  s  s  s  s  m1 m3 s3 s2 m6 m  m  m  m3 f6 f7 f7 f8 m6 m7 m7 m7 m7 m7 m7 m7 m8 f1"));

    addSection(
      Map.create("WORLD-MAP-6-4")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w7 w7 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w5 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w7 w  w  w  w  w  w  w3 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m3 w6 w  w  w  w  w  w  w3 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m3 w6 w7 w  w  w  w  w5 .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m2 m3 w6 w7 w7 w7 w8 .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m3 .  .  .  .  .  .  .  .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m8 .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w7 w7 w7 w7 w7 w7")
         .sprites("m  m  m  m8 .  .  .  .  .  .  .  .  .  .  .  w6 w  w  w  w  w  w  w  w  w7 w8 g1 g  g  g  g  g")
         .sprites("m  m  m5 f1 f2 f2 f2 f2 f2 f2 f2 f3 D1 D2 D2 .  w4 w  w  w  w  w  w  w8 g1 g  g  g  g  g  g  g")
         .sprites("m  m  m8 f  f  f  f  f  f  f  f  f5 D4 w  w  w  w  w  w  w  w  w  w8 g1 g  g  g  g  g  g  g  g")
         .sprites("m  m5 f  f  f  f  f  f  f  f  f  f  f2 f2 f2 f3 w6 w7 w7 w7 w7 w8 g1 g  g  g  g  g  g  g  g4 m1")
         .sprites("m  m5 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f2 f2 f3 .  .  g1 g  g  g  g  g  g  g  g4 m1 m")
         .sprites("m  m8 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f3 .  g1 g  g  g  g  g  g  g  g2 m6 m")
         .sprites("m5 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f3 g3 g  g  g  g  g  g  g  g  g2 m6")
         .sprites("m8 f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f  f5 .  g3 g  g  g  g  g  g  g  g  g2")
         .sprites("f  f  f  f  f  f  f7 f7 f7 f7 f  f  f  f  f  f  f  f  f  f  f8 .  .  g3 g  g  g  g  g  g  g  g4")
         .sprites("f  f  f  f  f  f8 .  .  .  .  f6 f  f  f  f  f  f  f  f7 f8 w1 w2 w2 w2 w3 g3 g  g  g  g  g  g2")
         .sprites("f  f  f  f  f8 g1 g  g  g  g  g2 f6 f  f  f  f  f  f8 w1 w2 w  w  w  w  w  w3 g3 g  g  g  g  g4")
         .sprites("f  f  f  f8 g1 g  g4 C1 C2 g3 g  g2 f6 f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  r  r  r  r  r")
         .sprites("f  f  f5 g1 g  g4 EL C3 C4 EL g3 g  g2 f4 f  f  f8 w4 w  w  w  w  w  w  w  w  w  w3 g3 g  g  g")
         .sprites("f  f  f5 g3 g  g2 EL .  .  EL g1 g  g4 f4 f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w3 g3 g  g")
         .sprites("f  f  f  f3 g3 g  g2 .  .  g1 g  g4 f1 f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w3 ."));

    addSection(
      Map.create("WORLD-MAP-6-5")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m4 m  m  m  m  m  m  m  m  m  m  m  m  m  m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m  m5 r1 r  r  r  r  r  r  r  r  r  r")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m1 m  m  m  m  m  m5 r  m1 m2 m2 m2 m2 m2 m2 m2 m2 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m5 r  m4 m  m  m7 m7 m7 m7 m7 m7 m7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m5 r  m4 m  m8 f1 f2 f2 f2 f2 f2 f2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m5 .  m6 m8 f1 f  f  f  f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m5 .  .  f1 f  f  f7 f7 f7 f7 f7 f7")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m4 m  m  m  m  m  m5 .  f1 f  f  f8 r1 r  r  r  r  r2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w5 m6 m  m  m  m  m  m5 f1 f  f  f8 r1 r4 g1 g  g  g2 r3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  m4 m  m  m  m  m5 f4 f  f5 r1 r4 g1 g  g4 g3 g  g2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m6 m7 m7 m  m  m5 f4 f  f5 r  g1 g  g4 V1 V2 g3 g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  r  r  r  r  r2 m4 m  m5 f4 f  f5 r  g3 g  g2 V3 V4 g1 g")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w7 w8 m1 m2 m2 m3 r  m4 m  m5 f4 f  f5 r3 r2 g3 g  g2 g1 g  g4")
         .sprites("w  w  w  w  w  w  w  w  w7 w7 w8 m1 m2 m  m  m  m5 r  m4 m  m5 f4 f  f  f3 r3 r2 g3 g  g  g4 r1")
         .sprites("w  w  w  w  w  w  w  w8 m1 m2 m2 m  m  m  m  m  m5 r  m4 m  m5 f6 f  f  f  f3 r3 r  r  r  r  r4")
         .sprites("w7 w7 w7 w7 w7 w7 w8 m1 m  m7 m7 m7 m7 m7 m7 m7 m8 r  m4 m  m  m3 f6 f  f  f  f2 f2 f2 f2 f2 f2")
         .sprites("g  g  g  g  g2 .  m1 m  m5 r1 r  r  r  r  r  r  r  r  m4 m  m  m  m3 f6 f  f  f  f  f  f  f  f")
         .sprites("g  g  g  g4 .  m1 m  m  m8 r  m1 m2 m2 m2 m2 m2 m3 r  m6 m7 m  m  m  m3 f6 f7 f7 f7 f7 f7 f7 f7")
         .sprites("g4 .  m1 m2 m2 m  m7 m8 .  r  m6 m  m  m  m  m  m5 r3 r  r2 m4 m  m  m  m2 m2 m2 m2 m2 m2 m2 m2")
         .sprites("m2 m2 m  m  m  m8 .  .  .  r  .  m6 m7 m7 m  m  m  m2 m3 r  m4 m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m5 .  r1 r  r  r4 .  .  .  .  m6 m  m  m  m5 r  m4 m  m  m  m  m  m  m  m  m  m  m")
         .sprites("m  m  m  m  m8 .  r  .  .  f1 f2 f2 f2 f3 .  m4 m  m  m5 r  m6 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m")
         .sprites("m  m  m  m5 .  .  r  .  f1 f  f  f  f  f  f3 m4 m  m  m5 r3 r  r  r  r  r  r  r  r  r  r  r2 m6")
         .sprites("m6 m  m  m5 .  .  r  .  f4 f  f  f  f  f  f5 m4 m  m  m  m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 r3 r")
         .sprites(".  m6 m7 m8 .  .  r  .  f4 f  f  f  f  f  f5 m4 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m2 m2")
         .sprites("r1 r  r  r  r  r  r  .  f4 f  f  f  f  f  f8 m4 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("r  m1 m2 m2 m2 m3 r  .  f4 f  f  f  f  f5 m1 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m")
         .sprites("r4 m4 m  m  m  m5 r  .  f6 f  f  f  f  f5 m4 m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m7 m  m  m  m  m")
         .sprites("g2 m4 m  m  m  m5 r  .  .  f6 f  f  f  f8 m4 m  m  m8 s1 s  s  s  s  s  s  s  s2 m6 m  m  m  m")
         .sprites("g4 m4 m  m  m  m5 r3 r  r2 .  f6 f7 f8 m1 m  m  m8 s1 s  s  s  s  s  s  s  s  s  s2 m6 m  m  m")
         .sprites(".  m4 m  m  m  m  m2 m3 r  m1 m2 m3 .  m6 m7 m8 s1 s  s  s  s  s4 f1 f2 f3 s3 s  s  s2 m6 m7 m8"));

    addSection(
      Map.create("WORLD-MAP-6-6")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m5 r  m4 m  m  m  m  m  m  m  m5 r  m6 m7 m7 m  m")
         .sprites("m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m7 m8 r  m4 m  m  m7 m7 m7 m7 m  m5 r3 r  r  r2 m4 m")
         .sprites("r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r4 m4 m  m5 r1 r  r  r2 m4 m  m2 m2 m3 r  m4 m")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 r  m1 m2 m2 m2 m  m  m5 r3 r  r  r  m6 m  m  m  m5 r  m4 m")
         .sprites("m7 m  m  m  m7 m7 m7 m7 m  m  m  m5 r  m4 m  m  m  m  m  m  m3 r  r  r  r2 m6 m  m  m5 r  m4 m")
         .sprites("f3 m6 m  m5 r  r  r  r2 m4 m  m  m5 r  m4 m  m  m  m  m  m  m5 r3 r  r  r  r2 m4 m  m5 r  m4 m")
         .sprites("f  f3 m6 m  m2 m2 m3 r  m4 m  m  m5 r  m6 m7 m7 m7 m  m  m  m  m2 m3 r  r  r4 m4 m  m5 r  m4 m")
         .sprites("f  f  f3 m6 m  m  m5 r  m6 m7 m  m5 r3 r  r  r  r2 m4 m  m  m  m  m5 r  m1 m2 m  m  m5 r  m6 m7")
         .sprites("f6 f  f  f3 m6 m  m5 r3 r  r2 m4 m  m2 m2 m2 m3 r  m6 m7 m7 m7 m7 m8 r  m4 m  m  m  m5 r3 r  r")
         .sprites("r2 f6 f  f  f3 m4 m  m2 m3 r  m4 m  m  m  m  m5 r3 r  r  r  r  r  r  r4 m4 m  m  m  m  m2 m2 m2")
         .sprites("r3 r2 f4 f  f5 m4 m  m  m5 r  m6 m7 m7 m  m  m  m2 m3 r  m1 m2 m2 m2 m2 m  m  m  m  m  m  m  m")
         .sprites("g2 r  f4 f  f5 m4 m  m  m5 r3 r  r  r2 m4 m  m  m  m5 r  m4 m  m  m  m7 m7 m7 m7 m7 m7 m7 m7 m7")
         .sprites("g4 r  f4 f  f5 m4 m  m  m  m2 m2 m3 r  m6 m7 m7 m7 m8 r  m4 m  m  m8 f1 f2 f2 f2 f2 f2 f2 f2 f2")
         .sprites("r1 r4 f4 f  f5 m4 m  m  m  m  m  m5 r  r  r  r  r  r  r4 m4 m  m5 f1 f  f  f  f  f  f  f  f  f")
         .sprites("r4 f1 f  f  f5 m4 m  m  m  m  m  m5 r  m1 m2 m2 m2 m2 m2 m  m  m8 f4 f  f  f  f  f  f  f  f  f")
         .sprites("f1 f  f  f  f8 m4 m  m  m  m  m  m5 r  m4 m  m  m  m  m  m  m8 f1 f  f  f  f  f  f  f  f  f  f")
         .sprites("f  f  f  f8 m1 m  m  m7 m7 m7 m7 m8 r  m4 m  m  m  m  m  m5 f1 f  f  f  f  f  f  f7 f7 f7 f  f")
         .sprites("f  f  f8 m1 m  m  m5 r1 r  r  r  r  r4 m4 m  m7 m7 m7 m7 m8 f6 f7 f7 f7 f7 f  f5 r3 r  r2 f6 f7")
         .sprites("f7 f8 m1 m  m  m  m5 r  m1 m2 m2 m2 m2 m  m5 r1 r  r  r  r  r  r  r  r  r2 f4 f  f2 f3 r3 r  r2")
         .sprites("m2 m2 m  m  m  m  m5 r  m4 m  m  m  m  m  m5 r  m1 m2 m2 m3 f1 f2 f2 f3 r  f4 f  f  f  f2 f3 r3")
         .sprites("m  m  m  m  m  m  m5 r  m4 m  m  m7 m7 m7 m8 r  m4 m  m  m5 f4 f  f  f5 r  f6 f7 f7 f7 f7 f8 .")
         .sprites("m  m  m  m  m  m  m5 r  m4 m  m5 r1 r  r  r  r  m4 m  m  m5 f4 f  f  f5 r3 r  r  r  r  r  r  r")
         .sprites("m  m  m  m  m  m  m5 r  m4 m  m5 r  m1 m2 m3 r  m4 m  m  m5 f4 f  f  f  f3 .  +- -- -+ .  .  .")
         .sprites("m7 m7 m7 m7 m7 m7 m8 r  m6 m7 m8 r  m4 m  m5 r  m4 m  m  m8 f4 f  f  f  f5 -/ |- .. -| /- .  .")
         .sprites("r  r  r  r  r  r  r  r  r  r  r  r4 m4 m  m5 r  m4 m  m8 f1 f  f  f  f  f8 /. .. CL CL ./ .  .")
         .sprites("m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m2 m  m  m5 r  m4 m5 f1 f  f  f7 f7 f8 .  /, CL .. CL ,/ .  .")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r  m4 m5 f4 f  f5 r2 .  .  .  /: CL .. .. :/ .  r1")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m8 r  m4 m5 f4 f  f5 r3 r2 .  .  +_ _| .. |_ _+ .  r")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r1 r4 m4 m5 f4 f  f  f3 r3 r2 .  .  .  .  .  r1 r  r")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m5 r  m1 m  m5 f6 f  f  f  f3 r3 r  r  r  r  r  r  r  r")
         .sprites("m7 m7 m  m  m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m3 f4 f  f  f  f3 r3 r  r  r  r  r  r  r")
         .sprites(".  .  m6 m  m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m5 f4 f  f  f  f  f2 f3 r3 r  r  r4 f1 f2"));

    addSection(
      Map.create("WORLD-MAP-6-7")
         .sprites("m  m  m  m7 m7 m7 m7 m  m  m5 .  m4 m  m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 g1 g  g  g2 m6 m7 m8 .  m4 m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 g  g  g  g  g2 .  .  .  m4 m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 g  g  g  g  g  m1 m2 m2 m  m  m  m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m5 g3 g  g  g  g  m4 m  m  m  m  m  m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m8 g1 g  g  g  g  m4 m  m  m  m  m5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m5 g1 g  g  g  g  g4 m4 m  m  m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m8 g3 g  g  g  g4 m1 m  m  m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  g3 g  g4 m1 m  m  m  m  m  m  m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m2 m2 m2 m2 m2 m2 m  m  m  m  m  m  m  m  m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m7 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f3 m6 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f3 m6 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m5 w6 w7 w7 w7 w7 w7 w7 w  w  w  w  w  w  w")
         .sprites("f  f  f3 m6 m  m  m  m  m  m  m  m  m  m  m  m  m  m5 .  .  .  .  .  .  .  w6 w7 w  w  w  w  w")
         .sprites("f  f  f  f3 m4 m  m  m  m  m  m  m  m  m  m  m  m  m  m3 .  .  D1 D2 D2 D2 D3 .  w6 w7 w  w  w")
         .sprites("f  f  f  f5 m6 m  m  m  m  m  m  m  m  m  m  m  m  m  m5 .  .  D4 w  w  w  D5 .  .  .  w6 w  w")
         .sprites("f  f  f  f  f3 m6 m  m  m  m  m  m  m  m  m  m  m  m7 m8 .  .  .  .  .  w  .  .  .  .  .  w4 w")
         .sprites("f6 f  f  f  f  f3 m6 m  m  m  m  m  m  m  m  m  m8 .  .  .  .  .  .  w1 w  w2 w2 w2 w2 w2 w  w")
         .sprites("r2 f6 f  f  f  f  f3 m6 m  m  m  m  m  m  m  m8 .  .  .  .  w1 w2 w2 w  w  w  w  w  w  w  w  w")
         .sprites("r  r2 f4 f  f  f  f  f3 m6 m  m  m  m  m  m5 .  .  w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  f6 f  f  f  f  f  f3 m4 m  m  m  m  m5 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r2 f4 f  f  f  f  f5 m4 m  m  m  m  m5 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  f4 f  f  f  f  f5 m4 m  m  m  m  m8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  f4 f  f  f  f  f5 m6 m  m  m  m8 .  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  f4 f  f  f  f  f  f3 m6 m7 m8 .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r4 f4 f  f  f  f  f  f  f2 f3 .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  f1 f  f  f  f  f  f  f  f  f  f3 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r4 f4 f  f  f  f  f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r4 f1 f  f  f  f  f  f  f  f7 f7 f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f1 f  f  f  f  f  f  f  f8 w1 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(Map.create("WORLD-MAP-7-0").repeatSprites(allWater(), 32));
    addSection(Map.create("WORLD-MAP-7-1").repeatSprites(allWater(), 32));

    addSection(
      Map.create("WORLD-MAP-7-2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s1 s  s2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3 s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3 s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 s3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 22));

    addSection(
      Map.create("WORLD-MAP-7-3")
         .sprites("m8 s1 s  s  s  s  m1 m  m  m  m  m3 s  s2 m6 m  m  m  m2 m3 .  f1 f2 f2 f2 f2 f2 f2 f2 f2 f2 f")
         .sprites("s  s  s  s  s  s  m4 m  m  m  m  m8 s  s  s2 m4 m  m  m  m5 .  f4 f  f  f  f  f  f  f  f  f  f")
         .sprites("m1 m2 m2 m3 s3 s  m6 m7 m7 m7 m8 s1 s  s  s4 m4 m  m  m  m5 .  f6 f  f  f  f  f  f  f  f  f  f")
         .sprites("m4 m  m  m  m3 s3 s  s  s  s  s  s  w1 w2 w3 m6 m  m  m  m5 .  .  f6 f  f  f  f  f  f  f  f  f")
         .sprites("m4 m  m  m  m  m3 s3 s  s  s  s  s  w4 w  w  w3 m6 m7 m7 m8 .  .  .  f6 f7 f7 f  f  f  f  f  f7")
         .sprites("m6 m  m  m  m  m  m3 s  s  s  s  s  w4 w  w  w  w2 w2 w3 .  .  .  .  .  .  .  f6 f  f  f  f8 .")
         .sprites("s2 m4 m  m  m  m  m5 s  s  s  s  s  w6 w  w  w  w  w  w  w2 w2 w3 .  .  .  .  .  f6 f7 f8 .  .")
         .sprites("s  m6 m7 m7 m7 m7 m8 s  s  s  s  s  s2 w6 w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  .")
         .sprites("s3 s  s  s  s  s  s  s  s  s  s  s  s  .  w4 w  w  w  w  w  w  w  w  w2 w3 .  .  .  .  .  .  .")
         .sprites("w3 s3 s  s  s  s  s  s  s  s  s  s  s4 w1 w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w2")
         .sprites("w  w2 w3 s3 s  s  s  s  s  s  s4 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w3 s  s  s  s  s4 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w5 s3 s  O  s4 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w3 s3 s4 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w5 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w  w  w  w  w  w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 16));

    addSection(
      Map.create("WORLD-MAP-7-4")
         .sprites("f  f  f  f  f3 g3 g  g  g  g  g4 f1 f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3")
         .sprites("f  f  f  f  f  f3 .  .  .  .  f1 f  f  f8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f2 f3 D2 D2 f6 f7 f8 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f  f5 w7 w7 w7 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f  f  f  f  f  f  f5 .  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  f6 f7 f7 f7 f7 f7 f8 w1 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w1 w2 w2 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 22));

    addSection(
      Map.create("WORLD-MAP-7-5")
         .sprites(".  m4 m  m  m  m  m  m5 r  m4 m  m5 s1 s  s  s  s  s  s  s  s  f1 f  f  f  f3 s  s  s  s  s  s")
         .sprites("w3 m4 m  m  m  m  m  m5 r  m4 m  m8 s  s  s  s  s  s  s  s  s4 f4 f  f  f  f5 s  s  s  s  s  s")
         .sprites("w5 m6 m  m  m  m  m  m5 r  m4 m5 s1 s  s  s  s  s  s  s  s  f1 f  f  f  f  f8 s  s  s  s  s  s")
         .sprites("w  w3 m6 m  m  m  m  m5 r  m4 m5 s  s  s  s  s  s  s  s  s  f6 f  f  f  f8 s1 s  s  s  s  s  s")
         .sprites("w  w  w3 m6 m  m  m  m5 r  m6 m8 s3 s  s  s  s  s  s  s  s  s2 f6 f7 f8 s1 s  s  s  s  s  s  s")
         .sprites("w  w  w  w3 m6 m  m  m5 r  w1 w2 w3 s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w3 m6 m7 m8 w  w  w  w5 s  s  s  s  s  s  s  s  s  s  s  s4 f1 f2 f2 f3 s  s  s  s")
         .sprites("w  w  w  w  w  w3 .  w1 w  w  w  w5 s3 s  s  s  s  s  s  s  s  s4 f1 f2 f  f  f  f5 s  s  s  s")
         .sprites("w  w  w  w  w  w  w2 w  w  w  w  w  w3 s3 s  s  s  s  s  f1 f2 f2 f  f  f  f  f7 f8 s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  s  s  f6 f7 f7 f7 f7 f7 f8 s1 s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w3 s3 s  s  s  s  s  s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 s3 s  s  s  s  s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w3 s3 s  s  s  s  s  s  s  s")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w2 w2 w2")
         .repeatSprites(allWater(), 22));

    addSection(
      Map.create("WORLD-MAP-7-6")
         .sprites("s  s  s2 m6 m  m  m  m  m  m  m  m  m  m5 r  m4 m  m  m5 f4 f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s2 m6 m  m  m  m  m  m  m  m  m5 r  m4 m  m  m5 f6 f  f  f  f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s  s2 m6 m7 m  m  m  m  m  m  m5 r  m4 m  m  m  m3 f4 f  f  f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s  s  s  s2 m6 m7 m  m  m  m  m5 r  m6 m7 m  m  m5 f4 f  f  f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s  s  s  s  s  s2 m6 m7 m  m  m5 r3 r  r2 m6 m7 m8 f6 f  f  f  f  f  f  f  f  f  f  f")
         .sprites("s  s  s  s  s  s  s  s  s  s  s2 m6 m  m  m2 m3 r3 r  r  r  r2 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s2 m6 m  m  m  m2 m2 m2 m3 r3 r  r  r  r  r  r  r  r  r  r2 f6")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s2 m6 m7 m  m  m  m  m  m2 m2 m2 m2 m2 m2 m2 m2 m2 m3 r3 r")
         .sprites("s  s  s  s  s  s  s  s  s  s  s  s  s  s2 .  m6 m  m  m  m  m  m  m  m  m  m  m  m  m  m  m2 m2")
         .sprites("s  s  s  s  s  s  s  s4 w1 w2 w2 w2 w2 w3 .  .  m6 m  m  m  m  m  m  m7 m7 m7 m7 m7 m  m  m  m")
         .sprites("s  s  s  s  s4 w1 w2 w2 w  w  w  w  w  w  w3 .  .  m4 m  m  m  m  m8 d1 d  d  d  d2 m6 m7 m7 m")
         .sprites("s  s  s  s4 w1 w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m  m5 d1 d  d  d  d  d  d  d  d2 m6")
         .sprites("w1 w2 w2 w2 w  w  w  w  w  w  w  w  w  w  w5 .  .  m4 m  m  m  m5 d  d  d  d  d  d  d  d  d  d2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w5 .  .  m6 m  m  m  m5 d  d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m  m  m5 d3 d  d  d  d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m  m  m3 d3 d  d  d  d  d  d  d  d4")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m  m  m3 d3 d  d  d  d  d4 m1 m2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m  m  m2 m2 m3 .  m1 m2 m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  m6 m7 m7 m7 m8 .  m6 m7 m7 m8")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  .  .  .  .  .")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  .  .  .  .  w1 w2 w2 w2")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w2 w2 w2 w2 w2 w2 w  w  w  w")
         .repeatSprites(allWater(), 11));

    addSection(
      Map.create("WORLD-MAP-7-7")
         .sprites("f  f  f  f  f  f  f5 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f  f  f8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f  f7 f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f5 .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f  f  f  f8 .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("f7 f7 f8 .  .  w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("r  r  r  r  r  r  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m3 r  m1 m2 m2 m3 w6 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 r  m6 m7 m  m  m3 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m5 r3 r  r2 m4 m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m2 m3 r  m4 m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m5 r  m4 m  m5 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m5 r  m4 m  m8 w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m5 r  m6 m8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m4 m  m8 r  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m  m8 .  r  .  w4 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("m8 .  .  r  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  .  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites(".  w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .sprites("w2 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w")
         .repeatSprites(allWater(), 11));

    joinSections();
  };

  var joinSections = function() {
    var worldMap = Map.create(MapConstants.WORLD_MAP, mapOptions).tileMapping(tiles);
    var firstSection = sections[0][0];

    for (var y = 0; y < SECTIONS_PER_ROW; y++) {
      for (var r = 0; r < firstSection.rows; r++) {
        var fullWorldMapRow = [];
        for (var x = 0; x < SECTIONS_PER_ROW; x++) {
          var section = sections[y][x];
          if (section.tiles[r]) {
            fullWorldMapRow.push(section.tiles[r].join(" ").trim());
          }
        }
        worldMap.sprites(fullWorldMapRow.join(" ").trim());
      }
    }
  };

  return {
    init: init
  };
});