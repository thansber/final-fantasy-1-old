define(
/* AnimationMap */
["jquery", "animation-queue", "./util", "events", "logger"],
function($, AnimationQueue, AnimationUtil, Event, Logger) {

  // This will be created many times so do not define it in the animation method itself
  var CHAR_WALK_DEFAULTS = {$player:null, numAnimations:4, pause:70, xChange:0, yChange:0};
  var CHAR_WALK_DIRS = ["left", "up", "right", "down"];

  var determineDirection = function(yChange, xChange) {
    if (!!xChange) {
      return xChange > 0 ? "right" : "left";
    } else if (!!yChange) {
      return yChange > 0 ? "down" : "up";
    }
    Logger.error("AnimationMap - unable to determine direction with y=" + yChange + ", x=" + xChange);
    return "";
  }

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
    },

    charWalk : function(opt, q) {
      q = q || AnimationQueue.create();

      var settings = jQuery.extend({}, CHAR_WALK_DEFAULTS, opt);
      settings.$player.removeClass(CHAR_WALK_DIRS.join(" ")).addClass(determineDirection(settings.yChange, settings.xChange));
      for (var i = 0, n = settings.numAnimations * 2; i < n; i++) {
        q.add(function() { settings.$player.toggleClass("step"); });
        q.delay(settings.pause);
      }

      AnimationUtil.autoStart(q, settings);
      return q;
    }
  };
});