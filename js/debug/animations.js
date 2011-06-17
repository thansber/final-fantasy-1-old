var AnimationHelper = (function() {
  
  var event = function($target) {
    if ($target.is(".walk.slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char); });
    } else if ($target.is(".walk.slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char, {direction:"backward"}); });
    } else if ($target.is(".slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char, {direction:"backward", autoStart:true}); });
    } else if ($target.is(".slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char, {autoStart:true}); });
    } else if ($target.is(".walk")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkInBattle(char, {autoStart:true}); });
    } else if ($target.is(".swing.weapon")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.swingWeapon(char, {autoStart:true}); });
    } else if ($target.is(".attack")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.attack(char); });
    } else if ($target.is(".spell.effect")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.spellEffect(char, getRandomSpell(), {autoStart:true}); });
    } else if ($target.is(".cast.spell")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.castSpell(char, getRandomSpell(), {autoStart:true}); });
    }
  };

  var getRandomSpell = function() {
    var spells = jQuery.map(Spell.ALL, function(spell, index) {
      return spell.effect ? spell : null;
    });
    
    return RNG.randomArrayElement(spells);
  };
  
  return {
    event: event
  }
})();