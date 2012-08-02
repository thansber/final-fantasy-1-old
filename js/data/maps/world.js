define(/* WorldMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
    
  var rowIndex = -1;
  
  var mapOptions = {
    wrapsX: true, 
    wrapsY: true
  };
  
  var sections = [];
  var SECTIONS_PER_ROW = 8;
    
  var tiles = {
      "." : {y:3, x:8, desc:"plains"},
      "..": {y:0 ,x:13, desc:"town empty"},

      "BR": {y:0, x:0, desc:"bridge"},
      "CV": {y:5, x:5, desc:"cave"},
      "C1": {y:0, x:16, desc:"castle upper left"},
      "C2": {y:0, x:17, desc:"castle upper right"},
      "C3": {y:1, x:16, desc:"castle lower left"},
      "C4": {y:1, x:17, desc:"castle lower right"},
      "GA": {y:3, x:14, desc:"gaia"},
      "LF": {y:2, x:13, desc:"lefein"},
      "M1": {y:4, x:16, desc:"mirage tower upper left"},
      "M2": {y:4, x:17, desc:"mirage tower upper right"},
      "M3": {y:5, x:16, desc:"mirage tower lower left"},
      "M4": {y:5, x:17, desc:"mirage tower lower right"},
      "O" : {y:5, x:1, desc:"hole"},
      "ON": {y:3, x:14, desc:"onrac"},
      "T1": {y:0, x:14, desc:"temple of fiends upper middle"},
      "T2": {y:0, x:15, desc:"temple of fiends upper right"},
      "T3": {y:1, x:13, desc:"temple of fiends lower left"},
      "T4": {y:1, x:14, desc:"temple of fiends lower middle"},
      "T5": {y:1, x:15, desc:"temple of fiends lower right"},
      "WF": {y:5, x:14, desc:"waterfalls"},
      "^-": {y:2, x:10, desc:"coneria castle upper left"},
      "-^": {y:2, x:11, desc:"coneria castle upper right"},
      "[-": {y:3, x:10, desc:"coneria castle lower left"},
      "-]": {y:3, x:11, desc:"coneria castle lower middle"},
      "+-": {y:0, x:10, desc:"wall corner upper left"},
      "-+": {y:0, x:11, desc:"wall corner upper right"},
      "+_": {y:5, x:9, desc:"wall corner lower left"},
      "_+": {y:5, x:12, desc:"wall corner lower right"},
      "+.": {y:5, x:7, desc:"wall corner grass lower left"},
      ".+": {y:5, x:8, desc:"wall corner grass lower right"},
      "-/": {y:1, x:9, desc:"wall upper left outer"},
      "|-": {y:1, x:10, desc:"wall upper left inner"},
      "-|": {y:1, x:11, desc:"wall upper right inner"},
      "/-": {y:1, x:12, desc:"wall upper right outer"},
      "/.": {y:2, x:9, desc:"wall middle left"},
      "./": {y:2, x:12, desc:"wall middle right"},
      "/,": {y:3, x:9, desc:"wall lower left"},
      ",/": {y:3, x:9, desc:"wall lower right"},
      "--": {y:4, x:8, desc:"wall upper"},
      "_|": {y:5, x:10, desc:"wall gate left"},
      "|_": {y:5, x:11, desc:"wall gate right"},
      
      // all ocean/mountain/forest tiles have descs 
      // in the direction the tile points
      "f" : {y:1, x:1, desc:"forest"},
      "f1": {y:0, x:0, desc:"forest upper left"},
      "f2": {y:0, x:1, desc:"forest upper"},
      "f3": {y:0, x:2, desc:"forest upper right"},
      "f4": {y:1, x:0, desc:"forest left"},
      "f5": {y:1, x:2, desc:"forest right"},
      "f6": {y:2, x:0, desc:"forest lower left"},
      "f7": {y:2, x:1, desc:"forest lower"},
      "f8": {y:2, x:2, desc:"forest lower right"},
      "m" : {y:1, x:7, desc:"mountains"},
      "m1": {y:0, x:6, desc:"mountains upper left"},
      "m2": {y:0, x:7, desc:"mountains upper"},
      "m3": {y:0, x:8, desc:"mountains upper right"},
      "m4": {y:1, x:6, desc:"mountains left"},
      "m5": {y:1, x:8, desc:"mountains right"},
      "m6": {y:2, x:6, desc:"mountains lower left"},
      "m7": {y:2, x:7, desc:"mountains lower"},
      "m8": {y:2, x:8, desc:"mountains lower right"},
      "w" : {y:1, x:4, desc:"ocean"},
      "w1": {y:0, x:3, desc:"coastline upper left"},
      "w2": {y:0, x:4, desc:"coastline upper"},
      "w3": {y:0, x:5, desc:"coastline upper right"},
      "w4": {y:1, x:3, desc:"coastline left"},
      "w5": {y:1, x:5, desc:"coastline right"},
      "w6": {y:2, x:3, desc:"coastline lower left"},
      "w7": {y:2, x:4, desc:"coastline lower"},
      "w8": {y:2, x:5, desc:"coastline lower right"},
      
      "d" : {y:5, x:6, desc:"desert"},
      "d1": {y:3, x:6, desc:"desert upper left"},
      "d2": {y:3, x:7, desc:"desert upper right"},
      "d3": {y:4, x:6, desc:"desert lower left"},
      "d4": {y:4, x:7, desc:"desert lower right"},
      "g" : {y:5, x:0, desc:"grass"},
      "g1": {y:3, x:0, desc:"grass upper left"},
      "g2": {y:3, x:1, desc:"grass upper right"},
      "g3": {y:4, x:0, desc:"grass lower left"},
      "g4": {y:4, x:1, desc:"grass lower right"},
      "r" : {y:5, x:2, desc:"river"},
      "r1": {y:3, x:2, desc:"river upper left"},
      "r2": {y:3, x:3, desc:"river upper right"},
      "r3": {y:4, x:2, desc:"river lower left"},
      "r4": {y:4, x:3, desc:"river lower right"},
      "s" : {y:5, x:4, desc:"swamp"},
      "s1": {y:3, x:4, desc:"swamp upper left"},
      "s2": {y:3, x:5, desc:"swamp upper right"},
      "s3": {y:4, x:4, desc:"swamp lower left"},
      "s4": {y:4, x:5, desc:"swamp lower right"},
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  f  f  f  f3 m6 m  m  m  m  m  m  m  m  m  m")
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f  f  w1"));
    
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w5 f4 f  f  f  f  f  f  f  f  f  f5 m4 m  m  m  m  m  m  m  m  m")
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
         .sprites("m  m  m  m3 f6 f  f  f  f  f  f  f2 m6 m  m  m  m  m5 r3 r  r  r  r  r4 m4 m  m  m  m  m  m  m")
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
         .sprites("m7 m7 m7 m7 m7 m  m  m  m  m  m2 m2 m3 f6 f7 f7 f7 f7 f  f  f5 m6 m  m  m  m5 r1 r4 m4 m  m5 f1")
         .sprites("f3 d1 d  d  d2 m6 m7 m7 m  m  m  m  m  m2 m2 m2 m3 f6 f  f  f  f3 m6 m  m  m5 r  m1 m  m  m5 f4")
         .sprites("f5 d  d  d  d  d  d  d2 m6 m  m  m  m  m  m  m  m  m3 f6 f  f  f  f3 m4 m  m5 r  m4 m  m  m8 f4")
         .sprites("f8 d  d  d  d  d  d  d  d2 m6 m7 m  m  m  m  m  m  m  m3 f4 f  f  f5 m6 m  m5 r  m4 m  m5 f1 f")
         .sprites("d1 d  d  d  d  d  d  d  d  d  d2 m6 m  m  m  m  m  m  m5 f6 f  f  f  f3 m4 m5 r  m4 m  m5 f4 f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d2 m4 m  m  m  m  m  m  m3 f4 f  f  f8 m6 m8 r  m4 m  m8 f4 f")
         .sprites("d  d  d  d  d  d  d  d  d  d  d  d  m4 m  m  m  m  m  m  m5 f4 f  f5 r1 r  r  r4 m4 m5 f1 f  f")
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f  f  f  f8 w1 w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f8 w1 w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f  f  f8 w1 w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 .  f6 f7 f8 w1 w  w  w  w  w")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 .  .  w1 w2 w  w  w  w  w  w8")
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
         .sprites("w  w8 f1 f3 r  f1 f2 f  f  f  f8 m4 m  m  m8 f1 f  f  f8 w1 w2 w2 w3 .  .  f6 f7 f  f  f  f  f")
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m5 g1 g4 m1 m  m  m  m  m  m  m  m")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 m1 m  m  m  m2 m2 m  m  m  m  m  m  m  m  m7")
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
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f5 d3 d  d  d  d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f6 f  f  f  f2 f2 f3 d3 d  d  d")
         .sprites("w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w3 f4 f  f  f  f  f  f  f  f  f")
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
         .sprites("f  f  f  f  f  f  f  f  f3 m6 m7 m7 m  m  m  m  m3 f4 f  f  f5 r  f4 f  f8 w1 w2 w2 w3 f6 f7 f8")
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
         .sprites("f  f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w8 f1 f2 f  f  f"));
    
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
         .sprites("f  f  f  f  f  f  f8 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));
    
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
         .sprites("w  w  w  w  w  w4 .  .  w5 w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  w"));

    addSection(Map.create("WORLD-MAP-4-0").sprites(""));
    addSection(Map.create("WORLD-MAP-4-1").sprites(""));
    addSection(Map.create("WORLD-MAP-4-2").sprites(""));
    addSection(Map.create("WORLD-MAP-4-3").sprites(""));
    addSection(Map.create("WORLD-MAP-4-4").sprites(""));
    addSection(Map.create("WORLD-MAP-4-5").sprites(""));
    addSection(Map.create("WORLD-MAP-4-6").sprites(""));
    addSection(Map.create("WORLD-MAP-4-7").sprites(""));

    addSection(Map.create("WORLD-MAP-5-0").sprites(""));
    addSection(Map.create("WORLD-MAP-5-1").sprites(""));
    addSection(Map.create("WORLD-MAP-5-2").sprites(""));
    addSection(Map.create("WORLD-MAP-5-3").sprites(""));
    addSection(Map.create("WORLD-MAP-5-4").sprites(""));
    addSection(Map.create("WORLD-MAP-5-5").sprites(""));
    addSection(Map.create("WORLD-MAP-5-6").sprites(""));
    addSection(Map.create("WORLD-MAP-5-7").sprites(""));

    addSection(Map.create("WORLD-MAP-6-0").sprites(""));
    addSection(Map.create("WORLD-MAP-6-1").sprites(""));
    addSection(Map.create("WORLD-MAP-6-2").sprites(""));
    addSection(Map.create("WORLD-MAP-6-3").sprites(""));
    addSection(Map.create("WORLD-MAP-6-4").sprites(""));
    addSection(Map.create("WORLD-MAP-6-5").sprites(""));
    addSection(Map.create("WORLD-MAP-6-6").sprites(""));
    addSection(Map.create("WORLD-MAP-6-7").sprites(""));

    addSection(Map.create("WORLD-MAP-7-0").sprites(""));
    addSection(Map.create("WORLD-MAP-7-1").sprites(""));
    addSection(Map.create("WORLD-MAP-7-2").sprites(""));
    addSection(Map.create("WORLD-MAP-7-3").sprites(""));
    addSection(Map.create("WORLD-MAP-7-4").sprites(""));
    addSection(Map.create("WORLD-MAP-7-5").sprites(""));
    addSection(Map.create("WORLD-MAP-7-6").sprites(""));
    addSection(Map.create("WORLD-MAP-7-7").sprites(""));

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