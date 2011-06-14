var SpellEffectHelper = (function() {
  
  var $debug = null;
  var SPELL_QUEUE = "spell_queue";
  
  var init = function() {
    $debug = $("#debug section.spellEffects");
    var $container = $(".container", $debug);
    
    for (var s in Spell.ALL) {
      var spell = Spell.ALL[s];
      if (spell.effect.length > 0) {
        var $spell = buildSpell(s);
        var $label = $("<label/>").html(s);
        $container.append($("<div/>").addClass("effect").append($spell).append($label));
        startAnimation($spell, s);
      }
    }
  };
  
  var startAnimation = function($spell, spellId) {
    for (var i = 0; i < 100; i++) {
      $spell.delay(100, spellId).queue(spellId, function(next) {
        $spell.toggleClass("animate");
        next();
      });
    }
    $spell.dequeue(spellId);
  };
  
  var buildSpell = function(spellId) {
    var spell = Spell.lookup(spellId);
    var $spell = $("<p/>").addClass("spell").addClass(spell.effect).addClass(spell.spellId.toLowerCase().replace("!", ""));
    return $spell;
  };
  
  return {
    init: init
  };
})();