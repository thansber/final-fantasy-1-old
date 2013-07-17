define(function() {
  
  var constants = {
    Fire : "fire"
   ,Ice : "ice"
   ,Lightning : "lit"
   ,Earth : "earth"
   ,Death : "death"
   ,Time : "time"
   ,PoisonStone : "poison/stone"
   ,Status : "status"
  };
  
  var elements = {};
  var all = [];
  for (var i in constants) {
    elements[i] = constants[i];
    all.push(constants[i]);
  }
  elements.All = all;
  
  return elements;
});