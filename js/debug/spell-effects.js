define( 
/* DebugSpellEffects */
["jquery", "events", "spells"], 
function($, Event, Spell) {
  
  var $debug = null;
  
  return {
    init : function() {
      $debug = $("#debug section.spellEffects");
      var $container = $debug.find(".container");
      
      for (var s in Spell.ALL) {
        var spell = Spell.ALL[s];
        if (spell.effect.length > 0) {
          var $label = $("<label/>").html(s);
          $container.append($("<div/>").addClass("effect").append($label));
        }
      }
    }
  
   ,event : function($target) {
      $debug.find(".effect").each(function() {
        var $this = $(this);
        Event.animate(Event.Animations.SpellEffect)
             .using({$char:$this, spell:Spell.lookup($this.find("label").text()), numAnimations:30})
             .start();
      });
    }
  };
});