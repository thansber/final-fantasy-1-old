define( /* Animation */ 
["jquery", "events", "logger", "rng"], 
function($, Event, Logger, RNG) { 
  return (function() {
    
    var self = this;
    
    /* ======================================================== */
    /* ACTION QUEUE object ------------------------------------ */ 
    /* ======================================================== */
    self.ActionQueue = function() {
      this.animationQueue = null;
      this.chain = null;
    };
    self.ActionQueue.prototype.add = function(animationQueue, chain) {
      if (this.animationQueue == null) {
        this.animationQueue = animationQueue;
        this.chain = this.animationQueue.chain;
      }
    };
    self.ActionQueue.prototype.kill = function() { 
      this.animationQueue.kill(); 
      if (this.animationQueue.chain) {
        this.animationQueue.chain.kill();
      }
    };
    self.ActionQueue.prototype.start = function() { return this.animationQueue.start(); };
    
    /* ======================================================== */
    /* PRIVATE METHODS ---------------------------------------- */
    /* ======================================================== */
    
    
    /* ======================================================== */
    /* PUBLIC METHODS ----------------------------------------- */
    /* ======================================================== */
    
    
    return this;
  }).call({});
});