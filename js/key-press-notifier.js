var KeyPressNotifier = (function() {
  
  var self = this;
    
  // Only one listener is allowed at a given time
  var listener = null;
  
  var ArrowKeys = {Left:"37",Up:"38",Right:"39",Down:"40"};
  var AlphaKeys = {A:"65",B:"66",C:"67",D:"68",E:"69",F:"70",G:"71",H:"72",I:"73",J:"74",K:"75",L:"76",M:"77",N:"78",O:"79",P:"80",Q:"81",R:"82",S:"83",T:"84",U:"85",V:"86",W:"87",X:"88",Y:"89",Z:"90"};
  
  self.Enter = "13";
  self.Esc = "27";
  self.Space = "32";
  
  for (var key in ArrowKeys) {
    self[key] = ArrowKeys[key];
  }
  
  for (var key in AlphaKeys) {
    self[key] = AlphaKeys[key];
  }
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function(opt) {
    
    $(window).keydown(function(event) {
      var key = event.keyCode + "";
      if (listener) {
        listener.keyPressChange(key, true);
      }
      
      var allowKeyToPass = !isArrowKey(key);
      
      if (listener) {
        var registeredKeys = listener.registeredKeys || [];
        for (var k in listener.registeredKeys) {
          if (key == listener.registeredKeys[k]) {
            allowKeyToPass = false;
          }
        }
      }
      
      return allowKeyToPass;
    });
    
    $(window).keyup(function(event) {
      var key = event.keyCode + "";
      if (listener) {
        listener.keyPressChange(key, false);
      }
      return !isArrowKey(key);
    });
  };

  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var isArrowKey = function(key) {
    for (var k in ArrowKeys) {
      if (key == ArrowKeys[k]) {
        return true;
      }
    }
    return false;
  };
  
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.clearListener = function() {
    if (listener) {
      if (typeof listener.stopListening === "function") {
        listener.stopListening();
      }
      self.setListener(null);
    }
  }
  
  self.setListener = function(obj) {
    listener = obj;
  };
  
  return this;  
}).call({});