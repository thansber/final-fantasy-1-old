var Message = (function() {
  
  var digits = {
    "0": "zero"
   ,"1": "one"
   ,"2": "two"
   ,"3": "three"
   ,"4": "four"
   ,"5": "five"
   ,"6": "six"
   ,"7": "seven"
   ,"8": "eight"
   ,"9": "nine"
  };
  
  var special = {
    ".": "period"
   ,",": "comma"
   ,"'": "apostrophe"
   ,"!": "exclamation"
   ,"?": "question"
   ,"-": "dash"
   ,":": "ellipsis"
  };
  
  var items = {
    "^": "dagger"
   ,"$": "hammer"
   ,"#": "armor"
   ,"%": "axe"
   ,"*": "gauntlet"
   ,"&": "helmet"
   ,"+": "potion"
   ,"@": "ring"
   ,"=": "shirt"
   ,"|": "staff"
   ,"~": "nunchucks"
  };
  
  var $messages = null;
  var battlePause = 1000;
  var quickPause = 100;
  
  var init = function(opt) {
    $messages = $(opt.messages);
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var battleMessage = function(opt, $message) {
    opt = parseOptions(opt);
    toggleMessage($message, false, "");
    toggleMessage($message, opt.show, opt.text);
  };
  
  var parseOptions = function(opt) {
    return typeof opt === "string" || typeof opt === "number" ? {text:"" + opt, show:true} : opt || {};
  };
  
  var toggleMessage = function($message, showing, text) {
    if (showing) {
      $message.append(create(text));
    } else {
      $message.empty();
    }
    
    $message.toggleClass("hidden", !showing);
    $message.parent(".overlap").toggleClass("hidden", !showing);
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  var create = function(text, cssClasses) {
    var $msg = $("<div/>").addClass("text");
    if (cssClasses) {
      $msg.addClass(jQuery.isArray(cssClasses) ? cssClasses.join(" ") : cssClasses);
    }
    var newline = false;
    for (var i = 0; i < text.length; i++) {
      var currentChar = text.charAt(i);
      var $msgChar = $("<p/>");
      
      if (newline) {
        $msgChar.addClass("newline");
        newline = false;
      }
      
      if (currentChar.toUpperCase() >= 'A' && currentChar.toUpperCase() <= 'Z') {
        $msgChar.addClass(currentChar.toUpperCase());
      }
      
      if (currentChar >= 'a' && currentChar <= 'z') {
        $msgChar.addClass("small");
      } else if (currentChar >= '0' && currentChar <= '9') {
        $msgChar.addClass(digits[currentChar]);
      } else if (currentChar == ' ') {
        $msgChar.addClass("space");
      } else if (special[currentChar]) {
        $msgChar.addClass(special[currentChar]);
      } else if (items[currentChar]) {
        $msgChar.addClass(items[currentChar]);
      } else if (currentChar == '\n') {
        newline = true;
      }
      
      if (!newline) {
        $msg.append($msgChar);
      }
    }
    
    return $msg;
  };
  
  var source = function(opt) { battleMessage(opt, $(".source.message", $messages)); };
  var action = function(opt) { battleMessage(opt, $(".action.message", $messages)); };
  var target = function(opt) { battleMessage(opt, $(".target.message", $messages)); };
  var damage = function(opt) { battleMessage(opt, $(".damage.message", $messages)); };
  var desc = function(opt) { battleMessage(opt, $(".desc.message", $messages)); };

  var getBattlePause = function() { return battlePause; };
  var getQuickPause = function() { return quickPause; };
  
  var hideAllBattleMessages = function() {
    source({show:false});
    target({show:false});
    action({show:false});
    damage({show:false});
    desc({show:false});
  };
  
  var setBattlePause = function(amt) { battlePause = amt; };
  
  return {
    init: init
   ,create: create
   ,source: source
   ,action: action
   ,target: target
   ,damage: damage
   ,desc: desc
   ,getBattlePause: getBattlePause
   ,getQuickPause: getQuickPause
   ,hideAllBattleMessages: hideAllBattleMessages
   ,setBattlePause: setBattlePause
  };
})();