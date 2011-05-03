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
    "^": "sword"
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
  
  var init = function(opt) {};
  
  var create = function(text) {
    var $msg = $("<div/>").addClass("message");
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
  
  return {
    init: init
   ,create: create
  };
})();