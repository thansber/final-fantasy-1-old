var Element = (function() {
  
  var ALL = {
    Fire : "fire"
   ,Ice : "ice"
   ,Lightning : "lit"
   ,Earth : "earth"
   ,Death : "death"
   ,Time : "time"
   ,PoisonStone : "poison/stone"
   ,Status : "status"
  };
  
  return {
    Fire : ALL.Fire
   ,Ice : ALL.Ice
   ,Lightning : ALL.Lightning
   ,Earth : ALL.Earth
   ,Death : ALL.Death
   ,Time : ALL.Time
   ,PoisonStone : ALL.PoisonStone
   ,Status : ALL.Status
   ,AllElements : [ALL.Fire, ALL.Ice, ALL.Lightning, ALL.Earth, ALL.Death, ALL.Time, ALL.PoisonStone, ALL.Status]
  };
})();

var Status = (function() {
  
  var ALL = {
    Dead : {id:"dead", desc:"dead"}
   ,Stone : {id:"stone", desc:"petrified"}
   ,Poison : {id:"poison", desc:"poisoned"}
   ,Blind : {id:"blind", desc:"blind"}
   ,Paralysis : {id:"paralysis", desc:"paralyzed"}
   ,Sleep : {id:"sleep", desc:"asleep"}
   ,Mute : {id:"mute", desc:"slienced"}
   ,Confuse : {id:"confuse", desc:"confused"}
  };
  
  return {
    Dead : ALL.Dead
   ,Stone : ALL.Stone
   ,Poison : ALL.Poison
   ,Blind : ALL.Blind
   ,Paralysis : ALL.Paralysis 
   ,Sleep : ALL.Sleep 
   ,Mute : ALL.Mute
   ,Confuse : ALL.Confuse
   ,AllStatuses : [ALL.Dead, ALL.Stone, ALL.Poison, ALL.Blind, ALL.Paralysis, ALL.Sleep, ALL.Mute, ALL.Confuse]
   ,AllExceptDead : [ALL.Stone, ALL.Poison, ALL.Blind, ALL.Paralysis, ALL.Sleep, ALL.Mute, ALL.Confuse] 
  };
})();