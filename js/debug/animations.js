var AnimationHelper = (function() {
  
  var event = function($target) {
    if ($target.is(".walk.slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char).start(); });
    } else if ($target.is(".walk.slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkAndMoveInBattle(char, {direction:"backward"}).start(); });
    } else if ($target.is(".slide.backward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char, {direction:"backward", autoStart:true}); });
    } else if ($target.is(".slide.forward")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.slideChar(char, {autoStart:true}); });
    } else if ($target.is(".walk")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.walkInBattle(char, {autoStart:true}); });
    } else if ($target.is(".swing.weapon")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.swingWeapon(char, {autoStart:true}); });
    } else if ($target.is(".attack")) {
      var aq = new Animation.ActionQueue();
      jQuery.each(Party.getChars(), function(i, char) { aq.add(Animation.attackAnimation(Party.getChar(i), aq.chain)); });
      aq.start(); 
    } else if ($target.is(".spell.effect")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.spellEffect(Party.getChar(i),getRandomSpell(), {autoStart:true}); });
    } else if ($target.is(".cast.spell")) {
      var aq = new Animation.ActionQueue();
      jQuery.each(Party.getChars(), function(i, char) { aq.add(Animation.castSpellAnimation(Party.getChar(i),getRandomSpell(), aq.chain)); });
      aq.start();
    } else if ($target.is(".window.shake")) {
      Animation.windowShake({autoStart:true});
    } else if ($target.is(".char.flicker")) {
      jQuery.each(Party.getChars(), function(i, char) { Animation.charFlicker(char, {autoStart:true}); });
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