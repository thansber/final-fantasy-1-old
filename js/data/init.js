define(
/* Data */
["./equipment", "./monsters", "./shop-inventory", "./spells", "./skills", "./encounters",
 "./map-transitions",
 "./maps/cardia-islands", "./maps/castles", "./maps/caves", "./maps/earth-cave", "./maps/floating-castle",
 "./maps/gurgu-volcano", "./maps/ice-cave", "./maps/marsh-cave", "./maps/mirage-tower", "./maps/sea-shrine",
 "./maps/temple-of-fiends", "./maps/temple-of-fiends-2", "./maps/towns", "./maps/world"],
function(EquipmentData, MonsterData, ShopInventoryData, SpellData, SkillData, EncounterData,
         MapTransitionData,
         CardiaIslandsMapData, CastleMapData, CaveMapData, EarthCaveMapData, FloatingCastleMapData,
         GurguVolcanoMapData, IceCaveMapData, MarshCaveMapData, MirageTowerMapData, SeaShrineMapData,
         TempleOfFiendsMapData, TempleOfFiends2MapData, TownMapData, WorldMapData) {

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
    FloatingCastleMapData.init();
    GurguVolcanoMapData.init();
    IceCaveMapData.init();
    MarshCaveMapData.init();
    MirageTowerMapData.init();
    SeaShrineMapData.init();
    TempleOfFiendsMapData.init();
    TempleOfFiends2MapData.init();

    TownMapData.init();
    WorldMapData.init();
    MapTransitionData.init();
  };

  return {
    init : init
  };
});