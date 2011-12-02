var TownMaps = (function() {
  
  var self = this;
  
  var townMapping = {
    " " : new Map.Tile({cssClasses:"none", passableUsing:[Movement.Transportation.FOOT]})
   ,"b" : new Map.Tile({cssClasses:"bridge", borderTile:"s", stack:{match:"left right", cssClasses:"vertical"}, passableUsing:[Movement.Transportation.FOOT]})
   ,"d" : new Map.Tile({cssClasses:"desert", passableUsing:[Movement.Transportation.FOOT]})
   ,"f" : new Map.Tile({cssClasses:"fence"})
   ,"g" : new Map.Tile({cssClasses:"grave"})
   ,"h" : new Map.Tile({cssClasses:"hay"})
   ,"m" : new Map.Tile({cssClasses:"stream shadow top", inheritsFrom:"s"})
   ,"n" : new Map.Tile({cssClasses:"stream shadow bottom", inheritsFrom:"s"})
   ,"o" : new Map.Tile({cssClasses:"road", inheritsFrom:"r"})
   ,"p" : new Map.Tile({cssClasses:"road shadow top", inheritsFrom:"r"})
   ,"q" : new Map.Tile({cssClasses:"road shadow bottom", inheritsFrom:"r"})
   ,"r" : new Map.Tile({cssClasses:"road", hasCorners:true, borderTile:"Ropqbr", passableUsing:[Movement.Transportation.FOOT]})
   ,"s" : new Map.Tile({cssClasses:"stream"})
   ,"t" : new Map.Tile({cssClasses:"trees", borderTile:"RTtu", stack:{match:"bottom", cssClasses:"double"}})
   ,"u" : new Map.Tile({cssClasses:"trees"})
   ,"v" : new Map.Tile({cssClasses:"wall vertical", inheritsFrom:"w"})
   ,"w" : new Map.Tile({cssClasses:"wall", borderTile:"wx"})
   ,"x" : new Map.Tile({cssClasses:"wall top half shadow", inheritsFrom:"w"})
   ,"A" : new Map.Tile({cssClasses:"sign armor"})
   ,"B" : new Map.Tile({cssClasses:"sign black magic"})
   ,"C" : new Map.Tile({cssClasses:"sign clinic"})
   ,"D" : new Map.Tile({cssClasses:"door", passableUsing:[Movement.Transportation.FOOT]})
   ,"F" : new Map.Tile({cssClasses:"fountain"})
   ,"H" : new Map.Tile({cssClasses:"sign white magic"})
   ,"I" : new Map.Tile({cssClasses:"sign item"})
   ,"L" : new Map.Tile({cssClasses:"wall half start"})
   ,"N" : new Map.Tile({cssClasses:"sign inn"})
   ,"Q" : new Map.Tile({cssClasses:"submarine", passableUsing:[Movement.Transportation.FOOT]})
   ,"R" : new Map.Tile({cssClasses:"roof top"})
   ,"S" : new Map.Tile({cssClasses:"roof bottom"})
   ,"T" : new Map.Tile({cssClasses:"trees double"})
   ,"W" : new Map.Tile({cssClasses:"sign weapon"})
   ,"Y" : new Map.Tile({cssClasses:"shop wall multi window"})
   ,"Z" : new Map.Tile({cssClasses:"shop wall"})
   ,"." : new Map.Tile({cssClasses:"shadow", stack:{match:"bottom", cssClasses:"full"}, borderTile:".*", passableUsing:[Movement.Transportation.FOOT]})
   ,"*" : new Map.Tile({cssClasses:"shadow full", inheritsFrom:"."})
   ,"@" : new Map.Tile({cssClasses:"well"})
   ,"^" : new Map.Tile({cssClasses:"roof angle"})
   ,"|" : new Map.Tile({cssClasses:"wall vertical shadow"})
   ,"-" : new Map.Tile({cssClasses:"wall half", stack:{match:"right"}, borderTile:"-"})
   ,"+" : new Map.Tile({cssClasses:"wall half shadow", inheritsFrom:"-"})
   ,"=" : new Map.Tile({cssClasses:"wall half corner shadow", inheritsFrom:"-"})
  };
  
  self.Coneria = (function() {
    this.Config = new Map.Config({id:Map.CONERIA, numTilesets:1, tilesPerArea:35});
    // 35x26
    this.Config.addTileset([
      "                                  "                      
     ," xwwwwwwwwwwwwwwtrtwwwwwwwwwwwwwx " 
     ," |tuu       tututrttttttuuuttttt| "
     ," |tRRR RRR   tst r tttt RRR tttt| "
     ," | SBS.SHS.   s  r tttt SCS.tts | "
     ," | ZDZ.ZDZ. rrbrrr ttt  ZDZ. ts | "
     ," |  r   r   r s  r       r    s | "
     ," |  rrrrrrrrr s  r    ff r ff s | "
     ," |            sssbsssssssbsssss | "
     ," |   RRRR RRRR   r       r RRRs | "
     ," |t  SSAS.SSWS. trt      r SISm | "
     ," |tt YYDY.YYDY.rrrrr     r YDYn u "
     ," |ttt  r    r trrrrrt    r  r s t "
     ," |ttt  rrrrrrrrrrFrrrrrrrrrrrrb   "
     ," |t@          trrrrrt         s u "
     ," |t            rrrrr  sssssssss t "
     ," wwwwwwwwxRRRRR trt   s vwwwwwwww "
     ,"         |SSSSS  r    s v.        "
     ,"         |YYNYY.trt   s v.        "
     ,"         |YYDYY. r    s v.        "
     ,"         |  r   trt   s v.        "
     ,"         | frf   r    s v.        "
     ,"         |  rrrrrr   tstv.        "
     ,"         |      uru  tttv.        "
     ,"         wwwwwwttrttwwwww.        "
     ,"                                  "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Pravoka = (function() {
    this.Config = new Map.Config({id:Map.PRAVOKA, numTilesets:1, tilesPerArea:41});
    // 38x34
    this.Config.addTileset([
      "                                         "
     ," vwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwx " 
     ," vmssssssssssssssRRRRRRRsssssssssssssss| " 
     ," vmRRRRRRrrrrrrrs^SS^SS^moRRRRRrrrrrrrs| " 
     ," vm^S^SS^rrrrrrrmYYYNYYYmr^S^S^rrRRRrrm| "
     ," vmYYYYYYprRRRRRmYYYDYYYmrYYYYYpr^H^prm| " 
     ," vmYYYqYYqr^S^S^mrrrrrrrnrYYYYYqrZDZqrm| " 
     ," vmrrrrrrrrYYYYYmsssbssssrrrrrrrrrrrrrm| "
     ," vmrrrrrrrrYYYYYmssorrmssRRRRRrrRRRRrrm| " 
     ," vmrrrrrrrrrrrrrmsororrms^SCS^rr^SS^prm| "
     ," vmrrrrrRRRRRrrrmort trrmYYZYYprYYYYqrm| "
     ," vmrRRRr^S^S^rrrrrt   trrYYDYYqrYYYYrrm| "
     ," vmr^S^rYYYRRRRRrr     rrrrrrrrrrrrrrrm| "
     ," vmrYYYpYYY^S^S^ort   trrrRRRRrrRRRRRrm| "
     ," vmrYYYqrrrYYYYYmort tronr^SS^rr^S^S^rm| "
     ," vmrrrrrrrrYYqYYmsorrronsrYYYYprYYYYYpm| "
     ," vmrrrrrrrrrrrrrrmsrrrmsrrYYYYqrYYqRRRm| " 
     ," vmRRRrrRRRRRrrrrrmrrrmrrRRRrrrrrrr^B^m| " 
     ," vm^S^rr^S^S^ooRRRmrrrmrr^S^rrrRRRrYDYm| " 
     ," vmYYYprYYRRRRR^A^mrrrmrrYYYprr^W^prrrm| "
     ," vmYYYqrYY^S^S^ZDZmrrrmrrYYRRRRYDYqrrrm| "
     ," vmrrrrrrrYYYYYprrmrrrmrrrr^SS^rrRRRRrm| "
     ," vmrrRRRrrYYqYYqrrmrrrmrrrrYYYYpr^SS^rm| "
     ," vmrr^I^prrrrrrrrrmrrrmrrrrYYqYqrYYYYpm| "
     ," vmrrZDZqrrRRRRRrrmrrrmrRRRRRorrrYYqYqm| "
     ," vmrrrrrrrr^S^S^rrmrrrmr^S^S^rrrrrrrrrm| "
     ," vmrRRRRRrrYYYYYprmrrrmrYYYYYprRRRRrrrm| " 
     ," vmr^S^S^rrYYYYYqrmrrrmrYYqYYqr^SS^rrrm| "
     ," vmrYYYYYprrrrrroonrrrmorrrrrrrYYYYprrm| "
     ," vmrYqYYYqrrrrmssssrrrmssssrrrrYYYYqrrm| "
     ," vmorrrrrrrrron|u  rrr  uvsorrrrrrrrron| "
     ," vmssssssssssss|u  rrr  uvmssssssssssss| "
     ," L-------------+u  rrr  uL-------------+ "
     ,"                t  oro  t                "                
     ,"                                         "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Elfland = (function() {
   this.Config = new Map.Config({id:Map.ELFLAND, numTilesets:1, tilesPerArea:44});
   // 44x44
    this.Config.addTileset([
      "                                            "
     ,"  ttttttttttttttt               tttttttt    "
     ," tttttttttssssssssss                     tt " 
     ," tRRRttttttttRRR   s ttt                    "
     ," tSBSttttttttSHS.  b  ttt                   "
     ," tZDZttttttt ZDZ.  s   ttt                  "
     ,"      tttt         s   ttt                  "
     ,"     tttt        tts    ttt                 "
     ," tt  ttt       ttttstt  ttttt               "
     ," ttt          tttttstt   ttttttttttt        "
     ," tttt     tttttttttsttt    ttttttttttt      "
     ," tttt   ttttttttttsstttt    tuttu ggg tt    "
     ," tttt  tttttttttttsttttt     uttt      t  u "
     ," tttsbstttttttttttsttttt  ttRRRt          t "
     ," ttt  ttttttttssssssttt  tttSHSt ttttttt    "
     ," ttt  ttttsssss RRRs    ttttZDZ. ttttttt    "
     ,"  tt  ttt       SISmss    tt      tttttt    "
     ,"  tt  tt        YDY. ssbssssssssssssstt   t "
     ,"  tt                      ttRRR          tt "
     ,"  ttt                    tttSBS.   tRRRRRRt "
     ,"   ttt               tttttttZDZ. tttSNSSSSt "
     ,"   tttttttt      tttttttttttt    tttYDYYYYt "
     ,"   tttttttt   ttttttttRRRtttt    tttt ttttt "
     ,"    tttttt   tttttt  RSCSRtttttt  rrrrrrrrr "
     ,"     ttttt ttttttt   ^ZZZ^.  tttt r     ttt "
     ,"       ttt ttttttt   YYDYY.    tt r         "
     ,"       tt  tRRRtttt    r          rtt       "
     ,"       t    SAS.tt   ffrff      rrrttt      "
     ,"       tt   YDY. t t   r        rttRRR  t   "
     ,"        tt         t   rrrrrrrrrrttSWS. t   "
     ,"        ttt    tttttt       tttttttYDY. t   "
     ,"         ttttttttttttttttttttttttt     tt   "
     ,"          tttttttttttttttttttttttttt  ttt   "
     ,"                    ttttttttttttttttttttt   " 
     ,"                                            "]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Melmond = (function() {
   this.Config = new Map.Config({id:Map.MELMOND, numTilesets:1, tilesPerArea:40});
   // 40x35
   this.Config.addTileset([
     "                              s   "
    ,"         vwwwwwwwwwwwwxgggggg s   "
    ,"       vww.tdtRRRdtdd wwxg  ggs   "
    ,"     vww.dd   SAS.  ddddwwx   s   "
    ,"    vw. ddt   YDY.  t  dddwx ss   "
    ,"    v. dddddt     dd  ddddd= s    "
    ,"   ww.    dorddd   dddddddddds    "
    ," orrrrrr  ro sssssssbsssssssss    "
    ," r   dddddddds  vwww x ddddsss    "
    ," rxddddsssssss gw.   wwxddorossss "
    ," r|   ssdddd  vgg  RRR | drCprv.s "
    ," r|gggsRRRRR  w.ggdSWS.wxorSS v.ss"
    ," r|ggssSSSSS    dddYDY.@|rYqZ.v.  "  
    ," r|ggg YYNYY.  dddd    d|drrrrv.  "
    ," r|    YYDYY.    ddddddd|dddr v.  "
    ," r|      r          ddvw=ddrr v.  "
    ," r=   dddr     ww     w.ddr orv.  "
    ," orrrdrrrrddddd  w x  ddddd  rv.  "
    ,"     dddrdddddRRR  =  ddddddr v.  "
    ,"  x   ddrdddd SHS.   ddddddd  v.  "
    ,"  wx  gdrdddd ZDZ.dddddddd  vww.  "
    ,"   | ggtrdddrrrrddddddddd   v.    "
    ,"   wx gdrdddr ddddd       vww.    "
    ,"    |gggrdddr  ddd RRR    v.      "
    ,"    | g rrrrr dd   SBS.   v.      "
    ,"    wwxgggrddddddddZDZ.  vw.      "
    ,"      wwxgrrrrddrrrrrr vww.       "
    ,"        wwx   dddd   vww.         "
    ,"          wwwwddddddww.           "
    ,"                                  "
    ,"                                  "
   ]);
   this.Config.setMapping(townMapping);
   return this;
  }).call({});
  
  self.CrescentLake = (function() {
    this.Config = new Map.Config({id:Map.CRESCENT_LAKE, numTilesets:1, tilesPerArea:49});
    // 48x25
    this.Config.addTileset([
      "                     ttttttttttttttttttttttt     "     
     ," vwwwwwwwwwwwwwwwwww tttttttttttttttttttttttt    "
     ," v.gg  tttttt          ttt   ttttttttt tt ttttt  "
     ," v.     tttttRRR RRR          tttt tt     t ttt  "
     ," v. RRR sssttSHS.SBS.xt    t  ttttt        ttttt "
     ," v. SWSmsssstYDY.YDY.|ttu  t  ttt tt         ttt "
     ," v. YDYnssss fr   rff| tu tt  ttttt           ttt"
     ," v.ffrffssssssbsssbss| ut ttt  tt             ttt"
     ," v.  rrrbbbbbrrrrrr  | tt ttt  tt             utt"
     ," v.tttt sssssr       | tttttt  tt             ttt"
     ," v.tttttsssssr ggggtt| tttttt  tu              ut"
     ," v.hhRRRsssssrtttt tt| tttttt  ttt             tt"
     ," v.hhSASmssssrtRRR tt|ttttttt  tttt          tttt"
     ," v.hhZDZnssssr SCS.tt|ttttttt  ttt           tttt"
     ," v.hhhr tttttr ZDZ.tt|ttttttt   tttt tt  ut  tttt"
     ," v.hhhrrrrrrrrthrh tt|tttttttt  ttttttt  tttt ttt"
     ," v.tttttrtttttthrhttt|ttttttttt tttttt   tttttttt"
     ," v.tRRRtrtRRRRt r ttt|tttttttt  utt   t  tttttttt"
     ," v.tSIStrtSSSSt r ttt|tttttttt ttt      ttttttttt"
     ," v.tYDYtrtZZNZt r ttt|tttttttt       tttttttttttt"
     ," v.thrhtrtZZDZt r ttt|ttttttttttttttttttttttttttt"
     ," v.tfrftrt  r t rt tt|ttttttttttttttttttttttttttt"
     ," v.  rrrrrrrrrrrr   u|ttttttttttttttttttttttttttt"
     ," v*      tttrtttttttt| tttttttttttttttttttttttttt"
     ," L---------+rL-------+  ttttttttttttttttttttttttt"
     ,"                        utttttttttttttttttttttttt"
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Onrac = (function() {
   this.Config = new Map.Config({id:Map.ONRAC, numTilesets:1, tilesPerArea:52});
   // 52x38
   this.Config.addTileset([
     " ttttttttttttttttttttttttttttttttttttttttttttttttsss"
    ," ttttttttttttttttttttttttttttttttttttttttttttttttsss"
    ," tttttttttttttttttttttttvwwwwwwwxttttttttttttttttsss"
    ," tttt    tttttt@      ttvt g g t|ttttttttttttttttsss"
    ," ttt@ RRR ttttt  RRR   tv       |ttttttttttttttttsss"
    ," tt   SIS.tttt   SCS   tv g g g |ttttttttttttttttsss"
    ," tt   ZDZ. ttt   ^Y^.  tv       |ttttttttttttttttsss"
    ," tt    r   tt    ZDZ.  tv g g g |ttttttttttttttttsss"
    ," tt    r   tt     r    tv       |ttttttttttttttttsss"
    ,"  t    r  tttt  t r t ttvt     t|ttttttttttttttttsss"
    ,"   fff r ff  ffff r ffftL--+ L--+ttttttttttttttttsss"
    ,"       r          r       t r t  ttttttttttttttttsss"
    ,"       rrrrrrrrrrrrrrrrrrrrrr    ttttttttttttttttsss"
    ,"                  r     r        ttttttttttttttttsss"
    ,"   tttttttttt     r     r        ttttttttttttttttsss"
    ,"  tttttttttttt    r     r       tttttttttttttttttsss"
    ," ttsssssssssttrrrrr     r      ttttttttttttttttttsss"
    ," tsRRRRRRRRRsur  utuuuuuruuuuutttttttttttttttttttsss"
    ," tsSSS^S^SSSsur  urRRRRRrRRRRRr tttttttttttttttttsss"
    ," tsSSSYNYSSSmur  ur^SHS^p^SBS^p tttttttttttttttttsss"
    ," ts^S^YDY^S^mur  urZZDZZqZZDZZq tttttttttttttttttsss"
    ," tsYYY.r YYYmur  urrrrrrrrrrrrr tttttttttttttttttsss"
    ," tsYYY.r YYYnur  uttttttttrttttttttttttttttttsssssss"
    ," tsu   r   usurrrrrrrrrrrrr    tttttttttttttsst usss"
    ," tsu  rrr  usur                tttttttttttttst  usss"
    ," tsu  rFr  usur                ttttttttttttts  uusss"
    ," tsu  rrr  ussbssssssssssss    ttttttttmsssss tu sss"
    ," tsu   r   usur           s    ttttttttntt      tsss"
    ," tsttttrttttsur           sssssttttmssss    uuttssss"
    ," tsssssbssssstr           s    ttttt  tt tttttrrrsss"
    ," ttttttrtttttrrrrrrrrrrrrrbrrrrrrrrrrrrrrrrrrrrQssss"
    ," ttttttrrrrrrr            suuuu     uuuuu  uturrrsss"
    ," tttttttttttttt      ttttttttttttttttttttttt uuussss"
    ," ttttttttttttttt    ttttttttttttttttttttttttt uuusss"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ," tttttttttttttttt  tttttttttttttttttttttttttttttttts"
    ,"                                                   s"
   ]);
   this.Config.setMapping(townMapping);
   return this;
  }).call({});
  
  self.Gaia = (function() {
   this.Config = new Map.Config({id:Map.GAIA, numTilesets:1, tilesPerArea:58});
    // 55x58
    this.Config.addTileset([
     ,"                tttttttttttttttttttttttttttttttttttttttt "
     ,"          tttttttttttttttttttttttttttttttttttttttttttttt "
     ,"    fffffttttttttttttttttttttttttttttttttttttttttttttttt "
     ,"      tttttttttttttttttttttttttttttttttttttttttttttttttt "
     ,"  fffttttttttttttttttttttttttttttttttttttttttttttttttttt "
     ,"    tttttttttttttttttttttttttttttttttttttttttttttttttttt "
     ,"  tttttttfffffRRRRRffttttttttttttttttttttttttttttttttttt "
     ," ttttttt t@ ttSSCSStt ttttttttttttttttttsssssstttttttttt "
     ," ttttttt t    ^SYS^.t  ttttttttttttttttssssssssttttttttt "
     ," tttttt  T    ZYDYZ.t t tttttttttttttttssssssssttttttttt "
     ," ttttt   fft  TTrTT t    ttttttttttttttssssssssttttttttt "
     ," tttt      T    r   T     tttttttttttttusssssstttttttttt "
     ,"  ttt      fffffrffff  t t  ttttttttttttu    utttttttttt "
     ,"    t           r               tttttttttt t tuttttttttt "
     ,"                r    tt   t   t  tttttttt   tutttttttttt "
     ," t              r   ttttt   tt    tttttt t t ttttttttttt "
     ," tt      rrrrrrrr tttttttttttt    tttttt     tttttttttt  "
     ," ttt     r  ttttttttttttttttttt  tttttt   t   tttt  t    "
     ," tttttt  r ttttttttttttttttttt  ttttttt  t            u  "
     ," ttttttt rtttttttttttttttttttt   ttttttt     t tttttttt  "
     ," ttttttt rttttttttttttttttttt   ttttttttt  t  tttttttttt "
     ," ttttttttrtttttttttttttttttt t  tttttttttt    tttttttttt "
     ," tttt  ttrtttttttttttttttttt    tttttttttt   ttttttttttt "
     ," ttt    trttttttttttttttttttt  tttttttttt  ttttttttttttt "
     ," ttrrrrrrrttttttttttttttttttt     tttt    tttttttttttttt "
     ," t rtRRR rttttttttttttttttttttt     t   tttttttttttttttt "
     ," ttrtISS.rttttttttttttttttttttttt t    ttttttttttttttttt "
     ," t rtDYY.rtttttttttttttttttttttttt    tttttttttttttttttt "
     ," turtrfffrtttttttttttttttttttttttttttttttttttttttttttttt "
     ," turrrrrrrttttttttttttttttttt uu  utttttttttttttttttttt  "
     ," tt  r  ttttttttttttttttttttt RRRRR tttttttttttttttt     "
     ," ttt r ttttttttttttttttttttt tSHSBS. tttttttttttttt      "
     ," ttttr tttttttttttttttttt     YDYDY.ttttttttttttt        "
     ," ttttr ttttt      tttttt  ttt        ttttttttttt    tttt "
     ," ttt rttttt                     ttt  tttttttttt    t     "
     ," ttt rttt    ttttt          ttut    tttttttt             "
     ," ttt rtt  tttttttttttttt      t   ttttttttt              "
     ," ttttr   tttttttttttttttt       tttttttttt     ttttttt   "
     ,"  tttr   ttttt     tttttttttttttttttttttt             t  "
     ,"  tttr  ttttt         tttttttttttttttt                 t "
     ,"   ttr  ttrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr "
     ,"   t r  ttrrrrrrrrrrrrrrRRRRRRRrrrrrrrrrrrrrrrrrrrrrrrrr "
     ,"   t r tttrrRRRRRRRRR vwSSS^SSSwx rrrtttRRRRtttfRRRRfftr "
     ,"     r t  rrSWSSSSSAS.vtZZZNZZZ.| rrrt  SHSS.ttrSSBSprtr "
     ," ff  rffffrrYDYZYZYDY.vtYYYDYYY.| rrrt  YDYY.ttrZZDZqrtr "
     ,"     r    rrTrTTTTTr  L---+rL---+ rrrttttrtttttfffrffftr "
     ," rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr "
     ," rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr "
     ,"                                             rr          "
     ," ffffffffffff               ffffffffffffffff rr fffffff  "
     ,"                                             rr          "
     ,"           tttttttt              tttttt      rrrrrrrrrrr "
     ,"                                             rrrrrrrrrrr "
     ,"                                                      rr "
     ,"      fffffff   fffffffff    fffff    fffffffffffffff rr " 
     ,"                                                         "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Lefein = (function() {
   this.Config = new Map.Config({id:Map.LEFEIN, numTilesets:1, tilesPerArea:58});
    // 
    this.Config.addTileset([
      "                                                           "
     ,"                                                  t        "                      
     ,"                                u u             uu RRRR u  "
     ," vwwwwwwwwwwwwwx     vwwwwwwwwwttuut           tut ^HB^.ut "
     ," vorrrrrrrrrrrrwwwwwwworrrrrrrrrrtt           t t  YDDY.t  "
     ," vrRRRrRRRRRRRrRRRRRRRrRRRRRRrRRRr                         "
     ," vr^S^p^S^S^S^p^S^S^S^p^S^^S^p^S^pt              tu t  ut  "
     ," vrZYZqZYZYZYZqZYZqZYZqZYZZYZqZYZqx               tt   t   "
     ," vrt trt t t trt trt trt tt trt tru                        "
     ," vrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrtu                       "
     ," vrrrruttttttttturrruttttttttturrrxut                      "
     ," vrrrrtwwwwwwwwrurrrurwwwwwwwwtrrr|t                       "
     ," vrmsssssssssssrurrrurmssssssssssr|                        "
     ," vrmorrrrrrrrrmrtrrrtrmorrrrrrrrmr|                        "
     ," vrmrrrrrrrrrrmrrrrrrrmrrrrrrrrrmr|                        "
     ," vrbbbbbbbbrrrmrrtrtrrmrrrbbbbbbbr|                        "
     ," vrmssrrrrrrrrmrtrrrtrmrrrrrrrmssr|                        "
     ," vrmssrrrrrrrrmrrrFrrrmrrrrrrrmssr|                        "
     ," vrbbbbbbbbrrrmrtrrrtrmrrrbbbbbbbr|                        "
     ," vrmssssrrrrrrmrrtrtrrmrrrrrmssssr|                        "
     ," vrmssssrrrrrrmrrrrrrrmrrrrrmssssr|                        "
     ," vrbbbbbbbbrrrmrurrrurmrrobbbbbbbr|                        "
     ," vrmsssssssoronrurrrurmorosssssssr|                        "
     ," vrmsssssssssssrtrrrtrmssssssssssr|                        "
     ," L------------+rrrrrrrL-----------+                        "
     ,"                                                           "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  
  return this;
}).call({});