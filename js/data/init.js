define( 
/* Data */
["./equipment", "./monsters", "./shop-inventory", "./spells", "./skills", "./encounters",
 "./map-transitions", 
 "./maps/castles", "./maps/dwarf-cave", "./maps/earth-cave", "./maps/matoyas-cave", "./maps/sardas-cave", "./maps/titans-tunnel", 
 "./maps/towns", "./world-map"], 
function(EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData, EncounterData,
         MapTransitionData, 
         CastleMapData, DwarfCaveMapData, EarthCaveMapData, MatoyasCaveMapData, SardasCaveMapData, TitansTunnelMapData,
         TownMapData, WorldMapData) {
  
  // Any data setup should reside here
  var init = function() {
    SpellData.init();
    SkillData.init();
    EquipmentData.init();
    MonsterData.init();
    ShopInventoryData.init();
    EncounterData.init();
    
    CastleMapData.init();
    DwarfCaveMapData.init();
    EarthCaveMapData.init();
    MatoyasCaveMapData.init();
    SardasCaveMapData.init();
    TitansTunnelMapData.init();
    
    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };
  
  return {
    init : init
  };
});