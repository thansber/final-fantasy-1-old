define(/* CastleMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var mapOptions = function(opt) {
    return $.extend({
      exitOnOutOfBounds: true
    }, opt);
  };
  
  var tiles = {
    ".." : {y:6, x:4, desc:"grass"},
    "~": {y:7, x:4, desc:"sky"},
    "." : {y:0, x:4, desc:"road"},
    "WW" : {y:1, x:4, desc:"wall"},
    "W+": {y:1, x:3, desc:"wall top left"},
    "+W": {y:1, x:5, desc:"wall top right"},
    "W|": {y:0, x:3, desc:"wall left"},
    "|W": {y:0, x:5, desc:"wall right"},
    "I" : {y:2, x:4, desc:"pillar"},
    "^" : {y:2, x:5, desc:"stairs up"},
    "v" : {y:3, x:5, desc:"stairs down"},
    "[]" : {y:3, x:3, desc:"door", inside:{y:3, x:4}},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}},
    "#-": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "--": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "-#": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "#|": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "|#": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "#_": {y:2, x:0, desc:"room wall boTTom left", inside:{y:5, x:0}},
    "__": {y:2, x:1, desc:"room wall boTTom", inside:{y:5, x:1}},
    "_#": {y:2, x:2, desc:"room wall boTTom right", inside:{y:5, x:2}},
    "$": {y:1, x:1, desc:"chest", inside:{y:5, x:4}},
    "T-": {y:1, x:1, desc:"throne top left", inside:{y:6, x:0}},
    "TT": {y:1, x:1, desc:"throne top", inside:{y:6, x:1}},
    "-T": {y:1, x:1, desc:"throne top right", inside:{y:6, x:2}},
    "T|": {y:1, x:1, desc:"throne boTTom left", inside:{y:7, x:0}},
    "tt": {y:1, x:1, desc:"throne boTTom", inside:{y:7, x:1}},
    "|T": {y:1, x:1, desc:"throne boTTom right", inside:{y:7, x:2}},
    "==": {y:1, x:1, desc:"bed top", inside:{y:6, x:5}},
    "HH": {y:1, x:1, desc:"bed boTTom", inside:{y:7, x:5}},
    "FP" : {y:1, x:1, desc:"fireplace", inside:{y:4, x:4}},
    "s-": {y:1, x:1, desc:"stool left", inside:{y:5, x:5}},
    "-s": {y:1, x:1, desc:"stool right", inside:{y:5, x:3}},
    "T^": {y:1, x:1, desc:"table top", inside:{y:6, x:3}},
    "Tv": {y:1, x:1, desc:"table boTTom", inside:{y:7, x:3}},
    "{" : {y:1, x:1, desc:"statue left", inside:{y:4, x:5}},
    "}" : {y:1, x:1, desc:"statue right", inside:{y:4, x:3}},
  };
  
  var init = function() {

    Map.create(MapConstants.CONERIA_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites("W+ WW WW WW WW WW WW WW WW WW WW WW WW +W .. W+ WW WW WW WW WW WW WW WW WW WW WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  W+ WW WW WW +W .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. W+ WW WW WW +W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW WW WW .  .  .  WW WW WW WW WW WW .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW +W #- -- -- -- -# #- -- -- -- -# W| .  .  .  |W .  |W")
       .sprites("W| .  WW W+ .  +W WW .  .  .  .  |W #| $  $  $  |# #| $  $  $  |# WW WW .  +W WW .  |W")
       .sprites("W| .  .. W| .  |W .  .  WW WW WW +W #| ,  ,  ,  |# #| ,  ,  ,  |# .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W #_ __ __ __ _# #_ __ __ __ _# .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W WW WW [] WW WW WW WW [] WW WW .  I  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  I  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  .  .  .  ^  .  .  .  .  .  .  .  WW WW WW +W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #- -- -- -- -# .  I  .  .  .  I  .  #- -- -- -- -# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| }  FP {  |# .  .  .  .  .  .  .  #| }  FP {  |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  == ,  |# .  I  .  .  .  I  .  #| -s T^ s- |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  HH -s |# .  .  .  .  .  .  .  #| -s Tv s- |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  ,  -s |# .  I  .  .  .  I  .  #| ,  ,  ,  |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #_ __ __ __ _# .  .  .  .  .  .  .  #_ __ __ __ _# .  .  |W .. .  |W")
       .sprites("W| .  W+ WW WW .  WW WW [] WW +W .  I  .  .  .  I  .  WW WW [] WW WW .  .  .  +W .  |W")
       .sprites("W| .  W| .  .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW WW .  .  .  .  .  WW WW WW WW WW W| .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. W| .  .  .  |W .  |W")
       .sprites("W| .  WW WW WW WW WW .. .. .. .. .. .  .  .  .  .  .. .. .. .. .. WW WW WW WW WW .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. WW WW .  WW WW .. .. .. .. .. .. .. .. .. .. .. .");
    
    Map.create(MapConstants.CONERIA_CASTLE_2F, mapOptions({start:{y:16, x:13}})).tileMapping(tiles)
       .sprites("~  ~  ~  ~  ~  ~  #- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  T- TT -T ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #| ,  ,  }  }  T| tt |T {  {  ,  ,  |# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  __ _# ~  ~  ~  ~  ~  ~") 
       .sprites("~  ~  ~  ~  ~  ~  WW WW #| ,  ,  ,  ,  ,  ,  ,  |# WW WW ~  ~  ~  ~  ~  ~") 
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW W+ WW WW [] WW WW +W WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  W+ WW WW WW WW +W")
       .sprites("W| .  .  .  .  .  WW WW WW WW .  .  .  .  .  WW WW WW WW .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");
    
    
    
    Map.create(MapConstants.ELF_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .  .  .  .  ..") 
       .sprites("W+ WW WW WW +W .. .. .. .. .. .. .. W+ WW WW WW +W .. .. .  #- -- -- -- -- -# .")
       .sprites("W| .  .  .  .  WW WW WW WW WW WW WW .  .  .  .  |W .. .  .  #| $  $  $  $  |# .")
       .sprites("W| .  I  .  .  .  .  .  .  .  .  .  .  .  I  .  |W .. .  .  #_ __ __ __ __ _# .")
       .sprites("W| .  .  .  |W #- -- -- -- -- -- -# W| .  .  .  |W .. .  .  WW [] WW WW WW WW .")
       .sprites("WW W+ .  +W #- ,  ,  }  FP {  ,  ,  -# W+ .  +W WW .. .. .  .  .  .  .  .  .  ..")
       .sprites(".. W| .  |W #| ,  ,  ,  == -s ,  ,  |# W| .  |W .. .. .. .. .  .  .  .  .  .. ..")
       .sprites(".. W| .  |W #| ,  ,  ,  HH ,  ,  ,  |# W| .  |W .. .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. W| .  |W #| ,  ,  ,  ,  ,  ,  ,  |# W| .  |W .. .. .. .. .. W+ WW WW WW +W ..")
       .sprites(".. W| .  |W #| }  ,  ,  ,  ,  ,  {  |# W+ .  WW WW WW WW WW WW .  .  .  .  |W ..")
       .sprites(".. W| .  |W #_ __ __ __ __ __ __ __ _# W| .  .  .  .  .  .  .  .  .  I  .  |W ..")
       .sprites(".. W| .  |W WW WW WW WW [] WW WW WW +W WW WW WW WW WW WW .  WW W| .  .  .  |W ..")
       .sprites(".. W| .  |W .  .  .  I  .  I  .  .  |W .. .. .. .. .. .. .. .. WW W+ .  +W WW ..")
       .sprites("W+ WW .  WW +W .  .  .  .  .  .  .  |W .. .. .. .. .. .. .. .. .. W| .  |W .. ..")
       .sprites("W| .  .  .  .  WW .  WW W| .  .  WW WW WW WW WW WW WW WW WW WW WW .  .  |W .. ..")
       .sprites("W| .  I  .  .  .  .  .  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. ..")
       .sprites("W| .  .  .  |W WW WW WW W| .  |W WW WW WW +W .  .  .  W+ WW WW WW W| .  |W .. ..")
       .sprites("WW WW .  WW WW .. .. .. W| .  |W .  .  .  |W .  .  .  W| .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .  .  .  |W .  .  .  W| .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W WW WW WW WW .  .  .  WW WW WW WW W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. .. .  .  .  .. .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. I  .  .  .  I  .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. I  .  .  .  .  .  I  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .  .  .  .  .  .  .  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. I  .  .  .  .  .  I  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. I  .  .  .  I  .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. W+ WW .  WW +W .. .. .. .  .  .  .. .. .. W+ .  .  .  +W ..")
       .sprites(".. .. .. .. .. .. .. W| .  .  .  .  WW WW .. .  .  .  .. WW WW .  .  .  .  |W ..")
       .sprites(".. .. .. .. .. .. .. W| .  I  .  .  .  .  .. .  .  .  .. .  .  .  .  I  .  |W ..")
       .sprites(".. .. .. .. .. .. .. W| .  .  .  |W WW WW .. .  .  .  .. WW WW W| .  .  .  |W ..")
       .sprites(".. .. .. .. .. .. .. WW WW WW WW WW .. .. .. .  .  .  .. .. .. WW WW WW WW WW ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. .. .. ..");

    Map.create(MapConstants.ASTOS_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites(".. .. W+ WW +W .. .. W+ WW WW WW WW WW W+ WW WW WW +W .. .. .. .. .. .. .. .. W+ WW +W .. ..")
       .sprites(".. W+ .  .  .  +W .. W| .  .  .  .  .  .  .  .  .  |W WW WW WW +W .. .. .. W+ .  .  .  +W ..")
       .sprites("W+ .  .  .  .  .  WW W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW WW .  .  .  .  .  +W")
       .sprites("W| .  .. .. .  .  .  W| .  .  .  .  .  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW .. .. .  .  .  .  W| .  .  .  .  .  #- -- -- -- -# .  .  .  |W .  WW WW W| .  .  .  |W WW")
       .sprites(".. .. .  .  |W WW .  +W .  #- -- -- -- ,  T- TT -T ,  -- -- -- -# .. .. .. WW W| .  |W WW ..")
       .sprites(".. .. W+ .  +W .  .  |W .. #_ ,  ,  ,  }  T| tt |T {  ,  ,  ,  _# .. .. .. .. W+ .  +W .. ..")
       .sprites(".. .. W| .  .  .  .  |W .. WW #_ ,  }  ,  ,  ,  ,  ,  {  ,  _# WW WW WW WW .  W| .  |W .. ..")
       .sprites(".. .. .  .  .  .  .  |W .. .. WW #_ ,  }  ,  ,  ,  {  ,  _# +W .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W .  .  |W .. .. .. WW #_ ,  }  ,  {  ,  _# WW |W .  I  .  I  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W WW .  WW .. .. .. .. WW #_ __ __ __ _# WW .  .  .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. W| .  |W .  .  .  .  .  .  .  .  WW W+ [] +W WW .  .  |W .  I  .  I  .  .  .  .  .. ..")
       .sprites(".. .. W| .  |W .  .  #- -- -- -- -# .  .  W| .  |W .  .  .  |W .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. .. .  |W .  #- $  ,  ,  ,  $  -# .  W| .  |W WW .  WW +W .  I  .  I  .  W| .  .  .. ..")
       .sprites(".. .. .. .. |W .  #| ,  ,  $  ,  ,  |# .  W| .  |W .  .  .  |W .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W .  #_ ,  ,  ,  ,  ,  _# .  W| .  .  .  .  .  |W .  I  .  I  .  .  .  |W .. ..")
       .sprites(".. .. W| .  |W .  WW #_ __ __ __ _# WW .  W| .  .  .  .  .  .  .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. W+ .  +W .  .  WW WW [] WW WW .  .  W| .  |W .  .  .  .  .  I  .  I  .  W| .  |W .. ..")
       .sprites(".. W+ .  .  .  +W .  .  .  .  .  .  .  W+ .  .  .  +W .  .  .  .  .  .  .  W+ .  .  .  +W ..")
       .sprites("W+ .  .  .  .  .  +W WW WW .  WW WW W+ .  .  .  .  .  +W .  .  WW WW .  WW .  .  .  .  .  +W")
       .sprites("W| .  .  .  .  .  |W .  .  .  .  .  W| .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW W| .  .  .  |W WW WW .  .  .  WW WW W| .  .  .  |W WW WW W| .  |W WW WW W| .  .  .  |W WW")
       .sprites(".. WW W| .  |W WW .. .. .. .. .. .. .. WW W| .  |W WW .. .. W| .  |W .. .. WW W| .  |W WW ..")
       .sprites(".. .. WW .  WW .. .. .. .. .. .. .. .. .. WW WW WW .. .. .. W| .  |W .. .. .. WW .  WW .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. WW .  WW .. .. .. .. .. .. .. ..");
    
    Map.create(MapConstants.CASTLE_ORDEALS_1F, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites("#- -- -- -- -- -# .. .. .. .. .. .. .. .. .. .. .. .. .. #- -- -- -- -- -#")
       .sprites("#| T- TT -T ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#| T| tt |T ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("#_ __ __ __ __ _# .  .  .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ _#")
       .sprites("WW WW WW W+ [] WW .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW +W WW WW WW")
 .repeatSprites(".. .. .. W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .. ..", 5)
       .sprites(".. .. .. W| .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  I  .  .  .  .  .  I  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  |W .. .. ..")
 .repeatSprites(".. .. .. W| .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  |W .. .. ..", 4)
       .sprites("#- -- -- -- -- -# .  .  .  .  .  I  .  I  .  .  .  .  .  #- -- -- -- -- -#")
       .sprites("#| ,  ,  ,  ,  |# .  .  .  .  .  I  .  I  .  .  .  .  .  #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW I  .  I  WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#_ __ __ __ __ _# .. .. .. .. .. .. .. .. .. .. .. .. .. #_ __ __ __ __ _#")
       .sprites("WW WW WW WW WW WW .. .. .. .. .. .. .. .. .. .. .. .. .. WW WW WW WW WW WW")

    Map.create(MapConstants.CASTLE_ORDEALS_2F, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -#")
       .sprites("W| I  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  }  $  {  |#")
       .sprites("W| .  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("W| .  .  .  .  |W WW +W WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("W| .  .  .  .  |W .  |W .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ _#")
       .sprites("WW WW WW W+ WW WW .  |W .  WW WW WW WW WW WW WW WW WW .  WW [] +W WW WW WW")
       .sprites("~  ~  ~  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W+ WW W+ WW +W .  .  .  W+ WW WW WW +W .  W+ .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| I  W| I  .  WW WW WW W| .  .  .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  .  .  W| .  I  .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| I  .  .  .  .  W| .  .  .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W+ WW WW WW #- -- -# WW WW .  +W .  W| I  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  #| ,  |# .  .  .  |W .  WW WW +W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  WW WW #_ ,  _# WW WW WW +W .  .  I  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  W+ [] WW .  .  .  |W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  I  .  W| .  .  .  .  I  |W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  W| .  .  .  .  .  |W I  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W+ WW WW WW WW WW WW WW WW WW +W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| I  W| .  W| I  .  .  .  .  .  .  .  .  |W .  .  .  |W ~  ~  ~ ")
       .sprites("W+ WW WW WW WW +W .  WW WW WW WW WW WW WW WW WW WW WW .  W+ WW WW WW WW +W")
       .sprites("W| .  .  .  I  |W .  .  .  .  .  .  .  .  .  .  .  .  .  W| ^  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("W| .  .  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");

    Map.create(MapConstants.CASTLE_ORDEALS_3F, mapOptions({})).tileMapping(tiles)
       .sprites("#- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -#")
       .sprites("#| $  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  $  ,  |#")
       .sprites("#| $  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("#| $  ,  ,  ,  ,  -- -- -- -- -- -- -- -- -- -- -- -- -- ,  ,  ,  ,  ,  |#")
       .sprites("#_ __ __ ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ _#")
       .sprites("WW WW WW #| ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW W+ [] +W WW WW WW")
 .repeatSprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~ ", 9)
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("#- -- -- ,  ,  ,  -- -- -- -- -- -- -- -- ,  ,  ,  ,  |# W| .  .  WW WW +W")
       .sprites("#| ,  ,  ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ _# W| .  .  .  .  |W")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("#| $  $  $  $  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  |W")
       .sprites("#_ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW")


       ;

  };
  

  
  return {
    init: init
  };
});