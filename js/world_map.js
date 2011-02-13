var WorldMap = (function() {
  
  var Config = new Map.Config({
    size:16
   ,mapping:{
      " " : {cssClass:"none"}
     ,"b" : {cssClass:"water bottom"}
     ,"d" : {cssClass:"desert", hasCorners:true, borderTile:"d"}
     ,"f" : {cssClass:"forest", hasCorners:true, hasSides:true, borderTile:"f"}
     ,"g" : {cssClass:"grass", hasCorners:true, hasSides:true, borderTile:"gG"}
     ,"m" : {cssClass:"mountain", hasCorners:true, hasSides:true, borderTile:"MmUQ"}
     ,"r" : {cssClass:"river", hasCorners:true, borderTile:"r"}
     ,"s" : {cssClass:"swamp", hasCorners:true, borderTile:"s"}
     ,"t" : {cssClass:"town empty"}
     ,"v" : {cssClass:"village"}
     ,"w" : {cssClass:"water", hasSides:true, borderTile:"wxbHP"}
     ,"x" : {cssClass:"coastline", hasCorners:true, borderTile:"wxb"}
     
     ,"C" : {cssClass:"castle", block:{width:2,height:3}}
     ,"D" : {cssClass:"docks", hasCorners:true, hasSides:true, borderTile:"DH"}
     ,"F" : {cssClass:"waterfall"}
     ,"G" : {cssClass:"grass tr"}
     ,"H" : {cssClass:"water"}
     ,"M" : {cssClass:"mountain bottom"}
     ,"P" : {cssClass:"coastline br"}
     ,"Q" : {cssClass:"mountain tr"}
     ,"T" : {cssClass:"town"}
     ,"U" : {cssClass:"mountain br"}

     ,"(" : {cssClass:"wall left", block:{width:1,height:5}}
     ,")" : {cssClass:"wall right", block:{width:1,height:5}}
     ,"<" : {cssClass:"wall top left", block:{width:1, height:2}}
     ,">" : {cssClass:"wall top right", block:{width:1, height:2}}
     ,"}" : {cssClass:"wall gate left"}
     ,"{" : {cssClass:"wall gate right"}
    }
  });
  
  // Row 0
  Config.addTileset(0, Map.ALL_WATER); // 0,0
  Config.addTileset(0, Map.ALL_WATER); // 0,1
  Config.addTileset(0, Map.ALL_WATER); // 0,2
  Config.addTileset(0, Map.ALL_WATER); // 0,3
  Config.addTileset(0, Map.ALL_WATER); // 0,4
  Config.addTileset(0, Map.ALL_WATER); // 0,5
  Config.addTileset(0, Map.ALL_WATER); // 0,6
  Config.addTileset(0, Map.ALL_WATER); // 0,7
  Config.addTileset(0, Map.ALL_WATER); // 0,8
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
  
  Config.addTileset(0, Map.ALL_WATER); // 0,11
  Config.addTileset(0, Map.ALL_WATER); // 0,12
  Config.addTileset(0, Map.ALL_WATER); // 0,13
  Config.addTileset(0, Map.ALL_WATER); // 0,14
  Config.addTileset(0, Map.ALL_WATER); // 0,15
  
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
                       ,"wx  mmmmmggggggG"
                       ,"x   mmmmgggggggg"
                       ,"   mmmmgggggggmm"
                       ,"fffmmmmgggggggmm"
                       ,"fffmmmmmgggggGmm"
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
                       ,"mmMMMMFMmmmmmmmm"
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
  
  Config.addTileset(1, Map.ALL_WATER); // 1,6
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
                       ,"wwxmmsssssssmmmm"
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
                       ,"xmmmmmmmmmmmggmm"
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
                       ,"mmmmm  xwwwwxwww"
                       ,"mmmxwwwwwwwxxwww"
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
                       ,"wwwwxwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"
                       ,"wwwwwwwwwwwwwwww"]);
  
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
                       ,"mmmUsssssswwwwxm"
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
                        ,"   xwwbbbbwwwwww"
                        ,"    xx    xwwwww"
                        ,"     ffffffffxww"
                        ,"    ffffffffffxw"
                        ,"   ffffffffffffx"
                        ,"  fffff CC fffff"
                        ,"  ffff <CC> ffff"
                        ,"  fff (<CC>) fff"]);
   
   Config.addTileset(2, Map.ALL_WATER);
   
   
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
  
  return {
    Config: Config
  };
  
})();