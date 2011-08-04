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
  var postActionPause = 1000;
  
  var init = function(opt) {
    $messages = $(opt.messages);
  };
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var battleMessage = function($message, showing, text) {
    if (showing) {
      $message.append(create(text));
    } else {
      $message.empty();
    }
    
    $message.toggleClass("hidden", !showing);
    $message.parent(".overlap").toggleClass("hidden", !showing);
  };
  
  var parseOptions = function(opt) {
    return typeof opt === "string" ? {text:opt, show:true} : opt || {};
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
  
  var source = function(opt) {
    opt = parseOptions(opt);
    var $msg = $(".source.message", $messages);
    battleMessage($msg, false, "");
    battleMessage($msg, opt.show, opt.text);
  };
  
  var action = function(opt) {
    opt = parseOptions(opt);
    var $msg = $(".action.message", $messages);
    battleMessage($msg, false, "");
    battleMessage($msg, opt.show, opt.text);
  };
  
  var target = function(opt) {
    opt = parseOptions(opt);
    var $msg = $(".target.message", $messages);
    battleMessage($msg, false, "");
    battleMessage($msg, opt.show, opt.text);
  };
  
  var damage = function(opt) {
    opt = parseOptions(opt);
    var $msg = $(".damage.message", $messages);
    battleMessage($msg, false, "");
    battleMessage($msg, opt.show, opt.text);
  };
  
  var desc = function(opt) {
    opt = parseOptions(opt);
    var $msg = $(".desc.message", $messages);
    battleMessage($msg, false, "");
    battleMessage($msg, opt.show, opt.text);
  };

  var getPostActionPause = function() { return postActionPause; };
  
  var hideAllBattleMessages = function() {
    source({show:false});
    target({show:false});
    action({show:false});
    damage({show:false});
    desc({show:false});
  };
  
  var setPostActionPause = function(amt) { postActionPause = amt; };
  
  return {
    init: init
   ,create: create
   ,source: source
   ,action: action
   ,target: target
   ,damage: damage
   ,desc: desc
   ,getPostActionPause: getPostActionPause
   ,hideAllBattleMessages: hideAllBattleMessages
   ,setPostActionPause: setPostActionPause
  };
})();