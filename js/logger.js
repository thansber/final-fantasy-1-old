define( /* Logger */
(function() {
  var self = this;
  var enabled = false;
  var level = Infinity;
  
  self.ERROR = {level:0, desc:"ERROR"};
  self.WARN = {level:1, desc:"WARN"};
  self.INFO = {level:2, desc:"INFO"};
  self.DEBUG = {level:3, desc:"DEBUG"};
  
  var log = function(msg, lvl) {
    if (level <= lvl) {
      console.log(lvl.desc + "-" + msg);
    }
  };
  
  self.debug = function(msg) { if (!enabled) return; log(msg, self.DEBUG); };
  self.disable = function() { enabled = false; };
  self.enable = function() { enabled = true; return this; };
  self.error = function(msg) { if (!enabled) return; log(msg, self.ERROR); };
  self.info = function(msg) { if (!enabled) return; log(msg, self.INFO); };
  self.warn = function(msg) { if (!enabled) return; log(msg, self.WARN); };
  self.setLevel = function(lvl) { level = lvl; return this; };
  
  return this;
}).call({})
);