var Target = (function() {
  
  function Target() {};
  
  Target.prototype.addStatus = function() { alert("A sub-class of this needs to override the addStatus() method"); };
  Target.prototype.getName = function() { alert("A sub-class of this needs to override the getName() method"); };
  Target.prototype.hasStatus = function() { alert("A sub-class of this needs to override the hasStatus() method"); };
  Target.prototype.removeStatus = function() { alert("A sub-class of this needs to override the removeStatus() method"); };
  Target.prototype.isDead = function() { alert("A sub-class of this needs to override the isDead() method"); };
  
  return {
    create: function() { return new Target(); }
  };  
})();