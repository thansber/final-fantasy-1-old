var TownMaps = (function() {
  
  var self = this;
  
  var townMapping = {
    " " : new Map.Tile({cssClasses:"none", passableUsing:[Movement.Transportation.FOOT]})
   ,"b" : new Map.Tile({cssClasses:"bridge", borderTile:"s", stack:{match:"left right"}, passableUsing:[Movement.Transportation.FOOT]})
   ,"f" : new Map.Tile({cssClasses:"fence"})
   ,"m" : new Map.Tile({cssClasses:"stream shadow top", inheritsFrom:"s"})
   ,"n" : new Map.Tile({cssClasses:"stream shadow bottom", inheritsFrom:"s"})
   ,"o" : new Map.Tile({cssClasses:"road", inheritsFrom:"r"})
   ,"p" : new Map.Tile({cssClasses:"road shadow top", inheritsFrom:"r"})
   ,"q" : new Map.Tile({cssClasses:"road shadow bottom", inheritsFrom:"r"})
   ,"r" : new Map.Tile({cssClasses:"road", hasCorners:true, borderTile:"Rfpqr", passableUsing:[Movement.Transportation.FOOT]})
   ,"s" : new Map.Tile({cssClasses:"stream"})
   ,"t" : new Map.Tile({cssClasses:"trees", borderTile:"t", stack:{match:"bottom"}})
   ,"u" : new Map.Tile({cssClasses:"trees"})
   ,"w" : new Map.Tile({cssClasses:"wall", hasSides:true, hasCorners:true, stack:{match:"top bottom"}, borderTile:"wxy"})
   ,"x" : new Map.Tile({cssClasses:"wall right", inheritsFrom:"w"})
   ,"y" : new Map.Tile({cssClasses:"wall shadow", inheritsFrom:"w"})
   ,"A" : new Map.Tile({cssClasses:"sign armor"})
   ,"B" : new Map.Tile({cssClasses:"sign black magic"})
   ,"C" : new Map.Tile({cssClasses:"sign clinic"})
   ,"D" : new Map.Tile({cssClasses:"door", passableUsing:[Movement.Transportation.FOOT]})
   ,"F" : new Map.Tile({cssClasses:"fountain"})
   ,"H" : new Map.Tile({cssClasses:"sign white magic"})
   ,"I" : new Map.Tile({cssClasses:"sign item"})
   ,"N" : new Map.Tile({cssClasses:"sign inn"})
   ,"R" : new Map.Tile({cssClasses:"roof top"})
   ,"S" : new Map.Tile({cssClasses:"roof bottom"})
   ,"W" : new Map.Tile({cssClasses:"sign weapon"})
   ,"Y" : new Map.Tile({cssClasses:"shop wall multi window"})
   ,"Z" : new Map.Tile({cssClasses:"shop wall"})
   ,"." : new Map.Tile({cssClasses:"shadow", stack:{match:"bottom"}, borderTile:".", passableUsing:[Movement.Transportation.FOOT]})
   ,"@" : new Map.Tile({cssClasses:"well"})
   ,"^" : new Map.Tile({cssClasses:"roof angle"})
  };
  
  self.Coneria = (function() {
    this.Config = new Map.Config({id:Map.CONERIA, numTilesets:1, tilesPerArea:35});
    // 35x26
    this.Config.addTileset([
      "                                  "                      
     ," wwwwwwwwwwwwwwwtrtwwwwwwwwwwwwww " 
     ," wttt       tututrttttttttttttttw "
     ," wtRRR RRR   tst r tttt RRR ttttw "
     ," w SBS.SHS.   s  r tttt SCS.tts w "
     ," w ZDZ.ZDZ. rrbrrr ttt  ZDZ. ts w "
     ," w  r   r   r s  r       r    s w "
     ," w  rrrrrrrrr s  r    ff r ff s w "
     ," w            sssbsssssssbsssss w "
     ," w   RRRR RRRR   r       r RRRs w "
     ," wt  SSAS.SSWS. trt      r SISm w "
     ," wtt YYDY.YYDY.rrrrr     r YDYn u "
     ," wttt  r    r trrrrrt    r  r s t "
     ," wttt  rrrrrrrrrrFrrrrrrrrrrrrb   "
     ," wt@          trrrrrt         s u "
     ," wt            rrrrr  sssssssss t "
     ," wwwwwwwwwRRRRR trt   s xwwwwwwww "
     ,"         wSSSSS  r    s x.        "
     ,"         wYYNYY.trt   s x.        "
     ,"         wYYDYY. r    s x.        "
     ,"         w  r   trt   s x.        "
     ,"         w frf   r    s x.        "
     ,"         w  rrrrrr   tstx.        "
     ,"         w      uru  tttx.        "
     ,"         wwwwwwttrttwwwww.        "
     ,"                                  "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  self.Pravoka = (function() {
    this.Config = new Map.Config({id:Map.PRAVOKA, numTilesets:1, tilesPerArea:41});
    // 38x 
    this.Config.addTileset([
      "                                         "
     ," xwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww " 
     ," xmssssssssssssssRRRRRRRsssssssssssssssw " 
     ," xmRRRRRRrrrrrrrs^SS^SS^moRRRRRrrrrrrrsw " 
     ," xm^S^SS^rrrrrrrmYYYNYYYmr^S^S^rrRRRrrmw "
     ," xmYYYYYYprRRRRRmYYYDYYYmrYYYYYpr^H^prmw " 
     ," xmYYYqYYqr^S^S^mrrrrrrrnrYYYYYqrZDZqrmw " 
     ," xmrrrrrrrrYYYYYmsssbssssrrrrrrrrrrrrrmw "
     ," xmrrrrrrrrYYYYYmssrrrmssRRRRRrrRRRRrrmw " 
     ," xmrrrrrrrrrrrrrmsrrrrrms^SCS^rr^SS^prmw "
     ," xmrrrrrRRRRRrrrmrrt trrmYYZYYprYYYYqrmw "
     ," xmrRRRr^S^S^rrrrrt   trrYYDYYqrYYYYrrmw "
     ," xmr^S^rYYYRRRRRrr     rrrrrrrrrrrrrrrmw "
     ," xmrYYYpYYY^S^S^rrt   trrrRRRRrrRRRRRrmw "
     ," xmrYYYqrrrYYYYYmrrt trrnr^SS^rr^S^S^rmw "
     ," xmrrrrrrrrYYqYYmsrrrrrnsrYYYYprYYYYYpmw "
     ," xmrrrrrrrrrrrrrrmsrrrmsrrYYYYqrYYqRRRmw " 
     ," xmRRRrrRRRRRrrrrrmrrrmrrRRRrrrrrrr^B^mw " 
     ," xm^S^rr^S^S^rrRRRmrrrmrr^S^rrrRRRrYDYmw " 
     ," xmYYYprYYRRRRR^A^mrrrmrrYYYprr^W^prrrmw "
     ," xmYYYqrYY^S^S^ZDZmrrrmrrYYRRRRYDYqrrrmw "
     ," xmrrrrrrrYYYYYprrmrrrmrrrr^SS^rrRRRRrmw "
     ," xmrrRRRrrYYqYYqrrmrrrmrrrrYYYYpr^SS^rmw "
     ," xmrr^I^prrrrrrrrrmrrrmrrrrYYqYqrYYYYpmw "
     ," xmrrZDZqrrRRRRRrrmrrrmrRRRRRrrrrYYqYqmw "
     ," xmrrrrrrrr^S^S^rrmrrrmr^S^S^rrrrrrrrrmw "
     ," xmrRRRRRrrYYYYYprmrrrmrYYYYYprRRRRrrrmw " 
     ," xmr^S^S^rrYYYYYqrmrrrmrYYqYYqr^SS^rrrmw "
     ," xmrYYYYYprrrrrrrrnrrrmrrrrrrrrYYYYprrmw "
     ," xmrYqYYYqrrrrmssssrrrmssssrrrrYYYYqrrmw "
     ," xmrrrrrrrrrrrnwu  rrr  uxsrrrrrrrrrrrnw "
     ," xmsssssssssssswu  rrr  uxmssssssssssssw "
     ," xwwwwwwwwwwwwwwu  rrr  uwwwwwwwwwwwwwww "
     ,"                t  rrr  t                "                
     ,"                                         "
    ]);
    this.Config.setMapping(townMapping);
    return this;
  }).call({});
  
  return this;
}).call({});