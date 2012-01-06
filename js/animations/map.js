define(
/* AnimationMap */
["jquery", "animation-queue", "./util", "events"], 
function($, AnimationQueue, AnimationUtil, Event) {
  return {
    areaTransition : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {transition:null, hideFirst:true, start:false};
      var settings = jQuery.extend({}, defaults, opt);
      
      Event.transmit(Event.Types.MovementStop);
      if (settings.hideFirst) {
        q.add(function() { $("#map .transition").toggleClass("displayed", true); });
        q.delay(1100);
      }
      if (settings.transition) {
        q.add(function() { Event.transmit(Event.Types.JumpTo, settings.transition.to, settings.transition.toCoords); });
        q.delay(300);
      }
      q.add(function() { $("#map .transition").toggleClass("displayed", false); });
      q.delay(1100);
      q.add(function() { Event.transmit(Event.Types.MovementStart); });
      
      AnimationUtil.autoStart(q, settings, Event.Animations.AreaTransitionDone);

      return q;    
    }
  };
});