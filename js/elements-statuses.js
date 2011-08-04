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
   ,Stone : {id:"stone", desc:"Petrified"}
   ,Poison : {id:"poison", desc:"Poisoned"}
   ,Blind : {id:"blind", desc:"Darkness"}
   ,Paralysis : {id:"paralysis", desc:"Paralyzed"}
   ,Sleep : {id:"sleep", desc:"Asleep"}
   ,Mute : {id:"mute", desc:"Silenced"}
   ,Confuse : {id:"confuse", desc:"Confused"}
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