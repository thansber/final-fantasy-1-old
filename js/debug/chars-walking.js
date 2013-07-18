define(
/* DebugCharsWalking */
["jquery", "character-class", "./util", "events", "util"],
function($, CharacterClass, DebugHelper, Event, Util) {

  var $debug = null;
  var facing = {
    "down": {yChange:1},
    "left": {xChange:-1},
    "up": {yChange:-1},
    "right": {xChange:1}
  };

  var initChars = function() {
    var markup = [], m = 0;
    $.each(CharacterClass.All, function(i, charClass) {
      markup[m++] = '<div class="row">';
      for (var dir in facing) {
        markup[m++] = '<div class="player ' + charClass.name + ' ' + dir + '"></div>';
      }
      markup[m++] = '</div>';
    });
    $debug.prepend($(markup.join("")));
  };

  return {
    fire: function($target) {
      if ($target.hasClass("start")) {
        $debug.find(".player").each(function() {
          var $player = $(this);
          var dir = Util.getCssClass($player, "last");
          Event.animate(Event.Animations.CharWalking).using($.extend(facing[dir], {$player:$player})).start();
        });
      }
    },
    init: function() {
      $debug = $("#debug section.charsWalking .container");
      initChars();
    }
  }
});
