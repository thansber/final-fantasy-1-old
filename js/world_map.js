var WorldMap = (function() {
  
  var Config = new Map.Config({
    size:16
  });
  
  // Row 0
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,0
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,1
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,2
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,3
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,4
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,5
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,6
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,7
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,8
  // 0,9
  Config.addTileset(0, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwxssssssss"
                       ,"wwwwwwxsssssssss"]);
  // 0,10
  Config.addTileset(0, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"ssxwwwwwwwwwwwww"
                       ,"ssssxwwwwwwwwwww"]);
  
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,11
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,12
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,13
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,14
  Config.addTileset(0, Map.ALL_SAME, "w"); // 0,15
  
  // 1,0
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwxf"
                       ,"wwwwwwwwwwwwwxff"
                       ,"wwwwwwwwwwwwxfff"
                       ,"wwwwwwwwwwwwffff"
                       ,"wwwwwwwwwwwwffff"
                       ,"wwwwwwwwwwwxffff"]);
  // 1,1
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwx       xw"
                       ,"wwwwwx       mmm"
                       ,"wwwww  mmm  mmmm"
                       ,"wwwwx mmmm  mmmm"
                       ,"wwwx mmmmmggggmm"
                       ,"wwx  mmmmggggggg"
                       ,"wx  mmmmmgggggg*"
                       ,"x   mmmmgggggggg"
                       ,"   mmmmgggggggmm"
                       ,"fffmmmmgggggggmm"
                       ,"fffmmmmmggggg*mm"
                       ,"fffmmmmmmggggggg"
                       ,"fffmmmmmmmmmgggg"
                       ,"ffffmmmmmmmmmmmm"
                       ,"fffffmmmmmmmmmmm"]);
  // 1,2
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmrrrrrrmmmmmm"
                       ,"mmmrrrrrrrrrrrmm"
                       ," mmrrrrrrrrrrrrr"
                       ,"mmmrrrrrrrrrrrmm"
                       ,"mmmmmmmrrrrrrmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"gmmmmmmmmmmmmmmm"
                       ,"gfffffmmmmmmmmmm"
                       ," fffffffmmmmmmmm"
                       ,"mmmfffffffmmmmmm"]);
  // 1,3
  Config.addTileset(1, ["wwwwwwwwwwwwx   "
                       ,"wwwwwwx      mmm"
                       ,"wwwxmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"mmmmmmmmmmmmmmmm"
                       ,"rrrmmmmmmmmmmmmm"
                       ,"mmrrrrrmmmmmmmmm"
                       ,"mmmmmmrmmmmmmmmm"
                       ,"mmmmmmrmmmmmmmmm"
                       ,"mmmmmmrmmmmmmmmm"
                       ,"mmmmmmrmmmmmmmmm"
                       ,"mm@@@@F@mmmmmmmm"
                       ,"mmrrrrrrmmmmmmmm"
                       ,"mmrrrrrrmmmmmmmm"]);
  // 1,4
  Config.addTileset(1, ["                "
                       ,"mmmmmmmmmmmmm   "
                       ,"mmmmmmmmmmmmm   "
                       ,"mmmmmmmmmmmmxwww"
                       ,"mmmmmmmmmxwwwwww"
                       ,"mmmmmmmxwwwwwwww"
                       ,"mmmmmmxwwwwwwwww"
                       ,"mmmmmxwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmxwwwwwwwwwwww"
                       ,"mmxwwwwwwwwwwwww"
                       ,"m wwwwwwwwwwwwww"
                       ,"m wwwwwwwwwwwwww"
                       ,"m wwwwwwwwwwwwww"
                       ,"m wwwwwwwwwwwwww"
                       ,"mmwwwwwwwwwwwwww"]);
  // 1,5
  Config.addTileset(1, ["       xwwwwwwww"
                       ,"       xwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
  Config.addTileset(1, Map.ALL_SAME, "w"); // 1,6
  // 1,7
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwxs"
                       ,"wwwwwwwwwwwwwxff"
                       ,"wwwwwwwwwwwwxfff"
                       ,"wwwwwwwwwwwxffff"
                       ,"wwwwwwwwwwxfffff"
                       ,"wwwwwwwwwxfffffx"]);
  // 1,8
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwxsss"
                       ,"wwwwwwwwwwwxssss"
                       ,"wwwwwwwwwxffssss"
                       ,"wwwwwwwxffffssss"
                       ,"wwwwwwxffffffffs"
                       ,"wwwwwxfffffffffx"
                       ,"wxsssffffffffxww"
                       ,"sssssfffffffxwww"
                       ,"sssffffffxwwwwww"
                       ,"ffffffffxwwwwwww"
                       ,"fffffffxwwwwwwww"
                       ,"ffffffxwwwwwwxss"
                       ,"ffffxwwwwwwxssss"
                       ,"wwwwwwwwwwxsssss"]);
  // 1,9
  Config.addTileset(1, ["wwwwwxssssssssmm"
                       ,"sssssssssssmmmmm"
                       ,"sssssssssssmmmmm"
                       ,"sssssssssxwwwwww"
                       ,"ssssssssxwwwwwww"
                       ,"ssssssxwwwxfffff"
                       ,"sssxwwwwxfffffff"
                       ,"wwwwwwwxffffffff"
                       ,"wwwwwwxfffffffff"
                       ,"wwwwwwffffffffff"
                       ,"wwwwwxffffffffff"
                       ,"wwwxsssssssssmmm"
                       ,"wxssssssssssmmmm"
                       ,"ssssssssssmmmmmm"
                       ,"ssssssssmmmmmmmm"
                       ,"sssssssmmmmmmmmm"]);
  // 1,10
  Config.addTileset(1, ["mmssssssssmmxwww"
                       ,"mmmmssssssmmmxww"
                       ,"mmmmmsssssmmmmxw"
                       ,"wxmmmssssssmmmmx"
                       ,"ww6mmsssssssmmmm"
                       ,"ffffffssssssmmmm"
                       ,"ffffffssssmmmmmm"
                       ,"fffffmmmmmmmmmmm"
                       ,"ffffmmmmmmmmmmmm"
                       ,"fffmmmmmmmmmmmmm"
                       ,"fffmmmmmmmmmmmmm"
                       ,"mmdddddddmmmmmmm"
                       ,"mmddddddddddddmm"
                       ,"mmdddddddddddddm"
                       ,"mmdddddddddddddm"
                       ,"mmdddddddddddddd"]);
  // 1,11
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"                        
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"mwwwwwwwwwwwwwww"
                       ,"mxwwwwwwwwwwwwww"
                       ,"mmwwwwwwwwwwwwww"
                       ,"mmxwwwwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmm wwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmxwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"]);
  // 1,12
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwwm"]);
  // 1,13
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwxmmm"
                       ,"wwwwwwwwwwwxmmmm"
                       ,"wwwwxmmxwxmmmmmm"
                       ,"wwwxmmmmmmmmmmvv"
                       ,"wxmmmmmmmmmmmvvm"
                       ,"xmmmmmmmmmmmg`mm"
                       ,"mmmxxmmmmmmggmmm"
                       ,"mmxwxmmmggggmmmm"]);
  // 1,14
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwx     "
                       ,"wwwwwwwwwx      "
                       ,"wwwwwwx mm      "
                       ,"wwwwwxmmmm      "
                       ,"wwwxmmmm       x"
                       ,"xmmmmmm    xwwww"
                       ,"mmmmmmm   xwwwww"
                       ,"mmmmmm  xwwwwwww"
                       ,"@mmmm  xwwww82ww"
                       ,"#mmxwwwwwwwxxwww"
                       ,"mmxwwwx xx xwwww"
                       ,"mxwwx     xwwwww"
                       ,"mxwx  xx xwwwwww"
                       ,"mm   xwwwwwwwwww"]);
  // 1,15
  Config.addTileset(1, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"  xwwwwwwwwwwwww"
                       ,"   xwwwwwwwwwwww"
                       ,"    wwwwwwwwwwww"
                       ,"wwx xwwwwwwwwwww"
                       ,"wwwx wwwwwwwwwww"
                       ,"wwww62wwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 2,0
  Config.addTileset(2, ["wwwwwwwwwwwfffff"
                       ,"wwwwwwwwwwwfffff"
                       ,"wwwwwwwwwwwfffff"
                       ,"wwwwwwwwwwwxffff"
                       ,"wwwwx  7wwwwxfff"
                       ,"wwwx  x1wwwwwfff"
                       ,"wx   xwwwwwwwfff"
                       ,"w  xwwwwwwwwwfff"
                       ,"w  wwwwwwwwwxfff"
                       ,"w  wwwwwwwwwffff"
                       ,"w xwwwwwwwwwffff"
                       ,"w wwwwwwwwwxffff"
                       ,"w xwwwwwwwxfffff"
                       ,"w  wwwwwwxfffffx"
                       ,"w  xwwwwxffffxww"
                       ,"wx  xwx  ffxwwww"]);
  // 2,1
  Config.addTileset(2, ["ffffffmmmmmmmmmm"
                       ,"ffffffmmmmmmmmmm"
                       ,"ffffffmmmmmmmmmm"
                       ,"fffffffmmmmmmmmm"
                       ,"ffffffffmmmmmmmm"
                       ,"ffffffffxwwwwxmm"
                       ,"fffffffxwwwwwwxm"
                       ,"ffffffxwwwwwwww "
                       ,"fffffxwwwwwwwwwm"
                       ,"fffxwwwwwwwwwwxm"
                       ,"ffxwwwwwwwwwwxmm"
                       ,"fxwwwwwwwwwwxmmm"
                       ,"xwwwwwwwwwxmmmmm"
                       ,"wwwwwwwwxmmmmmmm"
                       ,"wwwwwwwxmmmmmmmm"
                       ,"wwwxmmmmmmmmmmmm"]);
  // 2,2
  Config.addTileset(2, ["mmmmffffffffmmmm"
                       ,"mmmmmffffffffmmm"
                       ,"mmmmmffffffffffm"
                       ,"mmmmmffffffffffm"
                       ,"mmmmmffffffffffm"
                       ,"mmmmfffffffffffm"
                       ,"mmmmfffffffffffm"
                       ,"mmmmffffffffffff"
                       ,"mmmmffffffffffff"
                       ,"mmmmmfffffffffff"
                       ,"mmmmmmffffffffff"
                       ,"mmmmmmmfffffffff"
                       ,"mmmmmmmmffffffff"
                       ,"mmmmmmmmmfffffff"
                       ,"mmmmmmmmmmffffff"
                       ,"mmmmmmmmmmmmffff"]);
  // 2,3
  Config.addTileset(2, ["mmrrrrrrmmmmmmmm"
                       ,"mmmrrrmmmmmmmmmm"
                       ,"mmmmrmmmmmmmmmmm"
                       ,"mmmmrmmmmmmmmmmm"
                       ,"mmmmrmmmmmmmmmmm"
                       ,"mmmmrmmmmmmmmmmm"
                       ,"mmmmrmmmmmmmmmmm"
                       ,"fmmmrrrrrmmmmmmm"
                       ,"fmmmmmmmrmmmmmmm"
                       ,"fmmmmmmmrmmmmmmm"
                       ,"fmmmmmmmrmmmmmmm"
                       ,"fffmmmmmrrrrmmmm"
                       ,"ffffmmmmmmmrmmmm"
                       ,"ffffmmmmmmmrmmmm"
                       ,"fffffmmmmmmrmmmm"
                       ,"mffffmmmmmrrmmmf"]);
  // 2,4
  Config.addTileset(2, ["mmxwwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmmxwwwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmmmmxwwwwwwwww"
                       ,"mmmmmmmmmxwwwwww"
                       ,"mmmmmmmmmmxwwwww"
                       ,"mmmmmmmmmm xwwww"
                       ,"mmmmxwwwwx  xwww"
                       ,"mmmxwwwwwwwx xww"
                       ,"mmxwwwwwwwwww62w"
                       ,"mmwwwwwwwwwwwwww"
                       ,"mmxwwwwwwwwww37w"
                       ,"fffxwwwwwwwwww w"
                       ,"ffffxwwwwwwwww w"
                       ,"fffffxwwwwwwww x"]);
  // 2,5
  Config.addTileset(2, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwww4wwwwwww"
                       ,"wwwwwwww6 ffxwww"]);
  
  Config.addTileset(2, Map.ALL_SAME, "w"); // 2,6
  // 2,7
  Config.addTileset(2, ["wwwwwwwwxffffxww"
                       ,"wwwwwwwxffffxwww"
                       ,"wwwwwwxffffxwwww"
                       ,"wwwwwx fffxwwwww"
                       ,"wwwwwx  xwwwwwwx"
                       ,"wwwwwwwwwwwwwxff"
                       ,"wwwwwwwwwwwwxfff"
                       ,"wwwwwwwwwwwxfffm"
                       ,"wwwwwwwwwwwffffm"
                       ,"wwwwwwwwwwwfffff"
                       ,"wwwwwwwwwwwxffff"
                       ,"wwwwwwwwwwwwfffs"
                       ,"wwwwwwwwwwwwxmms"
                       ,"wwwwwwwwwwwwwmms"
                       ,"wwwwwwwwwwwwwmms"
                       ,"wwwwwwwwwwwwwmmm"]);
  // 2,8
  Config.addTileset(2, ["wwwwwwwwwxsssmmm"
                       ,"wwwxssrfffssmmmm"
                       ,"wwx:rrrffffmmmmm"
                       ,"wxffrffffffmmmmf"
                       ,"ffffrfffffmmmmff"
                       ,"ffffrrrrmmmmmmff"
                       ,"ffffmmmrmmmmmfff"
                       ,"mmmmmmmrmmmmffff"
                       ,"mmmmmmrrrmmmffff"
                       ,"mmmmmmrrrmmmffff"
                       ,"ssssmmmmmmmffffx"
                       ,"sssssmmmmmmfffxw"
                       ,"sCCsssmmmmmffxww"
                       ,"sCCsssxwwwwwwwww"
                       ,"sssssswwwwwwwwww"
                       ,"sssssswwwwwwwwww"]);
  // 2,9
  Config.addTileset(2, ["mfffmmmmmmmmmmmm"
                       ,"mfffmmmmmmfffffm"
                       ,"ffffmmmmmfffffff"
                       ,"fffxwwx  fffffff"
                       ,"ffxwwwwwwwxfffff"
                       ,"ffwwwwwwwwwxffff"
                       ,"ffwwwwwwwwwwxfff"
                       ,"fxwwwwwwwwwwwwww"
                       ,"fwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 2,10
  Config.addTileset(2, ["mmmddddddddddddd"
                       ,"mmmmmmmddddddddd"
                       ,"mmmmmmmmmmmddddd"
                       ,"fmmmmmmmmmmmmmmf"
                       ,"ffffmmmmmmmmmmmf"
                       ,"fffffffmmmmmmmmf"
                       ,"ffffffffffffffff"
                       ,"wwwwwxffffffffff"
                       ,"wwwwwwxfffffffff"
                       ,"wwwwwwwxffffffff"
                       ,"wwwwwwwxffffffff"
                       ,"wwwwwww fffffffx"
                       ,"wwwwwwwxfffffffw"
                       ,"wwwwwwwwxfffffxw"
                       ,"wwwwwwwwwxfffxww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 2,11
  Config.addTileset(2, ["fffwwwwwwwwwwwww"
                       ,"fffwwwwwwwwwwwww"
                       ,"fffxwwwwwwwwwwww"
                       ,"ffffxwwwwwwwwwww"
                       ,"fffffffffxwwwwww"
                       ,"ffffffffffgggggg"
                       ,"ffffffffff~ggggg"
                       ,"ffffffffffgg*xww"
                       ,"ffx18mmmmggggwww"
                       ,"fxwxmmmmm~ggxwww"
                       ,"xwxmmmmmmgg*wwww"
                       ,"wwxmmmmggggGwwww"
                       ,"wwwmmm&gggg`wwww"
                       ,"wwwxmmmgggg*xwww"
                       ,"wwwwmmmmmggg*xww"
                       ,"wwwxmmmmmmmmmmmm"]);
  // 2,12
  Config.addTileset(2, ["wwwwwwwwwwwwwwwm"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ," 7wwwwwwwwwwwwww"
                       ,"w1w4wwwwwwwwwwww"
                       ,"www6 xwwwwwwwwww"
                       ,"wwww  mmmmmmmmmm"
                       ,"wwww mmmmmmmmmmm"
                       ,"wwwxmmmmmmmmmmmm"
                       ,"wwwmmmmmmdddddmm"
                       ,"wwxmmmmmmddddddd"
                       ,"xmmmmmmmdddddddd"
                       ,"mmmmmddddddddddd"]);
  // 2,13
  Config.addTileset(2, ["mxwxmmmgggmmmmmm"
                       ,"xwxmmmggmmmmmmmm"
                       ,"wxmmm&gmmmmmmmmm"
                       ,"xmmmmmmmmmmmmmmm"
                       ," mmmmmmmmmmmmmmx"
                       ," mmmmmmmmmmmmmxw"
                       ,"xmmmmmmmmmmmmxww"
                       ,"wxmmmmmmmmmxwwww"
                       ,"wxmmmmmmmmxwwwww"
                       ,"mmmmmxxmmxwwwwww"
                       ,"mmmmxwwxxwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmmmxwwwwwwwwww"
                       ,"mmmmmmxwwwwwwwww"
                       ,"dmmmmmmxwwwwwwww"
                       ,"dmmmmmmmxwwwwwww"]);
  
  // 2,14
  Config.addTileset(2, ["mmxwwwwwwwwwwwww"
                       ,"mxwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
  Config.addTileset(2, Map.ALL_SAME, "w"); // 2,15
  // 3,0
  Config.addTileset(3, ["wwx     xwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwxm"
                       ,"wwwwwwwwwwwwwxmm"
                       ,"wwwwwwwwwwwww mm"
                       ,"wwwwwwwwwwwww mm"
                       ,"wwwwwwwwwwwwwfff"
                       ,"wwwwwwwwwwwwwfff"
                       ,"wwwwwwwwwwwwwfff"
                       ,"wwwwwwwwwwwwwxff"
                       ,"wwwwwwwwwwwwwwxf"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 3,1
  Config.addTileset(3, ["wwxmmmmmmmmmmVVf"
                       ,"xmmmmmmmmmmmVVVf"
                       ,"mmmmmmddddddVVff"
                       ,"mmmmdddddddddfff"
                       ,"mmmddddddddddffd"
                       ,"mmddddddddddd=+d"
                       ,"m dddddddddddddd"
                       ,"ffdddddddddddddd"
                       ,"ffdddddddddddddd"
                       ,"ffdddddddddddddd"
                       ,"fffddddddddddddd"
                       ,"ffffdddddddddddd"
                       ,"fffffddddddddddd"
                       ,"xfffffdddddddddd"
                       ,"wxfffffddddddddd"
                       ,"wwxfffffdddddddd"]);
  // 3,2
  Config.addTileset(3, ["fddddmmmmmmmmmmm"
                       ,"fdddddddmmmmmmmm"
                       ,"fddddddddmmmmmmm"
                       ,"dddddddddddmmmmm"
                       ,"ddddddddddddmmmm"
                       ,"ddddddddddddmmmm"
                       ,"ddddddddddddmmmm"
                       ,"ddddddddddddmmmm"
                       ,"ddddddddddddmmmm"
                       ,"ddddddddddddmmmm"
                       ,"dddddddddddmmmmm"
                       ,"ddddddddddmmmmmm"
                       ,"dddddddmmmmmmmmm"
                       ,"ddddddmmmmmmmmmm"
                       ,"ddddddmmmmmmmmmf"
                       ,"ddddddmmmmmmmmmf"]);
  // 3,3
  Config.addTileset(3, ["mmffffmmmmrmmmmf"
                       ,"mmfffffmmmrmmmmf"
                       ,"mmmffffmmmrmmmff"
                       ,"mmmfffffmmrmmmff"
                       ,"mmmmffffmmrmmmff"
                       ,"mmmmfffrrrrmmfff"
                       ,"mmmmfffrmmmmmffx"
                       ,"mmmmfffrmmmmfffw"
                       ,"mmmffffrmmmffffw"
                       ,"mmmffffrmmmffvvw"
                       ,"mmmffffrmmmffvvw"
                       ,"mmmffffrmmmfffxw"
                       ,"mmfffffrmmmfffww"
                       ,"fffffrrrmmffffww"
                       ,"fffffrffffffffww"
                       ,"fffffrffffffffxw"]);
  // 3,4
  Config.addTileset(3, ["ffffffwwwwwwwwgg"
                       ,"ffffffwwwwwwwwgo"
                       ,"ffffffwwwwwwwwx~"
                       ,"fffffxwwwwwwwww&"
                       ,"ffxwwwwwwwwwwwwg"
                       ,"xwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 3,5
  Config.addTileset(3, ["xwwwwwwwwxffoxww"
                       ,"gwwwwwwwwwxffffx"
                       ,"`wwwwwwwwwwxffff"
                       ,"*wwwwwwwwwwwxfff"
                       ,"gwwwwwwwwwwwwwxf"
                       ," xwwwwwwwwwwwwwx"
                       ,"x xwwwwwwwwwwwww"
                       ,"wx 7wwwwwwwwwwww"
                       ,"www1w4wwwwwwwwww"
                       ,"wwwww6,sssssssxw"
                       ,"wwwwwwwwxssssosx"
                       ,"wwwwwwwwwwwxssss"
                       ,"wwwwwwwwwwwwwxss"
                       ,"wwwwwwwwwwwwwwxs"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 3,6
  Config.addTileset(3, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"oxwwwwwwwwwwwwww"
                       ,"fffxwwwwwwwwwwww"
                       ,"fff 7wwwwwwwwwww"
                       ,"wwww1wwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwww4wwwwwwww"
                       ,"wwwwwww6 xwwwwww"
                       ,"xwwwwwwwxoxwwwww"
                       ,"ssxwwwwwwx 7wwww"
                       ,"sssssxwwwww1wwww"
                       ,"wxsss 7wwwwwwwww"
                       ,"wwwwww1wwwwwwwww"]);
  // 3,7
  Config.addTileset(3, ["wwwwwwwwwwwwwmmm"
                       ,"wwwwwwwwwwwwwmmm"
                       ,"wwwwwwwwwwwwwmmm"
                       ,"wwwwwwwwwwwwwxmm"
                       ,"wwwwwwwwwwwwwwxm"
                       ,"wwwwwwwwwwwwwwwm"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwww35"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwww82www"
                       ,"wwwwwwwwwx xwwww"]);
  // 3,8
  Config.addTileset(3, ["mmmmmwwwwwwwwwww"
                       ,"mmmmmwwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmxwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmmwwwwwwwwwwwww"
                       ,"mmxwwwwwwwwwwwww"
                       ," xwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 3,9
  Config.addTileset(3, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwwm"
                       ,"wwwwwwwwwwwwwwwm"
                       ,"wwwwwwwwwwwwwwwx"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 3,10
  Config.addTileset(3, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwxmm"
                       ,"wwwxmmmmmmmmmmmm"
                       ,"wwxmmmmmmmmmmmmm"
                       ,"wwmmmmmmmmmmmmmm"
                       ,"wxmmmmmmmmmmmddd"
                       ,"xmmmmmmmmmmmdddd"
                       ,"mmmmmmmmmmmmdddd"
                       ,"mmmmmmmmmmmmdddd"
                       ,"mmmmmmmmmmmmdddd"
                       ,"mmmmmmmmmmmmdddd"
                       ,"xmmmmmmmmmmmdddd"
                       ,"wwxmmmmmmmmmdddd"]);
  // 3,11
  Config.addTileset(3, ["www mmmmmmmmmmmm"
                       ,"wwxmmmmmmmmmmmmm"
                       ,"ww mmmmmdddddddd"
                       ,"wxmmmmmddddddddd"
                       ,"mmmmmmdddddddddd"
                       ,"mmmmmddddddddddd"
                       ,"mmmddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"]);
  // 3,12
  Config.addTileset(3, ["mmdddddddddddddd"
                       ,"mddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddm"
                       ,"dddddddddddddddm"
                       ,"dddddddddddddddm"
                       ,"ddMMdddddddddddm"
                       ,"ddMMdddddddddddm"
                       ,"dddddddddddddddm"
                       ,"dddddddddddddddm"
                       ,"dddddddddddddddm"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"]);
  // 3,13
  Config.addTileset(3, ["ddmmmmmmffxwwwww"
                       ,"ddmmmmmmfffffxww"
                       ,"ddmmmmmmffffffxw"
                       ,"dmmmmmmfffffffff"
                       ,"mmmmm ffffffffff"
                       ,"mmmmffffffffffff"
                       ,"mmmffffffrrrrrrf"
                       ,"mmfffffffrrrrrrr"
                       ,"mmfffffffrrrrrrr"
                       ,"mmfffffffrrrrrrr"
                       ,"mmfffffffffrrrrr"
                       ,"mmffffffffffffff"
                       ,"mmmfffffffffffff"
                       ,"mmmmffffffffffff"
                       ,"mmmmmfffffffffff"
                       ,"dmmmmmmffffffffx"]);
  // 3,14
  Config.addTileset(3, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"fffxwwwwwwwwwwww"
                       ,"ffffffxwwwwwwwww"
                       ,"fffffffxwwwwwwww"
                       ,"ffffffffwwwwwwww"
                       ,"rfffffffxwwwwwww"
                       ,"rffffffffxwwwwww"
                       ,"rfffffffffffxwww"
                       ,"rffffffffffffwww"
                       ,"fffffffffffffxww"
                       ,"ffffffffffffffxw"
                       ,"fffffffffffffffx"
                       ,"ffffxwxfffffffff"
                       ,"wwwwwwwwwxffffff"]);
  // 3,15
  Config.addTileset(3, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"]);
  
  Config.addTileset(4, Map.ALL_SAME, "w"); // 4,0
  // 4,1
  Config.addTileset(4, ["wwwxfffffddddddd"
                       ,"wwwwxfffffffdddd"
                       ,"wwwwwxffffffffff"
                       ,"wwwwwwffffffffff"
                       ,"wwwwwwxfffffffff"
                       ,"wwwwwwwxffffffff"
                       ,"wwwwwwwwxfffffff"
                       ,"wwwwwwwwwxssssss"
                       ,"wwwwwwwwwwssssss"
                       ,"wwwwwwwwww fffff"
                       ,"wwwwwwwwwwffffff"
                       ,"wwwwwwwwwwffffff"
                       ,"wwwwwwwwwwffffff"
                       ,"wwwwwwwwwwffffff"
                       ,"wwwwwwwwwwxfffff"
                       ,"wwwwwwwwwwwfffff"]);
  // 4,2
  Config.addTileset(4, ["ddddd  mmmmmmmmf"
                       ,"dddfffffmmmmmmmm"
                       ,"fffffffffmmmmmmm"
                       ,"ffffffffffffmmmm"
                       ,"fffffffffffffmmm"
                       ,"ffffffffffffffmm"
                       ,"ffffffffffffffmm"
                       ,"sssffffffffffmmm"
                       ,"sssssssssssssmmm"
                       ,"sssssssssssssmmm"
                       ,"fsssssssssssssmm"
                       ,"ffsrrrrrrrrrrrrr"
                       ,"ffsrsssssssmmmmf"
                       ,"frrrssssssmmmmmf"
                       ,"ffsssssssmmmmmmm"
                       ,"ffsssssssmmmmmmm"]);
  // 4,3
  Config.addTileset(4, ["fffffrfffffffffx"
                       ,"fffffrffffffffff"
                       ,"mffffrfffxwwxfff"
                       ,"mffffrffxwwwwwww"
                       ,"mffffrffwwwwwwww"
                       ,"mmfffrffxwwwwwww"
                       ,"mmfffrfffxwwwwww"
                       ,"mmfffrffffwwwwww"
                       ,"mfffrrffffwwwwww"
                       ,"mfffrfffffxwwwww"
                       ,"mfffrffffffwwwww"
                       ,"rrrrrffffffxwwww"
                       ,"ffffffffffffxwww"
                       ,"ffffffffffffxwww"
                       ,"fffffxwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"]);
  // 4,4
  Config.addTileset(4, ["wwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
  Config.addTileset(4, Map.ALL_SAME, "w"); // 4,5
  // 4,6
  Config.addTileset(4, ["wwwwwwwww4wwwwww"
                       ,"wwwwwwwww6 xwwww"
                       ,"wwwwwwwwwwx  fff"
                       ,"wwwwwwwwwwwx fff"
                       ,"wwwwwwwwwwwwwwxf"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  // 4,7
  Config.addTileset(4, ["wwwxffff  xwwwww"
                       ,"wwxfffff xwwwwww"
                       ,"ffffoffxwwwwwwww"
                       ,"ffffffxwwwwwwwww"
                       ,"fffffxwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
  Config.addTileset(4, Map.ALL_SAME, "w"); // 4,8
  Config.addTileset(4, Map.ALL_SAME, "w"); // 4,9
  // 4,10
  Config.addTileset(4, ["wwwwwxmmmmmmdddd"
                       ,"wwwwwwxmmmmmmddd"
                       ,"wwwwwww mmmmmddd"
                       ,"wwwwwwwx mmmmmdd"
                       ,"wwwwwwww mmmmmdd"
                       ,"wwwwwwwwxmmmmmdd"
                       ,"wwwwwwwwwxmmmmdd"
                       ,"wwwwwwwwwwxmmmdd"
                       ,"wwwwwwwwwwxmmmdd"
                       ,"wwwwwwwwwxmmmddd"
                       ,"wwwwwwwwxmmmmddd"
                       ,"wwwwwwwx mmmmddd"
                       ,"wwwwwwx  mmmmddd"
                       ,"wwww8    mmmmmmd"
                       ,"wwww1wwwwxmmmmmm"
                       ,"wwwwwwwwwwwxmmmm"]);
  // 4,11
  Config.addTileset(4, ["dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"dddddddddddddddd"
                       ,"mmmmmmmmmddddddd"]);
  
  Config.addTileset(4, Map.ALL_SAME, "d"); // 4,12
  // 4,13
  Config.addTileset(4, ["ddmmmmmmffffffxw"
                       ,"ddmmmmmmmffffxww"
                       ,"dddmmmmmmmffxwww"
                       ,"ddd mmmmmmmmxwww"
                       ,"dddmmmmmmmmmmmxw"
                       ,"ddmmmmmmmmmmmmmx"
                       ,"ddmmmmmmmmmmmmmx"
                       ,"dmmmmmxwwwwwwwww"
                       ,"mmmmmxwwwwwwwwww"
                       ,"mmmmxwwwwwwwwwww"
                       ,"mmmmwwwwwwwwwwww"
                       ,"dmmmxwwwwwwwwwww"
                       ,"ddmmmmxwwwwwwwww"
                       ,"dddmmmmmmxwwwwww"
                       ,"dddd mmmmmxwwwww"
                       ,"ddddd mmmm wwwww"]);
  // 4,14
  Config.addTileset(4, ["wwwwwwwwwwwfffff"
                       ,"wwwwwwwwwwxsssff"
                       ,"wwwwwwwwwwsssssf"
                       ,"wwwwwwwwwwssssss"
                       ,"wwwwwwwwwwxsssss"
                       ,"wwwwwwwwwwwsssss"
                       ,"wwwwwwwwwwwxssff"
                       ,"wwwwwwwwwwwwffff"
                       ,"wwwwwwwwwwwxffff"
                       ,"wwwwwwwwwwxfffff"
                       ,"wwwwwwwwxffffffs"
                       ,"wwwwwwwxffffffss"
                       ,"wwwwwxffffffssss"
                       ,"wwwwwffffffsssss"
                       ,"wwwwwfffffssssss"
                       ,"wwwwwxffffssssss"]);
  // 4,15
  Config.addTileset(4, ["fxwwwwwwwwwwwwww"
                       ,"ffffxwwwwwwwwwww"
                       ,"fffffwwwwwwwwwww"
                       ,"fffffwwwwwwwwwww"
                       ,"fffffxwwwwwwwwww"
                       ,"ffffffwwwwwwwwww"
                       ,"ffffffwwwwwwwwww"
                       ,"fffffxwwwwwwwwww"
                       ,"ffffxwwwwwwwwwww"
                       ,"ffffwwwwwwwwwwww"
                       ,"sssswwwwwwwwwwww"
                       ,"sssswwwwwwwwwwww"
                       ,"ssssxwwwwwwwwwww"
                       ,"sssssxwwwwwwwwww"
                       ,"sssssxwwwwwwwwww"
                       ,"sssxwwwwwwwwwwww"]);

  Config.setMapping({
      " " : {cssClass:"none"}
     ,"d" : {cssClass:"desert", hasCorners:true, borderTile:"d"}
     ,"f" : {cssClass:"forest", hasCorners:true, hasSides:true, borderTile:"f"}
     ,"g" : {cssClass:"grass", hasCorners:true, hasSides:true, borderTile:"goG&*~`"}
     ,"m" : {cssClass:"mountain", hasCorners:true, hasSides:true, borderTile:"90!@#$%^m"}
     ,"o" : {cssClass:"hole"}
     ,"r" : {cssClass:"river", hasCorners:true, borderTile:"r"}
     ,"s" : {cssClass:"swamp", hasCorners:true, borderTile:"so:;,."}
     ,"t" : {cssClass:"town empty"}
     ,"v" : {cssClass:"village"}
     ,"w" : {cssClass:"water", hasSides:true, borderTile:"wxH12345678"}
     ,"x" : {cssClass:"coastline", hasCorners:true, borderTile:"wx12345678"}
     
     ,"C" : {cssClass:"castle", block:{width:2,height:2}}
     ,"D" : {cssClass:"docks", hasCorners:true, hasSides:true, borderTile:"DH"}
     ,"G" : {cssClass:"grass"}
     ,"F" : {cssClass:"waterfall"}
     ,"H" : {cssClass:"water"}
     ,"K" : {cssClass:"coneria", block:{width:2,height:3}}
     ,"M" : {cssClass:"mirage tower", block:{width:2, height:2}}
     ,"T" : {cssClass:"town"}
     ,"V" : {cssClass:"desert caravan", hasCorners:true, borderTile:"V"}
     
     ,"1" : {cssClass:"water top"}
     ,"2" : {cssClass:"water left"}
     ,"3" : {cssClass:"water right"}
     ,"4" : {cssClass:"water bottom"}
     ,"5" : {cssClass:"coastline tl"}
     ,"6" : {cssClass:"coastline tr"}
     ,"7" : {cssClass:"coastline bl"}
     ,"8" : {cssClass:"coastline br"}
     ,"9" : {cssClass:"mountain top"}
     ,"0" : {cssClass:"mountain left"}
     ,"!" : {cssClass:"mountain right"}
     ,"@" : {cssClass:"mountain bottom"}
     ,"#" : {cssClass:"mountain tl"}
     ,"$" : {cssClass:"mountain tr"}
     ,"%" : {cssClass:"mountain bl"}
     ,"^" : {cssClass:"mountain br"}
     ,"&" : {cssClass:"grass tl"}
     ,"*" : {cssClass:"grass tr"}
     ,"~" : {cssClass:"grass bl"}
     ,"`" : {cssClass:"grass br"}
     ,":" : {cssClass:"swamp tl"}
     ,";" : {cssClass:"swamp tr"}
     ,"," : {cssClass:"swamp bl"}
     ,"." : {cssClass:"swamp br"}
     ,"+" : {cssClass:"desert tl"}
     ,"=" : {cssClass:"desert tr"}

     ,"(" : {cssClass:"wall left", block:{width:1,height:5}}
     ,")" : {cssClass:"wall right", block:{width:1,height:5}}
     ,"<" : {cssClass:"wall top left", block:{width:1, height:2}}
     ,">" : {cssClass:"wall top right", block:{width:1, height:2}}
     ,"}" : {cssClass:"wall gate left"}
     ,"{" : {cssClass:"wall gate right"}
    });
  
  /*
  Config.addTileset(0, ["wwwwwwwwwwwwwwww"
                       ,"wwwwwxfffxwwwwww"
                       ,"wwwxffffffwwwwww"
                       ,"wwxfffffffwwwwww"
                       ,"xfffffffffwwwwww"
                       ,"fffffffff wwwwww"
                       ,"ffffffff  wwx xw"
                       ,"fffffmmmm xw mmx"
                       ,"mm  mmmmm  Pmmmm"
                       ,"mm mmmmmm   mmmm"
                       ,"m  mmmmmDDD mmmm"
                       ,"ff  mmm DHD mmmm"
                       ,"ff       Hxwxmmm"
                       ,"ff    xwwwwwwxmm"
                       ,"rr  xwwwwwwwwwww"
                       ,"rr xwwwwwwwwwwww"]);
  
  Config.addTileset(0, ["wwxfffffxwwwwwww"
                       ,"wwwxfffffwwwwwww"
                       ,"wwwwxffffwwwwwww"
                       ,"wwwww fffwwwwwww"
                       ,"wwwww    xwwwwww"
                       ,"wwwwx ss  wwwwww"
                       ,"wwww ssss wwwwww"
                       ,"wwwxsssssswwwwww"
                       ,"mmmmsssssswwwwww"
                       ,"mmm3sssssswwwwxm"
                       ,"mmmQssssssxwwxmm"
                       ,"mmmmmm sss   mmm"
                       ,"mmmmmmmm   ffmmm"
                       ,"mmmmmmmm fffffmm"
                       ,"wx     fffffff  "
                       ,"wwx   ffffffffff"]);
  
  Config.addTileset(0, ["wwwwwwwxffffffff"
                       ,"wwwwwwxfffffffff"
                       ,"wwwwwxffffffffff"
                       ,"wwwwxfffffffffff"
                       ,"wwwxffffffrrrrrr"
                       ,"wwwfffffffffffff"
                       ,"wwwfffffffffffff"
                       ,"wwxmmmmmmmmmmmmf"
                       ,"wxmmmmmmmmmmmmm "
                       ,"mmmmmmmmmmmmmmm "
                       ,"mmmmmmmmmmmmmmm "
                       ,"mmmmmmmmmmmmmmm "
                       ,"mmxxmmmmmmm     "
                       ,"mxwwwxmmmm  DDDD"
                       ,"xwwwwwwwwwwwHHHD"
                       ,"wwwwwwwwwwwwwx  "]);
  
  Config.addTileset(1, ["fffwwwwwwwwwwwww"
                       ,"fffwwwwwwwwwwwww"
                       ,"ffxwwwwwwwwwwwww"
                       ,"f wwwwwwwwwwwwww"
                       ,"  wwwwwwwwwwwwww"
                       ,"  wwwwwwwwwwwwww"
                       ,"  xwwwwwwwwwwwww"
                       ,"   wwwwwwwwwwwww"
                       ,"   wwwwwwwwwwwww"
                       ,"   wwwwwwwwwwwww"
                       ,"  xwwwwwwwwwwwww"
                       ," xwwwwwwwwwwwwww"
                       ," wwwwwwwwwwwwwww"
                       ,"xwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
  Config.addTileset(1, ["wwwx  ffffffffff"
                       ,"wwwwx ffffffffff"
                       ,"wwwwwx ffffffff "
                       ,"wwwwww   ffff   "
                       ,"wwwwwwx         "
                       ,"wwwwwwwx        "
                       ,"wwwwwwwwx       "
                       ,"wwwwwwwwwx      "
                       ,"wwwwwwwwwwwx    "
                       ,"wwwwwwwwwwwwwwx "
                       ,"wwwwwwwwwwwwwww "
                       ,"wwwwwwwwwwwwwww "
                       ,"wwwwwwwwwwwwwwx "
                       ,"wwwwwwwwwwwwwx  "
                       ,"wwwwwwwwwwwwx   "
                       ,"wwwwwwwwwwww    "]);
   
   Config.addTileset(1, ["xwwwwwwwwwwwww  "
                        ," wwwwwwwwwwwww m"
                        ,"xwwwwwwwwwwwwx m"
                        ,"wwwwwwwwwwwwx   "
                        ,"wwwwwwwwwwx     "
                        ,"wwwwwwwwwx      "
                        ,"xwwwwwwx    xwww"
                        ,"  xwwwx    xwwww"
                        ,"   xww4444wwwwww"
                        ,"    xx    xwwwww"
                        ,"     ffffffffxww"
                        ,"    ffffffffffxw"
                        ,"   ffffffffffffx"
                        ,"  fffff KK fffff"
                        ,"  ffff <KK> ffff"
                        ,"  fff (<KK>) fff"]);
   
   Config.addTileset(2, Map.ALL_SAME, "w");
   
   
   Config.addTileset(2, ["wwwwwwwwwwwwx   "
                        ,"wwwwwwwwwwwwwx  "
                        ,"wwwwwwwwwwwwwwwx"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"]);
   
   Config.addTileset(2, ["  fff (TttT) fff"
                        ,"  fff (TttT) fff"
                        ,"  fff (TttT) fff"
                        ,"  ffff(}tt{)ffff"
                        ,"x fffff    fffff"
                        ,"w  ffff    ffff "
                        ,"wx  fff    fff  "
                        ,"ww            xw"
                        ,"wwx    DDD  xwww"
                        ,"www    DHD xwwww"
                        ,"wwwx   DHxwwwwww"
                        ,"wwww    Hwwwwwww"
                        ,"wwww   xwwwwwwww"
                        ,"wwww  xwwwwwwwww"
                        ,"wwwwxxwwwwwwwwww"
                        ,"wwwwwwwwwwwwwwww"]);
  */
  
  var build = function($container) {
    for (var y = 0; y < this.Config.maxTilesetY(); y++) {
      var $row = $("<div/>").addClass("row");
      for (var x = 0; x < this.Config.maxTilesetX(); x++) {
        
      }
    }
  };
  
  return {
    Config: Config
   ,build: build
  };
  
})();