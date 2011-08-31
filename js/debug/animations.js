var AnimationHelper = (function() {
  
  var event = function($target) {
    if ($target.is(".walk.slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char).start(); });
    } else if ($target.is(".walk.slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char, {direction:"backward"}).start(); });
    } else if ($target.is(".slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char, {direction:"backward"}).start(); });
    } else if ($target.is(".slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char).start(); });
    } else if ($target.is(".walk")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkInBattle(char).start(); });
    } else if ($target.is(".swing.weapon")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.swingWeapon(char).start(); });
    } else if ($target.is(".attack")) {
      var aq = new Animation.ActionQueue();
      jQuery.each(Party.getChars(), function(i, char) { aq.add(Animation.attackAnimation(char, aq.chain)); });
      aq.start(); 
    } else if ($target.is(".spell.effect")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.spellEffect(char, getRandomSpell()).start(); });
    } else if ($target.is(".cast.spell")) {
      var aq = new Animation.ActionQueue();
      jQuery.each(Party.getChars(), function(i, char) { aq.add(Animation.castSpellAnimation(char, getRandomSpell(), aq.chain)); });
      aq.start();
    } else if ($target.is(".window.shake")) {
      Animation.windowShake().start();
    } else if ($target.is(".char.flicker")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.charFlicker(char).start(); });
    } else if ($target.is(".victory")) {
      Battle.inputMessageToggler(true);
      Animation.victory().start();
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