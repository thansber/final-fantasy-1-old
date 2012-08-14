define( 
/* Data */
["./equipment", "./monsters", "./shop-inventory", "./spells", "./skills", "./encounters",
 "./map-transitions", 
 "./maps/cardia-islands", "./maps/castles", "./maps/caves", "./maps/earth-cave", 
 "./maps/gurgu-volcano", "./maps/sea-shrine", 
 "./maps/towns", "./maps/world"], 
function(EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData, EncounterData,
         MapTransitionData, 
         CardiaIslandsMapData, CastleMapData, CaveMapData, EarthCaveMapData, 
         GurguVolcanoMapData, SeaShrineMapData, 
         TownMapData, WorldMapData) {
  
  // Any data setup should reside here
  var init = function() {
    SpellData.init();
    SkillData.init();
    EquipmentData.init();
    MonsterData.init();
    ShopInventoryData.init();
    EncounterData.init();
    
    CardiaIslandsMapData.init();
    CastleMapData.init();
    CaveMapData.init();
    EarthCaveMapData.init();
    GurguVolcanoMapData.init();
    SeaShrineMapData.init();
    
    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };
  
  return {
    init : init
  };
});