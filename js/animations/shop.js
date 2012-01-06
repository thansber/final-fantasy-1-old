define(
/* AnimationShop */ 
["jquery", "animation-queue", "events"], 
function($, AnimationQueue, Event) {
  return {
    restingAtInn : function(opt, q) {
      q = q || AnimationQueue.create();
      q.add(function() { $("#shop .party").toggleClass("resting", opt.resting); });
      q.delay(1000);
      
      AnimationUtil.autoStart(q, opt, Event.Animations.RestAtInnDone);

      return q;    
    }
  };
});