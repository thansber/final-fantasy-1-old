var Message = (function() {
  
  var self = this;
    
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
   ,"/": "slash"
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
  
  self.init = function(opt) {
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
      $message.append(self.create(text));
    } else {
      $message.empty();
    }
    
    $message.toggleClass("hidden", !showing);
    $message.parent(".overlap").toggleClass("hidden", !showing);
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.create = function(text, cssClasses) {
    var $msg = $("<div/>").addClass("text");
    if (cssClasses) {
      $msg.addClass(jQuery.isArray(cssClasses) ? cssClasses.join(" ") : cssClasses);
    }
    var newline = false;
    if (text) {
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
    }
    
    return $msg;
  };
  
  self.pad = function(ch, len) {
    var a = [];
    for (var i = 0; i < len; i++) {
      a.push(ch);
    }
    return a.join("");
  };
  
  self.padToLength = function(text, len, opt) {
    opt = jQuery.extend({}, {dir:"left"}, opt);
    var padding = self.pad(" ", len - (text + "").length);
    return opt.dir == "left" ? padding + text : text + padding;
  };
  
  self.source = function(opt) { battleMessage(opt, $(".source.message", $messages)); };
  self.action = function(opt) { battleMessage(opt, $(".action.message", $messages)); };
  self.target = function(opt) { battleMessage(opt, $(".target.message", $messages)); };
  self.damage = function(opt) { battleMessage(opt, $(".damage.message", $messages)); };
  self.desc = function(opt) { battleMessage(opt, $(".desc.message", $messages)); };

  self.getBattlePause = function() { return battlePause; };
  self.getQuickPause = function() { return quickPause; };
  
  self.hideAllBattleMessages = function() {
    self.source({show:false});
    self.target({show:false});
    self.action({show:false});
    self.damage({show:false});
    self.desc({show:false});
  };
  
  self.setBattlePause = function(amt) { battlePause = amt; };
  
  return this;
}).call({});