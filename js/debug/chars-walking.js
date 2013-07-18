define(
/* DebugCharsWalking */
["jquery", "animations/map", "character-class", "./util"],
function($, AnimationMap, CharacterClass, DebugHelper) {

  var $debug = null;
  var facing = ["down", "left", "up", "right"];

  var initChars = function() {
    var markup = [], m = 0;
    $.each(CharacterClass.All, function(i, charClass) {
      markup[m++] = '<div class="row">';
      facing.forEach(function(dir) {
        markup[m++] = '<div class="player ' + charClass.name + ' ' + dir + '"></div>';
      })
      markup[m++] = '</div>';
    });
    $debug.append($(markup.join("")));
  };

  return {
    init: function() {
      $debug = $("#debug section.charsWalking .container");
      initChars();
    }
  }
});
