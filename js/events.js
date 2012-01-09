define(
/* Event */ 
["jquery", "logger"],
function($, Logger) {
  
  var all = {};
  var types = {
    AdjustCharStats : "adjustCharStats"
   ,AreaTransition : "areaTransition"
   ,BackToWorldMap : "backToWorldMap"
   ,BattleGatherCommands : "battleGatherCommands"
   ,BattleMessageToggle : "battleMessageToggle"
   ,BattleSetup : "battleSetup"
   ,CharMenu : "charMenu"
   ,CursorStart : "cursorStartListening"
   ,JumpTo : "jumpToPosition"
   ,MovementCallback : "movementCallback"
   ,MovementStart : "movementStartListening"
   ,MovementStop : "movementStopListening"
   ,Moving : "moving"
   ,MovingChange : "movingChange"
   ,ResetCharStats : "resetCharStats"
   ,ShopEnter : "shopEnter"
   ,ShopExit : "shopExit"
   ,StartGame : "startGame"
   ,StartRound : "startRound"
   ,SwitchMap : "switchMap"
   ,SwitchView : "switchView"
  };
  
  var animations = {
    AreaTransition : "animationAreaTransition"
   ,AreaTransitionDone : "animationAreaTransitionDone"
   ,Attack : "animationAttack"
   ,AttackDone : "animationAttackDone"
   ,CastSpell : "castSpell"
   ,CastSpellDone : "castSpellDone"
   ,CharFlicker : "animationCharFlicker"
   ,CharFlickerDone : "animationCharFlickerDone"
   ,Defeat : "animationDefeat"
   ,DefeatDone : "animationDefeatDone"
   ,MoveChar : "animationMoveChar"
   ,MoveCharDone : "animationMoveCharDone"
   ,PreBattleMessage : "animationPreBattleMessage"
   ,PreBattleMessageDone : "animationPreBattleMessageDone"
   ,RestAtInn : "animationRestAtInn"
   ,RestAtInnDone : "animationRestAtInnDone"
   ,RunParty : "animationRunParty"
   ,RunPartyDone : "animationRunPartyDone"
   ,SpellBackgroundFlicker : "animationSpellBackgroundFlicker"
   ,SpellBackgroundFlickerDone : "animationSpellBackgroundFlickerDone"
   ,SpellEffect : "animationSpellEffect"
   ,SpellEffectDone : "animationSpellEffectDone"
   ,Splash : "animationSplash"
   ,SplashDone : "animationSplashDone"
   ,StatusHeal : "animationStatusHeal"
   ,StatusHealDone : "animationStatusHealDone"
   ,SwingWeapon : "animationSwingWeapon"
   ,SwingWeaponDone : "animationSwingWeaponDone"
   ,Victory : "animationVictory"
   ,VictoryDone : "animationVictoryDone"
   ,WindowShake : "animationWindowShake"
   ,WindowShakeDone : "animationWindowShakeDone"
  };
  
  var Event = function(type) {
    this.cbq = $.Callbacks();
    this.type = type;
  };
  Event.prototype.add = function(f) { this.cbq.add(f); };
  Event.prototype.clear = function() { this.cbq.empty(); };
  Event.prototype.fire = function() { this.cbq.fireWith(window, arguments); };
  Event.prototype.getCallbacks = function() { return this.cbq; };
  
  var Animation = function(type) { this.event = all[type]; this.opt = {}; };
  Animation.prototype.using = function(opt) { this.opt = opt; return this; };
  Animation.prototype.afterwards = function(doneType, f) { clear(doneType); listen(doneType, f); return this; };
  Animation.prototype.start = function() { this.opt.start = true; this.event.fire(this.opt); };
  
  var animate = function(type) { return new Animation(type); };
  
  var clear = function(type) {
    var event = all[type];
    if (!event) {
      return false;
    }
    event.clear();
  };
  
  var listen = function(type, f) {
    var event = all[type];
    if (!event) {
      event = new Event(type);
      all[type] = event;
    }
    event.add(f);
  };
  
  var transmit = function(type) {
    var event = all[type];
    if (!event) {
      Logger.warn("Nothing registered for event type [" + type + "]");
      return false;
    }
    Event.prototype.fire.apply(event, Array.prototype.slice.call(arguments).slice(1));
  };
  
  return {
    Animations : animations
   ,Types : types
    
   ,animate : animate
   ,clear : clear
   ,listen : listen
   ,transmit : transmit
  };
});