var WorldMap = (function() {
  
  var Config = new Map.Config({
    size:16
   ,mapping:{
      " " : {cssClass:"none"}
     ,"b" : {cssClass:"water bottom"}
     ,"f" : {cssClass:"forest", hasCorners:true, hasSides:true, borderTile:"f"}
     ,"m" : {cssClass:"mountain", hasCorners:true, hasSides:true, borderTile:"mUQ"}
     ,"r" : {cssClass:"river"}
     ,"s" : {cssClass:"swamp", hasCorners:true, borderTile:"s"}
     ,"t" : {cssClass:"town empty"}
     ,"w" : {cssClass:"water", hasSides:true, borderTile:"wxbHP"}
     ,"x" : {cssClass:"coastline", hasCorners:true, borderTile:"wxb"}
     
     ,"C" : {cssClass:"castle", block:{width:2,height:3}}
     ,"D" : {cssClass:"docks", hasCorners:true, hasSides:true, borderTile:"DH"}
     ,"H" : {cssClass:"water"}
     ,"L" : {cssClass:"river", hasCorners:true, borderTile:"L"}
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
                       ,"LL  xwwwwwwwwwww"
                       ,"LL xwwwwwwwwwwww"]);
  
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
  
  
  return {
    Config: Config
  };
  
})();