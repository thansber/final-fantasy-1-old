define( 
/* KeyPressNotifier */ 
["jquery"], 
function($) {
  
  // Only one listener is allowed at a given time
  var listener = null;
  var keyConstants = {};
  var modifierKeyPressed = false;
  
  var ArrowKeys = {Left:"37",Up:"38",Right:"39",Down:"40"};
  var AlphaKeys = {A:"65",B:"66",C:"67",D:"68",E:"69",F:"70",G:"71",H:"72",I:"73",J:"74",K:"75",L:"76",M:"77",N:"78",O:"79",P:"80",Q:"81",R:"82",S:"83",T:"84",U:"85",V:"86",W:"87",X:"88",Y:"89",Z:"90"};
  var ModifierKeys = {Shift:"16", Ctrl:"17", Alt:"18", Command:"224"};
  
  var isArrowKey = function(key) {
    for (var k in ArrowKeys) {
      if (key == ArrowKeys[k]) {
        return true;
      }
    }
    return false;
  };
  
  var isModifierKey = function(key) {
    for (var k in ModifierKeys) {
      if (key == ModifierKeys[k]) {
        return true;
      }
    }
    return false;
  };
  
  var setListener = function(obj) { listener = obj; };
  
  for (var key in ArrowKeys) {
    keyConstants[key] = ArrowKeys[key];
  }
  
  for (var key in AlphaKeys) {
    keyConstants[key] = AlphaKeys[key];
  }

  return $.extend(keyConstants, {
    Enter : "13",
    Esc : "27",
    Space : "32",
    
    clearListener : function() {
      if (listener) {
        if (typeof listener.stopListening === "function") {
          listener.stopListening();
        }
        setListener(null);
      }
    },
    
    init : function(opt) {
    
      $(window).keydown(function(event) {
        var key = event.keyCode + "";
        if (listener) {
          listener.keyPressChange(key, true);
        }
        
        if (isModifierKey(key)) {
          modifierKeyPressed = true;
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
        
        if (modifierKeyPressed) {
          allowKeyToPass = true;
        }
        
        return allowKeyToPass;
      });
    
      $(window).keyup(function(event) {
        var key = event.keyCode + "";
        if (listener) {
          listener.keyPressChange(key, false);
        }
        if (isModifierKey(key)) {
          modifierKeyPressed = false;
        }
        return !isArrowKey(key);
      });
    },
    isModifierKey : isModifierKey,
    setListener : setListener
  });
});