define( 
/* Data */
["./equipment", "./monsters", "./shop-inventory", "./spells", "./skills", "./encounters",
 "./map-transitions", 
 "./maps/cardia-islands", "./maps/castles", "./maps/dwarf-cave", "./maps/earth-cave", 
 "./maps/gurgu-volcano", "./maps/matoyas-cave", "./maps/sardas-cave", "./maps/sea-shrine", 
 "./maps/titans-tunnel", 
 "./maps/towns", "./maps/world"], 
function(EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData, EncounterData,
         MapTransitionData, 
         CardiaIslandsMapData, CastleMapData, DwarfCaveMapData, EarthCaveMapData, 
         GurguVolcanoMapData, MatoyasCaveMapData, SardasCaveMapData, SeaShrineMapData, 
         TitansTunnelMapData,
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
    DwarfCaveMapData.init();
    EarthCaveMapData.init();
    GurguVolcanoMapData.init();
    MatoyasCaveMapData.init();
    SardasCaveMapData.init();
    SeaShrineMapData.init();
    TitansTunnelMapData.init();
    
    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };
  
  return {
    init : init
  };
});