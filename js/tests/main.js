QUnit.config.autostart = false;

require(
["data/init", "tests/battle-engine", "tests/character", "tests/equipment", "tests/targets"], 
function(Data) {
  Data.init();
  QUnit.start();
});