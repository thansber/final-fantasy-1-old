define(
/* AnimationQueue */
["jquery", "messages"],
function($, Message) {
 
  /* ======================================================== */
  /* QUEUE object ------------------------------------------- */ 
  /* ======================================================== */
  var Queue = function(name) {
    this.theQueue = $({});
    this.name = (name === undefined ? "" : name) + (+new Date());
  };
  
  Queue.prototype.add = function(f) {
    if (f && typeof f === "function") {
      this.theQueue.queue(this.name, function(next) { 
        f();
        next(); 
      });
    }
    return this;
  };
  Queue.prototype.addAll = function(animation, opt) { animation.call(this, opt, this); };
  Queue.prototype.delay = function(delayTime) { this.theQueue.delay(delayTime, this.name); return this; };
  Queue.prototype.getPromise = function() { return this.theQueue.promise(this.name); };
  Queue.prototype.hideMessages = function(opt) {
    var defaults = {all:false, hideDesc:false, hideDamage:false, hideTarget:false, hideAction:false, hideSource:false, initialPause:true};
    var settings = $.extend({}, defaults, opt);
    
    if (settings.initialPause) {
      this.delay(Message.getBattlePause());
    }
    
    if (settings.all || settings.hideDesc) {
      this.add(function() { Message.desc({show:false}); });
      this.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideDamage) {
      this.add(function() { Message.damage({show:false}); });
      this.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideTarget) {
      this.add(function() { Message.target({show:false}); });
      this.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideAction) { 
      this.add(function() { Message.action({show:false}); });
      this.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideSource) { 
      this.add(function() { Message.source({show:false}); });
    }
  };
  Queue.prototype.kill = function() { return this.theQueue.clearQueue(this.name); };
  Queue.prototype.start = function() { this.theQueue.dequeue(this.name); return this.getPromise(); };
  Queue.prototype.toString = function() { return this.name + " has " + this.theQueue.queue(this.name).length + " elements"; };
  
  return {
    create : function(name) { return new Queue(name); }
  };
});