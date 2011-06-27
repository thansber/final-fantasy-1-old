var KeyPressNotifier = (function() {
  
  // Only one listener is allowed at a given time
  var listener = null;
  
  var ArrowKeys = {Left:"37",Up:"38",Right:"39",Down:"40"};
  var AlphaKeys = {A:"65",B:"66",C:"67",D:"68",E:"69",F:"70",G:"71",H:"72",I:"73",J:"74",K:"75",L:"76",M:"77",N:"78",O:"79",P:"80",Q:"81",R:"82",S:"83",T:"84",U:"85",V:"86",W:"87",X:"88",Y:"89",Z:"90"};
  
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
   
   ,A : AlphaKeys.A
   ,B : AlphaKeys.B
   ,C : AlphaKeys.C
   ,D : AlphaKeys.D
   ,E : AlphaKeys.E
   ,F : AlphaKeys.F
   ,G : AlphaKeys.G
   ,H : AlphaKeys.H
   ,I : AlphaKeys.I
   ,J : AlphaKeys.J
   ,K : AlphaKeys.K
   ,L : AlphaKeys.L
   ,M : AlphaKeys.M
   ,N : AlphaKeys.N
   ,O : AlphaKeys.O
   ,P : AlphaKeys.P
   ,Q : AlphaKeys.Q
   ,R : AlphaKeys.R
   ,S : AlphaKeys.S
   ,T : AlphaKeys.T
   ,U : AlphaKeys.U
   ,V : AlphaKeys.V
   ,W : AlphaKeys.W
   ,X : AlphaKeys.X
   ,Y : AlphaKeys.Y
   ,Z : AlphaKeys.Z
  };  
})();