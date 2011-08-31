var SpellEffectHelper = (function() {
  
  var $debug = null;
  
  var init = function() {
    $debug = $("#debug section.spellEffects");
    var $container = $(".container", $debug);
    
    for (var s in Spell.ALL) {
      var spell = Spell.ALL[s];
      if (spell.effect.length > 0) {
        var $label = $("<label/>").html(s);
        $container.append($("<div/>").addClass("effect").append($label));
      }
    }
  };
  
  var event = function($target) {
    jQuery.each($(".effect", $debug), function() {
      var $this = $(this);
      Animation.spellEffect(null, Spell.lookup($this.find("label").text()), {numAnimations:30, $char:$this}).start();
    });
  };
  
  return {
    init: init
   ,event: event
  };
})();