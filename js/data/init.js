define( 
/* Data */
["./maps/castles", "./equipment", "./monsters", "./shop-inventory", "./spells", "./skills", "./encounters",
 "./map-sprites", "./map-transitions", "./maps/towns", "./world-map"], 
function(CastleMapData, EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData, EncounterData,
         MapSpriteData, MapTransitionData, TownMapData, WorldMapData) {
  
  // Any data setup should reside here
  var init = function() {
    SpellData.init();
    SkillData.init();
    EquipmentData.init();
    MonsterData.init();
    ShopInventoryData.init();
    EncounterData.init();
    
    CastleMapData.init();
    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };
  
  return {
    init : init
  };
});