var CharacterGrowth = (function() {
  
  this.statGrowth = {};
  this.statGrowth[CharacterClass.FIGHTER] = {hitGain:3,mdefGain:3,stats:["","+SAV","+SAVL","+SAIL","+SAV","+SAVL","+SAIL","+SAV","+SAVL","+SAIL","+SAV","SAVL","+SAIL","+SAV","SAVL","+SAIL","+SAV","SAVL","+SAIL","+SAV","SVL","+SAIL","+SAV","SVL","SAIL","+SAV","SVL","SAIL","+SAV","SVL","SAIL","+SV","SAL","SIV","+SAL","SV","SAIL","+SV","SAL","SIV","+SA","S","SAI","+S","SA","S","+SA","S","SA","+S"]};
  this.statGrowth[CharacterClass.THIEF] = {hitGain:2,mdefGain:2,stats:["","+SAL","+SIVL","+SAL","+SIL","SAVL","+SIL","SAL","+SVL","SAIL","+L","SAVL","+SIL","AL","+SVL","SAIL","AL","+SVL","SAIL","AL","+SVL","SAIL","AL","+SVL","SAIL","AL","+SVL","SAIL","AL","+VL","SAIL","AL","+SAVL","SAIL","AL","SAVL","+SAIL","AL","SAVL","SAIL","+AL","SVL","AIL","SL","AVL","+SIL","AL","SVL","AIL","SL"]};
  this.statGrowth[CharacterClass.BLACKBELT] = {hitGain:3,mdefGain:4,stats:["","+AVL","SIVL","+AV","SIVL","AVL","+SIV","AVL","SIVL","+AV","SIVL","AVL","+SIV","AVL","SIVL","+AV","+SIVL","AVL","+SIV","AVL","SIVL","+AV","SIVL","AVL","+SIV","AVL","SIVL","+AV","SIVL","AVL","+SIV","+AVL","SIVL","+AV","SIVL","AVL","+SIV","AVL","SIVL","+AV","SIVL","AVL","+SIV","AV","SIVL","+AV","+SIV","AVL","+SIV","AV"]};
  this.statGrowth[CharacterClass.RED_MAGE] = {hitGain:2,mdefGain:2,stats:["","+SVL","AIV","+SVL","AIV","+SVL","AI","+SVL","+AI","+SL","IV","+SAL","IVL","+S","AIVL","+SL","+IV","SA","IVL","SL","AIV","S","IVL","SAL","I","SV","+AIL","SL","IV","SA","IL","SVL","AI","S","IVL","SAL","+I","SV","AIL","SL","IV","SA","IL","SVL","AI","S","+IVL","SAL","I","SV"]};
  this.statGrowth[CharacterClass.WHITE_MAGE] = {hitGain:1,mdefGain:2,stats:["","+SAIL","SAIV","+SIL","AIV","+IL","SIV","+AIL","IV","+SIL","AIV","+IL","SIV","+AIL","IV","SIL","+AIV","IL","SIV","+AIL","IV","SI","AIL","+IV","SI","AIL","IV","+SI","AIL","IV","S","+AL","V","S","AL","V","+S","AL","V","S","AL","+V","S","AL","V","S","+AL","V","S","AL"]};
  this.statGrowth[CharacterClass.BLACK_MAGE] = {hitGain:1,mdefGain:2,stats:["","+I","AIV","+SIL","IV","+AIL","SIV","+IL","AIV","SIL","+I","AIV","SI","+IL","AI","SIV","I","+AIL","SI","IV","AI","+SIL","I","AIV","SI","+IL","AI","SIV","I","+AIL","SI","IV","AI","SIL","+I","AIV","SI","IL","AI","SIV","+I","IL","I","IV","I","IL","I","IV","I","IL"]};
  this.statGrowth[CharacterClass.KNIGHT] = this.statGrowth[CharacterClass.FIGHTER];
  this.statGrowth[CharacterClass.NINJA] = this.statGrowth[CharacterClass.THIEF];
  this.statGrowth[CharacterClass.MASTER] = this.statGrowth[CharacterClass.BLACKBELT];
  this.statGrowth[CharacterClass.RED_WIZARD] = this.statGrowth[CharacterClass.RED_MAGE];
  this.statGrowth[CharacterClass.WHITE_WIZARD] = this.statGrowth[CharacterClass.WHITE_MAGE];
  this.statGrowth[CharacterClass.BLACK_WIZARD] = this.statGrowth[CharacterClass.BLACK_MAGE];
  
  this.startingStats = {};
  this.startingStats[CharacterClass.FIGHTER] = {hp:35,str:20,agi:5,int:1,vit:5,luck:5,hit:10,magicDef:15};
  this.startingStats[CharacterClass.THIEF] = {hp:30,str:5,agi:10,int:5,vit:5,luck:15,hit:5,magicDef:15};
  this.startingStats[CharacterClass.BLACKBELT] = {hp:33,str:5,agi:5,int:5,vit:20,luck:5,hit:5,magicDef:10};
  this.startingStats[CharacterClass.RED_MAGE] = {hp:30,str:10,agi:10,int:10,vit:5,luck:5,hit:7,magicDef:20};
  this.startingStats[CharacterClass.WHITE_MAGE] = {hp:28,str:5,agi:5,int:15,vit:10,luck:5,hit:5,magicDef:20};
  this.startingStats[CharacterClass.BLACK_MAGE] = {hp:25,str:1,agi:10,int:20,vit:1,luck:10,hit:5,magicDef:20};
  this.startingStats[CharacterClass.KNIGHT] = this.startingStats[CharacterClass.FIGHTER];
  this.startingStats[CharacterClass.NINJA] = this.startingStats[CharacterClass.THIEF];
  this.startingStats[CharacterClass.MASTER] = this.startingStats[CharacterClass.BLACKBELT];
  this.startingStats[CharacterClass.RED_WIZARD] = this.startingStats[CharacterClass.RED_MAGE];
  this.startingStats[CharacterClass.WHITE_WIZARD] = this.startingStats[CharacterClass.WHITE_MAGE];
  this.startingStats[CharacterClass.BLACK_WIZARD] = this.startingStats[CharacterClass.BLACK_MAGE];
  
  this.spellCharges = {};
  this.spellCharges[CharacterClass.RED_MAGE] = ["","111","2","2","1","1","3","13","2","3","14","4","3","24","1","5","345","2","5","4","36","156","","6","24","5","67","37","2","67","45","8","378","6","8","157","8","4","7","8","6","2","5","8","7","3","6","8","4","7","5"];
  this.spellCharges[CharacterClass.WHITE_MAGE] = ["","111","2","2","1","23","3","1","34","24","1","34","5","25","14","35","6","26","45","16","37","7","56","47","12","68","78","35","28","47","68","3","5","8","7","4","6","8","2","7","5","8","6","3","7","8","4","5","6","7","8"];
  this.spellCharges[CharacterClass.BLACK_MAGE] = this.spellCharges[CharacterClass.WHITE_MAGE];
  this.spellCharges[CharacterClass.RED_WIZARD] = this.spellCharges[CharacterClass.RED_MAGE];
  this.spellCharges[CharacterClass.WHITE_WIZARD] = this.spellCharges[CharacterClass.WHITE_MAGE];
  this.spellCharges[CharacterClass.BLACK_WIZARD] = this.spellCharges[CharacterClass.BLACK_MAGE];

  this.experience = [0,40,196,547,1171,2146,3550,5461,7957,11116,15016,19735,25351,31942,39586,48361,58345,69617,82253,96332,111932,129131,148008,168639,191103,215479,241843,270275,300851,333651,366450,399250,432049,464849,497648,530448,563247,596047,628846,661646,694445,727245,760044,792844,825643,858443,891242,924042,956841,989641];
  
  this.addMaxChargesToChar = function(char) {
    var chargesForClass = this.spellCharges[char.currentClass.name];
    
    if (!chargesForClass) {
      return;
    }
    var addedCharges = chargesForClass[char.charLevel];
    for (var i = 0; i < addedCharges.length; i++) {
      var spellLevel = addedCharges.charAt(i);
      if (spellLevel.length > 0) {
        char.addMaxSpellCharge(parseInt(spellLevel));
      }
    }
  };
  
  this.experienceForNextLevel = function(char) {
    return this.experience[char.charLevel] - char.experience;
  };
  
  return this;
}).call({});


