define(
/* Animations */
["./action", "./battle", "./map", "./shop", "events"], 
function(AnimationAction, AnimationBattle, AnimationMap, AnimationShop, Event) {
  return {
    startListening : function() {
      AnimationAction.init();
      
      Event.listen(Event.Animations.CharFlicker, AnimationBattle.charFlicker);
      Event.listen(Event.Animations.MoveChar, AnimationBattle.moveChar);
      Event.listen(Event.Animations.PreBattleMessage, AnimationBattle.preBattleMessage);
      Event.listen(Event.Animations.RunParty, AnimationBattle.runParty);
      Event.listen(Event.Animations.SpellBackgroundFlicker, AnimationBattle.spellBackgroundFlicker);
      Event.listen(Event.Animations.SpellEffect, AnimationBattle.spellEffect);
      Event.listen(Event.Animations.Splash, AnimationBattle.splash);
      Event.listen(Event.Animations.SwingWeapon, AnimationBattle.swingWeapon);
      Event.listen(Event.Animations.WindowShake, AnimationBattle.windowShake);

      Event.listen(Event.Animations.Attack, AnimationAction.attack);
      Event.listen(Event.Animations.CastSpell, AnimationAction.castSpell);
      Event.listen(Event.Animations.Defeat, AnimationAction.defeat);
      Event.listen(Event.Animations.Victory, AnimationAction.victory);
      
      Event.listen(Event.Animations.AreaTransition, AnimationMap.areaTransition);

      Event.listen(Event.Animations.RestAtInn, AnimationShop.restingAtInn);
    }
  };
});