define( /* Logger */
(function() {
  var self = this;
  var enabled = false;
  var level = Infinity;

  self.ERROR = {level:0, desc:"ERROR"};
  self.WARN = {level:1, desc:"WARN"};
  self.INFO = {level:2, desc:"INFO"};
  self.DEBUG = {level:3, desc:"DEBUG"};

  var log = function(args, lvl) {
    args = Array.prototype.slice.call(args);
    var file = "", msg = "";
    if (args.length > 1) {
      file = args[0];
      args.shift();
    }
    msg = args[0];
    if (level <= lvl) {
      console.log(lvl.desc + "-" + (file.length > 0 ? file + ":" : "") + msg);
    }
  };

  self.debug = function(file, msg) { if (!enabled) return; log(arguments, self.DEBUG); };
  self.disable = function() { enabled = false; };
  self.enable = function() { enabled = true; return this; };
  self.error = function(file, msg) { if (!enabled) return; log(arguments, self.ERROR); };
  self.info = function(file, msg) { if (!enabled) return; log(arguments, self.INFO); };
  self.warn = function(file, msg) { if (!enabled) return; log(arguments, self.WARN); };
  self.setLevel = function(lvl) { level = lvl; return this; };

  return this;
}).call({})
);