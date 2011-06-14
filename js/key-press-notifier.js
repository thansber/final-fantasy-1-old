var KeyPressNotifier = (function() {
  
  // Only one listener is allowed at a given time
  var listener = null;
  
  var ArrowKeys = {
    Left : "37"
   ,Up : "38"
   ,Right : "39"
   ,Down : "40"
  };
  
  var Enter = "13";
  var Esc = "27";
  var Space = "32";
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
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
  var clearListener = function() {
    if (listener) {
      if (typeof listener.stopListening === "function") {
        listener.stopListening();
      }
      setListener(null);
    }
  }
  
  var setListener = function(obj) {
    listener = obj;
  };
  
  return {
    init: init
    
   ,clearListener: clearListener
   ,setListener: setListener
   
   ,Left : ArrowKeys.Left
   ,Up : ArrowKeys.Up
   ,Right : ArrowKeys.Right
   ,Down : ArrowKeys.Down
   ,Enter : Enter
   ,Space : Space
   ,Esc : Esc
  };  
})();