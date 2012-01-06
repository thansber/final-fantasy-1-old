define( 
/* TownMapData */
["map-config", "map-coords-absolute", "map-tile", "constants/map", "constants/movement"], 
function(MapConfig, MapCoordsAbsolute, MapTile, MapConstants, MovementConstants) {
  
  var townMapping = {
    " " : MapTile.create({cssClasses:"none", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"b" : MapTile.create({cssClasses:"bridge", borderTile:"s", stack:{match:"left right", cssClasses:"vertical"}, passableUsing:[MovementConstants.Transportation.Foot]})
   ,"d" : MapTile.create({cssClasses:"desert", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"f" : MapTile.create({cssClasses:"fence"})
   ,"g" : MapTile.create({cssClasses:"grave"})
   ,"h" : MapTile.create({cssClasses:"hay"})
   ,"m" : MapTile.create({cssClasses:"stream shadow top", inheritsFrom:"s"})
   ,"n" : MapTile.create({cssClasses:"stream shadow bottom", inheritsFrom:"s"})
   ,"o" : MapTile.create({cssClasses:"road", inheritsFrom:"r"})
   ,"p" : MapTile.create({cssClasses:"road shadow top", inheritsFrom:"r"})
   ,"q" : MapTile.create({cssClasses:"road shadow bottom", inheritsFrom:"r"})
   ,"r" : MapTile.create({cssClasses:"road", hasCorners:true, borderTile:"Ropqbr", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"s" : MapTile.create({cssClasses:"stream"})
   ,"t" : MapTile.create({cssClasses:"trees", borderTile:"RTtu", stack:{match:"bottom", cssClasses:"double"}})
   ,"u" : MapTile.create({cssClasses:"trees"})
   ,"v" : MapTile.create({cssClasses:"wall vertical", inheritsFrom:"w"})
   ,"w" : MapTile.create({cssClasses:"wall", borderTile:"wx"})
   ,"x" : MapTile.create({cssClasses:"wall top half shadow", inheritsFrom:"w"})
   ,"A" : MapTile.create({cssClasses:"sign armor"})
   ,"B" : MapTile.create({cssClasses:"sign black magic"})
   ,"C" : MapTile.create({cssClasses:"sign clinic"})
   ,"D" : MapTile.create({cssClasses:"door", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"F" : MapTile.create({cssClasses:"fountain"})
   ,"H" : MapTile.create({cssClasses:"sign white magic"})
   ,"I" : MapTile.create({cssClasses:"sign item"})
   ,"L" : MapTile.create({cssClasses:"wall half start"})
   ,"N" : MapTile.create({cssClasses:"sign inn"})
   ,"Q" : MapTile.create({cssClasses:"submarine", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"R" : MapTile.create({cssClasses:"roof top"})
   ,"S" : MapTile.create({cssClasses:"roof bottom"})
   ,"T" : MapTile.create({cssClasses:"trees double"})
   ,"W" : MapTile.create({cssClasses:"sign weapon"})
   ,"Y" : MapTile.create({cssClasses:"shop wall multi window"})
   ,"Z" : MapTile.create({cssClasses:"shop wall"})
   ,"." : MapTile.create({cssClasses:"shadow", stack:{match:"bottom", cssClasses:"full"}, borderTile:".*", passableUsing:[MovementConstants.Transportation.Foot]})
   ,"*" : MapTile.create({cssClasses:"shadow full", inheritsFrom:"."})
   ,"@" : MapTile.create({cssClasses:"well"})
   ,"^" : MapTile.create({cssClasses:"roof angle"})
   ,"|" : MapTile.create({cssClasses:"wall vertical shadow"})
   ,"-" : MapTile.create({cssClasses:"wall half", stack:{match:"right"}, borderTile:"-"})
   ,"+" : MapTile.create({cssClasses:"wall half shadow", inheritsFrom:"-"})
   ,"=" : MapTile.create({cssClasses:"wall half corner shadow", inheritsFrom:"-"})
  };
  
  var init = function() {
    MapConfig.create({id:MapConstants.CONERIA, numTilesets:1, height:24, width:32, 
                      start:MapCoordsAbsolute.create({y:23, x:16}), worldMapExit:MapCoordsAbsolute.create({y:162, x:151}), 
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["xwwwwwwwwwwwwwwtrtwwwwwwwwwwwwwx"
                         ,"|tuu       tututrttttttuuuttttt|"
                         ,"|tRRR RRR   tst r tttt RRR tttt|"
                         ,"| SBS.SHS.   s  r tttt SCS.tts |"
                         ,"| ZDZ.ZDZ. rrbrrr ttt  ZDZ. ts |"
                         ,"|  r   r   r s  r       r    s |"
                         ,"|  rrrrrrrrr s  r    ff r ff s |"
                         ,"|            sssbsssssssbsssss |"
                         ,"|   RRRR RRRR   r       r RRRs |"
                         ,"|t  SSAS.SSWS. trt      r SISm |"
                         ,"|tt YYDY.YYDY.rrrrr     r YDYn u"
                         ,"|ttt  r    r trrrrrt    r  r s t"
                         ,"|ttt  rrrrrrrrrrFrrrrrrrrrrrrb  "
                         ,"|t@          trrrrrt         s u"
                         ,"|t            rrrrr  sssssssss t"
                         ,"wwwwwwwwxRRRRR trt   s vwwwwwwww"
                         ,"        |SSSSS  r    s v.       "
                         ,"        |YYNYY.trt   s v.       "
                         ,"        |YYDYY. r    s v.       "
                         ,"        |  r   trt   s v.       "
                         ,"        | frf   r    s v.       "
                         ,"        |  rrrrrr   tstv.       "
                         ,"        |      uru  tttv.       "
                         ,"        wwwwwwuuruuwwwww.       "]);
    
    MapConfig.create({id:MapConstants.PRAVOKA, numTilesets:1, height:32, width:38, 
                      start:MapCoordsAbsolute.create({y:31, x:19}), worldMapExit:MapCoordsAbsolute.create({y:150, x:209}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["vwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwx" 
                         ,"vmssssssssssssssRRRRRRRsssssssssssssss|" 
                         ,"vmRRRRRRrrrrrrrs^SS^SS^moRRRRRrrrrrrrs|" 
                         ,"vm^S^SS^rrrrrrrmYYYNYYYmr^S^S^rrRRRrrm|"
                         ,"vmYYYYYYprRRRRRmYYYDYYYmrYYYYYpr^H^prm|" 
                         ,"vmYYYqYYqr^S^S^mrrrrrrrnrYYYYYqrZDZqrm|" 
                         ,"vmrrrrrrrrYYYYYmsssbssssrrrrrrrrrrrrrm|"
                         ,"vmrrrrrrrrYYYYYmssorrmssRRRRRrrRRRRrrm|" 
                         ,"vmrrrrrrrrrrrrrmsororrms^SCS^rr^SS^prm|"
                         ,"vmrrrrrRRRRRrrrmort trrmYYZYYprYYYYqrm|"
                         ,"vmrRRRr^S^S^rrrrrt   trrYYDYYqrYYYYrrm|"
                         ,"vmr^S^rYYYRRRRRrr     rrrrrrrrrrrrrrrm|"
                         ,"vmrYYYpYYY^S^S^ort   trrrRRRRrrRRRRRrm|"
                         ,"vmrYYYqrrrYYYYYmort tronr^SS^rr^S^S^rm|"
                         ,"vmrrrrrrrrYYqYYmsorrronsrYYYYprYYYYYpm|"
                         ,"vmrrrrrrrrrrrrrrmsrrrmsrrYYYYqrYYqRRRm|" 
                         ,"vmRRRrrRRRRRrrrrrmrrrmrrRRRrrrrrrr^B^m|" 
                         ,"vm^S^rr^S^S^ooRRRmrrrmrr^S^rrrRRRrYDYm|" 
                         ,"vmYYYprYYRRRRR^A^mrrrmrrYYYprr^W^prrrm|"
                         ,"vmYYYqrYY^S^S^ZDZmrrrmrrYYRRRRYDYqrrrm|"
                         ,"vmrrrrrrrYYYYYprrmrrrmrrrr^SS^rrRRRRrm|"
                         ,"vmrrRRRrrYYqYYqrrmrrrmrrrrYYYYpr^SS^rm|"
                         ,"vmrr^I^prrrrrrrrrmrrrmrrrrYYqYqrYYYYpm|"
                         ,"vmrrZDZqrrRRRRRrrmrrrmrRRRRRorrrYYqYqm|"
                         ,"vmrrrrrrrr^S^S^rrmrrrmr^S^S^rrrrrrrrrm|"
                         ,"vmrRRRRRrrYYYYYprmrrrmrYYYYYprRRRRrrrm|" 
                         ,"vmr^S^S^rrYYYYYqrmrrrmrYYqYYqr^SS^rrrm|"
                         ,"vmrYYYYYprrrrrroonrrrmorrrrrrrYYYYprrm|"
                         ,"vmrYqYYYqrrrrmssssrrrmssssrrrrYYYYqrrm|"
                         ,"vmorrrrrrrrron|u  rrr  uvsorrrrrrrrron|"
                         ,"vmssssssssssss|u  rrr  uvmssssssssssss|"
                         ,"L-------------+u  rrr  uL-------------+"
                         ,"               t  oro  t               "]);
    
    MapConfig.create({id:MapConstants.ELFLAND, numTilesets:1, height:32, width:42,
                      start:MapCoordsAbsolute.create({y:22, x:41}), worldMapExit:MapCoordsAbsolute.create({y:222, x:134}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset([" ttttttttttttttt               tttttttt   "
                         ,"tttttttttssssssssss                     tt" 
                         ,"tRRRttttttttRRR   s ttt                   "
                         ,"tSBSttttttttSHS.  b  ttt                  "
                         ,"tZDZttttttt ZDZ.  s   ttt                 "
                         ,"     tttt         s   ttt                 "
                         ,"    tttt        tts    ttt                "
                         ,"tt  ttt       ttttstt  ttttt              "
                         ,"ttt          tttttstt   ttttttttttt       "
                         ,"tttt     tttttttttsttt    ttttttttttt     "
                         ,"tttt   ttttttttttsstttt    tuttu ggg tt   "
                         ,"tttt  tttttttttttsttttt     uttt      t  u"
                         ,"tttsbstttttttttttsttttt  ttRRRt          t"
                         ,"ttt  ttttttttssssssttt  tttSHSt ttttttt   "
                         ,"ttt  ttttsssss RRRs    ttttZDZ. ttttttt   "
                         ," tt  ttt       SISmss    tt      tttttt   "
                         ," tt  tt        YDY. ssbssssssssssssstt   t"
                         ," tt                      ttRRR          tt"
                         ," ttt                    tttSBS.   tRRRRRRt"
                         ,"  ttt               tttttttZDZ. tttSNSSSSt"
                         ,"  tttttttt      tttttttttttt    tttYDYYYYt"
                         ,"  tttttttt   ttttttttRRRtttt    tttt ttttt"
                         ,"   tttttt   tttttt  RSCSRtttttt  rrrrrrrrr"
                         ,"    ttttt ttttttt   ^ZZZ^.  tttt r     ttt"
                         ,"      ttt ttttttt   YYDYY.    tt r        "
                         ,"      tt  tRRRtttt    r          rtt      "
                         ,"      t    SAS.tt   ffrff      rrrttt     "
                         ,"      tt   YDY. t t   r        rttRRR  t  "
                         ,"       tt         t   rrrrrrrrrrttSWS. t  "
                         ,"       ttt    tttttt       tttttttYDY. t  "
                         ,"        ttttttttttttttttttttttttt     tt  "
                         ,"         tttttttttttttttttttttttttt  ttt  "
                         ,"                   ttttttttttttttttttttt  "]);
    
    MapConfig.create({id:MapConstants.MELMOND, numTilesets:1, height:30, width:33, 
                      start:MapCoordsAbsolute.create({y:17, x:0}), worldMapExit:MapCoordsAbsolute.create({y:160, x:80}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["                             s   "
                         ,"        vwwwwwwwwwwwwxgggggg s   "
                         ,"      vww.tdtRRRdtdd wwxg  ggs   "
                         ,"    vww.dd   SAS.  ddddwwx   s   "
                         ,"   vw. ddt   YDY.  t  dddwx ss   "
                         ,"   v. dddddt     dd  ddddd= s    "
                         ,"  ww.    dorddd   dddddddddds    "
                         ,"orrrrrr  ro sssssssbsssssssss    "
                         ,"r   dddddddds  vwww x ddddsss    "
                         ,"rxddddsssssss gw.   wwxddorossss "
                         ,"r|   ssdddd  vgg  RRR | drCprv.s "
                         ,"r|gggsRRRRR  w.ggdSWS.wxorSS v.ss"
                         ,"r|ggssSSSSS    dddYDY.@|rYqZ.v.  "  
                         ,"r|ggg YYNYY.  dddd    d|drrrrv.  "
                         ,"r|    YYDYY.    ddddddd|dddr v.  "
                         ,"r|      r          ddvw=ddrr v.  "
                         ,"r=   dddr     ww     w.ddr orv.  "
                         ,"orrrdrrrrddddd  w x  ddddd  rv.  "
                         ,"    dddrdddddRRR  =  ddddddr v.  "
                         ," x   ddrdddd SHS.   ddddddd  v.  "
                         ," wx  gdrdddd ZDZ.dddddddd  vww.  "
                         ,"  | ggtrdddrrrrddddddddd   v.    "
                         ,"  wx gdrdddr ddddd       vww.    "
                         ,"   |gggrdddr  ddd RRR    v.      "
                         ,"   | g rrrrr dd   SBS.   v.      "
                         ,"   wwxgggrddddddddZDZ.  vw.      "
                         ,"     wwxgrrrrddrrrrrr vww.       "
                         ,"       wwx   dddd   vww.         "
                         ,"         wwwwddddddww.           "
                         ,"                                 "
                         ,"                                 "]);
    
    MapConfig.create({id:MapConstants.CRESCENT_LAKE, numTilesets:1, height:25, width:48,
                      start:MapCoordsAbsolute.create({y:24, x:11}), worldMapExit:MapCoordsAbsolute.create({y:218, x:218}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["                    ttttttttttttttttttttttt     "     
                         ,"vwwwwwwwwwwwwwwwwww tttttttttttttttttttttttt    "
                         ,"v.gg  tttttt          ttt   ttttttttt tt ttttt  "
                         ,"v.     tttttRRR RRR          tttt tt     t ttt  "
                         ,"v. RRR sssttSHS.SBS.xt    t  ttttt        ttttt "
                         ,"v. SWSmsssstYDY.YDY.|ttu  t  ttt tt         ttt "
                         ,"v. YDYnssss fr   rff| tu tt  ttttt           ttt"
                         ,"v.ffrffssssssbsssbss| ut ttt  tt             ttt"
                         ,"v.  rrrbbbbbrrrrrr  | tt ttt  tt             utt"
                         ,"v.tttt sssssr       | tttttt  tt             ttt"
                         ,"v.tttttsssssr ggggtt| tttttt  tu              ut"
                         ,"v.hhRRRsssssrtttt tt| tttttt  ttt             tt"
                         ,"v.hhSASmssssrtRRR tt|ttttttt  tttt          tttt"
                         ,"v.hhZDZnssssr SCS.tt|ttttttt  ttt           tttt"
                         ,"v.hhhr tttttr ZDZ.tt|ttttttt   tttt tt  ut  tttt"
                         ,"v.hhhrrrrrrrrthrh tt|tttttttt  ttttttt  tttt ttt"
                         ,"v.tttttrtttttthrhttt|ttttttttt tttttt   tttttttt"
                         ,"v.tRRRtrtRRRRt r ttt|tttttttt  utt   t  tttttttt"
                         ,"v.tSIStrtSSSSt r ttt|tttttttt ttt      ttttttttt"
                         ,"v.tYDYtrtZZNZt r ttt|tttttttt       tttttttttttt"
                         ,"v.thrhtrtZZDZt r ttt|ttttttttttttttttttttttttttt"
                         ,"v.tfrftrt  r t rt tt|ttttttttttttttttttttttttttt"
                         ,"v.  rrrrrrrrrrrr   u|ttttttttttttttttttttttttttt"
                         ,"v*      tttrtttttttt| tttttttttttttttttttttttttt"
                         ,"L---------+rL-------+  ttttttttttttttttttttttttt"
                         ,"                       utttttttttttttttttttttttt"]);
    
    MapConfig.create({id:MapConstants.ONRAC, numTilesets:1, height:40, width:51, 
                      start:MapCoordsAbsolute.create({y:39, x:16}), worldMapExit:MapCoordsAbsolute.create({y:58, x:61}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["ttttttttttttttttttttttttttttttttttttttttttttttttsss"
                         ,"ttttttttttttttttttttttttttttttttttttttttttttttttsss"
                         ,"tttttttttttttttttttttttvwwwwwwwxttttttttttttttttsss"
                         ,"tttt    tttttt@      ttvt g g t|ttttttttttttttttsss"
                         ,"ttt@ RRR ttttt  RRR   tv       |ttttttttttttttttsss"
                         ,"tt   SIS.tttt   SCS   tv g g g |ttttttttttttttttsss"
                         ,"tt   ZDZ. ttt   ^Y^.  tv       |ttttttttttttttttsss"
                         ,"tt    r   tt    ZDZ.  tv g g g |ttttttttttttttttsss"
                         ,"tt    r   tt     r    tv       |ttttttttttttttttsss"
                         ," t    r  tttt  t r t ttvt     t|ttttttttttttttttsss"
                         ,"  fff r ff  ffff r ffftL--+ L--+ttttttttttttttttsss"
                         ,"      r          r       t r t  ttttttttttttttttsss"
                         ,"      rrrrrrrrrrrrrrrrrrrrrr    ttttttttttttttttsss"
                         ,"                 r     r        ttttttttttttttttsss"
                         ,"  tttttttttt     r     r        ttttttttttttttttsss"
                         ," tttttttttttt    r     r       tttttttttttttttttsss"
                         ,"ttsssssssssttrrrrr     r      ttttttttttttttttttsss"
                         ,"tsRRRRRRRRRsur  utuuuuuruuuuutttttttttttttttttttsss"
                         ,"tsSSS^S^SSSsur  urRRRRRrRRRRRr tttttttttttttttttsss"
                         ,"tsSSSYNYSSSmur  ur^SHS^p^SBS^p tttttttttttttttttsss"
                         ,"ts^S^YDY^S^mur  urZZDZZqZZDZZq tttttttttttttttttsss"
                         ,"tsYYY.r YYYmur  urrrrrrrrrrrrr tttttttttttttttttsss"
                         ,"tsYYY.r YYYnur  uttttttttrttttttttttttttttttsssssss"
                         ,"tsu   r   usurrrrrrrrrrrrr    tttttttttttttsst usss"
                         ,"tsu  rrr  usur                tttttttttttttst  usss"
                         ,"tsu  rFr  usur                ttttttttttttts  uusss"
                         ,"tsu  rrr  ussbssssssssssss    ttttttttmsssss tu sss"
                         ,"tsu   r   usur           s    ttttttttntt      tsss"
                         ,"tsttttrttttsur           sssssttttmssss    uuttssss"
                         ,"tsssssbssssstr           s    ttttt  tt tttttrrrsss"
                         ,"ttttttrtttttrrrrrrrrrrrrrbrrrrrrrrrrrrrrrrrrrrQssss"
                         ,"ttttttrrrrrrr            suuuu     uuuuu  uturrrsss"
                         ,"tttttttttttttt      ttttttttttttttttttttttt uuussss"
                         ,"ttttttttttttttt    ttttttttttttttttttttttttt uuusss"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"tttttttttttttttt  tttttttttttttttttttttttttttttttts"
                         ,"                                                  s"]);
    
    MapConfig.create({id:MapConstants.GAIA, numTilesets:1, height:55, width:55,
                      start:MapCoordsAbsolute.create({y:54, x:54}), worldMapExit:MapCoordsAbsolute.create({y:28, x:221}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["               tttttttttttttttttttttttttttttttttttttttt"
                         ,"         tttttttttttttttttttttttttttttttttttttttttttttt"
                         ,"   fffffttttttttttttttttttttttttttttttttttttttttttttttt"
                         ,"     tttttttttttttttttttttttttttttttttttttttttttttttttt"
                         ," fffttttttttttttttttttttttttttttttttttttttttttttttttttt"
                         ,"   tttttttttttttttttttttttttttttttttttttttttttttttttttt"
                         ," tttttttfffffRRRRRffttttttttttttttttttttttttttttttttttt"
                         ,"ttttttt t@ ttSSCSStt ttttttttttttttttttsssssstttttttttt"
                         ,"ttttttt t    ^SYS^.t  ttttttttttttttttssssssssttttttttt"
                         ,"tttttt  T    ZYDYZ.t t tttttttttttttttssssssssttttttttt"
                         ,"ttttt   fft  TTrTT t    ttttttttttttttssssssssttttttttt"
                         ,"tttt      T    r   T     tttttttttttttusssssstttttttttt"
                         ," ttt      fffffrffff  t t  ttttttttttttu    utttttttttt"
                         ,"   t           r               tttttttttt t tuttttttttt"
                         ,"               r    tt   t   t  tttttttt   tutttttttttt"
                         ,"t              r   ttttt   tt    tttttt t t ttttttttttt"
                         ,"tt      rrrrrrrr tttttttttttt    tttttt     tttttttttt "
                         ,"ttt     r  ttttttttttttttttttt  tttttt   t   tttt  t   "
                         ,"tttttt  r ttttttttttttttttttt  ttttttt  t            u "
                         ,"ttttttt rtttttttttttttttttttt   ttttttt     t tttttttt "
                         ,"ttttttt rttttttttttttttttttt   ttttttttt  t  tttttttttt"
                         ,"ttttttttrtttttttttttttttttt t  tttttttttt    tttttttttt"
                         ,"tttt  ttrtttttttttttttttttt    tttttttttt   ttttttttttt"
                         ,"ttt    trttttttttttttttttttt  tttttttttt  ttttttttttttt"
                         ,"ttrrrrrrrttttttttttttttttttt     tttt    tttttttttttttt"
                         ,"t rtRRR rttttttttttttttttttttt     t   tttttttttttttttt"
                         ,"ttrtISS.rttttttttttttttttttttttt t    ttttttttttttttttt"
                         ,"t rtDYY.rtttttttttttttttttttttttt    tttttttttttttttttt"
                         ,"turtrfffrtttttttttttttttttttttttttttttttttttttttttttttt"
                         ,"turrrrrrrttttttttttttttttttt uu  utttttttttttttttttttt "
                         ,"tt  r  ttttttttttttttttttttt RRRRR tttttttttttttttt    "
                         ,"ttt r ttttttttttttttttttttt tSHSBS. tttttttttttttt     "
                         ,"ttttr tttttttttttttttttt     YDYDY.ttttttttttttt       "
                         ,"ttttr ttttt      tttttt  ttt        ttttttttttt    tttt"
                         ,"ttt rttttt                     ttt  tttttttttt    t    "
                         ,"ttt rttt    ttttt          ttut    tttttttt            "
                         ,"ttt rtt  tttttttttttttt      t   ttttttttt             "
                         ,"ttttr   tttttttttttttttt       tttttttttt     ttttttt  "
                         ," tttr   ttttt     tttttttttttttttttttttt             t "
                         ," tttr  ttttt         tttttttttttttttt                 t"
                         ,"  ttr  ttrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
                         ,"  t r  ttrrrrrrrrrrrrrrRRRRRRRrrrrrrrrrrrrrrrrrrrrrrrrr"
                         ,"  t r tttrrRRRRRRRRR vwSSS^SSSwx rrrtttRRRRtttfRRRRfftr"
                         ,"    r t  rrSWSSSSSAS.vtZZZNZZZ.| rrrt  SHSS.ttrSSBSprtr"
                         ,"ff  rffffrrYDYZYZYDY.vtYYYDYYY.| rrrt  YDYY.ttrZZDZqrtr"
                         ,"    r    rrTrTTTTTr  L---+rL---+ rrrttttrtttttfffrffftr"
                         ,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
                         ,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
                         ,"                                            rr         "
                         ,"ffffffffffff               ffffffffffffffff rr fffffff "
                         ,"                                            rr         "
                         ,"          tttttttt              tttttt      rrrrrrrrrrr"
                         ,"                                            rrrrrrrrrrr"
                         ,"                                                     rr"
                         ,"     fffffff   fffffffff    fffff    fffffffffffffff ro"]);
    
    MapConfig.create({id:MapConstants.LEFEIN, numTilesets:1, height:24, width:57, 
                      start:MapCoordsAbsolute.create({y:23, x:17}), worldMapExit:MapCoordsAbsolute.create({y:99, x:234}),
                      exitOnOutOfBounds:true, hasBattles:false})
             .setMapping(townMapping)
             .addTileset(["                                                 t       "             
                         ,"                               u u             uu RRRR u "
                         ,"vwwwwwwwwwwwwwx     vwwwwwwwwwttuut           tut ^HB^.ut"
                         ,"vorrrrrrrrrrrrwwwwwwworrrrrrrrrrtt           t t  YDDY.t "
                         ,"vrRRRrRRRRRRRrRRRRRRRrRRRRRRrRRRr                        "
                         ,"vr^S^p^S^S^S^p^S^S^S^p^S^^S^p^S^pt              tu t  ut "
                         ,"vrZYZqZYZYZYZqZYZqZYZqZYZZYZqZYZqx               tt   t  "
                         ,"vrt trt t t trt trt trt tt trt tru                       "
                         ,"vrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrtu                      "
                         ,"vrrrruttttttttturrruttttttttturrrxut                     "
                         ,"vrrrrtwwwwwwwwrurrrurwwwwwwwwtrrr|t                      "
                         ,"vrmsssssssssssrurrrurmssssssssssr|                       "
                         ,"vrmorrrrrrrrrmrtrrrtrmorrrrrrrrmr|                       "
                         ,"vrmrrrrrrrrrrmrrrrrrrmrrrrrrrrrmr|                       "
                         ,"vrbbbbbbbbrrrmrrtrtrrmrrrbbbbbbbr|                       "
                         ,"vrmssrrrrrrrrmrtrrrtrmrrrrrrrmssr|                       "
                         ,"vrmssrrrrrrrrmrrrFrrrmrrrrrrrmssr|                       "
                         ,"vrbbbbbbbbrrrmrtrrrtrmrrrbbbbbbbr|                       "
                         ,"vrmssssrrrrrrmrrtrtrrmrrrrrmssssr|                       "
                         ,"vrmssssrrrrrrmrrrrrrrmrrrrrmssssr|                       "
                         ,"vrbbbbbbbbrrrmrurrrurmrrobbbbbbbr|                       "
                         ,"vrmsssssssoronrurrrurmorosssssssr|                       "
                         ,"vrmsssssssssssrtrrrtrmssssssssssr|                       "
                         ,"L------------+rrrrrrrL-----------+                       "]);
  };
  
  return {
    init : init
  };
});