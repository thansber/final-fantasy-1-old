define( 
/* Data */
["./equipment", "./monsters", "./shop-inventory", "./spells", "./skills",
 "./map-transitions", "./town-maps", "./world-map"], 
function(EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData,
         MapTransitionData, TownMapData, WorldMapData) {
  
  // Any data setup should reside here
  var init = function() {
    SpellData.init();
    SkillData.init();
    EquipmentData.init();
    MonsterData.init();
    ShopInventoryData.init();
    
    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };
  
  return {
    init : init
  };
});