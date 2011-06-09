Monster.create({names : {original:"IMP", other:{origins:"Goblin"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:8,atk:4,acc:2,hits:1,crt:1,def:4,eva:6,md:16,mor:106}
               ,reward : {gold:6,exp:6}
               ,ui: {size:"small",cssClass:"imp"}});
Monster.create({names : {original:"GrIMP", other:{origins:"Goblin Guard"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:16,atk:8,acc:4,hits:1,crt:1,def:6,eva:9,md:23,mor:120}
               ,rewards : {gold:18,exp:18}
               ,ui: {size:"small",cssClass:"greatImp"}});
Monster.create({names : {original:"WOLF", other:{origins:"Wolf"}}
               ,stats : {hp:20,atk:8,acc:5,hits:1,crt:1,def:0,eva:36,md:28,mor:105}
               ,rewards : {gold:6,exp:24}
               ,ui: {size:"small",cssClass:"wolf"}});
Monster.create({names : {original:"GrWOLF", other:{origins:"Warg Wolf"}}
               ,stats : {hp:72,atk:14,acc:18,hits:1,crt:1,def:0,eva:54,md:46,mor:108}
               ,rewards : {gold:22,exp:93}
               ,ui: {size:"small",cssClass:"greatWolf"}});
Monster.create({names : {original:"WrWOLF", other:{origins:"Werewolf"}}
               ,type : [Monster.Types.Magical, Monster.Types.Were, Monster.Types.Regenerative]
               ,stats : {hp:68,atk:14,acc:17,hits:1,crt:1,def:6,eva:42,md:45,mor:120}
               ,rewards : {gold:67,exp:135}
               ,specialAttacks: {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"small",cssClass:"werewolf"}});
Monster.create({names : {original:"FrWOLF", other:{origins:"Winter Wolf"}}
               ,stats : {hp:92,atk:25,acc:23,hits:1,crt:1,def:0,eva:54,md:55,mor:200}
               ,rewards : {gold:200,exp:402}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Ice]}
               ,skills : {chance:50, order:["FROST"]}
               ,ui: {size:"small",cssClass:"frostWolf"}});
Monster.create({names : {original:"IGUANA", other:{origins:"Lizard"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:92,atk:18,acc:23,hits:1,crt:10,def:12,eva:24,md:55,mor:134}
               ,rewards : {gold:50,exp:153}
               ,ui: {size:"large",cssClass:"iguana"}});
Monster.create({names : {original:"AGAMA", other:{origins:"Fire Lizard"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:296,atk:31,acc:74,hits:2,crt:1,def:18,eva:36,md:143,mor:200}
               ,rewards : {gold:1200,exp:2472}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire]}
               ,skills : {chance:25, order:["HEAT"]}
               ,ui: {size:"large",cssClass:"agama"}});
Monster.create({names : {original:"SAURIA", other:{origins:"Basilisk"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:196,atk:30,acc:54,hits:1,crt:1,def:20,eva:24,md:91,mor:200}
               ,rewards : {gold:658,exp:1977}
               ,skills : {chance:50, order:["GLANCE"]}
               ,ui: {size:"large",cssClass:"sauria"}});
Monster.create({names : {original:"GIANT", other:{origins:"Hill Gigas"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:240,atk:38,acc:60,hits:1,crt:1,def:12,eva:48,md:120,mor:136}
               ,rewards : {gold:879,exp:879}
               ,ui: {size:"large",cssClass:"giant"}});
Monster.create({names : {original:"FrGIANT", other:{origins:"Ice Gigas"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:336,atk:60,acc:78,hits:1,crt:1,def:16,eva:48,md:150,mor:200}
               ,rewards : {gold:1752,exp:1752}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Ice]}
               ,ui: {size:"large",cssClass:"frostGiant"}});
Monster.create({names : {original:"R.GIANT", other:{origins:"Fire Gigas"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:300,atk:73,acc:83,hits:1,crt:1,def:20,eva:48,md:135,mor:200}
               ,rewards : {gold:1506,exp:1506}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire]}
               ,ui: {size:"large",cssClass:"redGiant"}});
Monster.create({names : {original:"SAHAG", other:{origins:"Sahagin", translated:"Sahuagin"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:28,atk:10,acc:7,hits:1,crt:1,def:4,eva:72,md:28,mor:110}
               ,rewards : {gold:30,exp:30}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"sahag"}});
Monster.create({names : {original:"R.SAHAG", other:{origins:"Sahagin Chief", translated:"Sahuagin Chief"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:64,atk:15,acc:16,hits:1,crt:1,def:8,eva:78,md:46,mor:142}
               ,rewards : {gold:105,exp:105}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"redSahag"}});
Monster.create({names : {original:"WzSAHAG", other:{origins:"Sahagin Prince", translated:"Sahuagin Prince"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:204,atk:47,acc:51,hits:1,crt:1,def:20,eva:96,md:101,mor:101}
               ,rewards : {gold:882,exp:882}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"wizardSahag"}});
Monster.create({names : {original:"PIRATE", other:{origins:"Pirate"}}
               ,type : Monster.Types.None
               ,stats : {hp:6,atk:8,acc:2,hits:1,crt:1,def:0,eva:12,md:15,mor:255}
               ,rewards : {gold:40,exp:40}
               ,ui: {size:"small",cssClass:"pirate"}});
Monster.create({names : {original:"KYZOKU", other:{origins:"Privateer", translated:"Pirates"}}
               ,stats : {hp:50,atk:14,acc:13,hits:1,crt:1,def:6,eva:24,md:37,mor:106}
               ,rewards : {gold:120,exp:60}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"small",cssClass:"kyzoku"}});
Monster.create({names : {original:"SHARK", other:{origins:"Shark"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:120,atk:22,acc:30,hits:1,crt:1,def:0,eva:72,md:70,mor:121}
               ,rewards : {gold:66,exp:267}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"large",cssClass:"shark"}});
Monster.create({names : {original:"GrSHARK", other:{origins:"White Shark"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:344,atk:50,acc:86,hits:1,crt:1,def:8,eva:72,md:170,mor:200}
               ,rewards : {gold:600,exp:2361}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"large",cssClass:"greyShark"}});
Monster.create({names : {original:"OddEYE", other:{origins:"Goggler",translated:"Big Eye"}}
               ,stats : {hp:10,atk:4,acc:2,hits:1,crt:1,def:0,eva:84,md:14,mor:110}
               ,rewards : {gold:10,exp:42}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:100, order:["GAZE"]}
               ,ui: {size:"large",cssClass:"oddeye"}});
Monster.create({names : {original:"BigEYE", other:{origins:"Deepeyes",translated:"Deep Eye"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:304,atk:30,acc:76,hits:2,crt:1,def:16,eva:24,md:156,mor:200}
               ,rewards : {gold:3591,exp:3591}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:50,order:["GAZE","FLASH"]}
               ,ui: {size:"large",cssClass:"bigeye"}});
Monster.create({names : {original:"BONE", other:{origins:"Skeleton"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:10,atk:10,acc:2,hits:1,crt:1,def:0,eva:12,md:17,mor:124}
               ,rewards : {gold:3,exp:9}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"bone"}});
Monster.create({names : {original:"R.BONE", other:{origins:"Bloodbones",translated:"Bloody Bone"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:144,atk:26,acc:36,hits:1,crt:1,def:12,eva:42,md:76,mor:156}
               ,rewards : {gold:378,exp:378}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"redBone"}});
Monster.create({names : {original:"CREEP", other:{origins:"Gigas Worm"}}
               ,stats : {hp:56,atk:17,acc:14,hits:1,crt:1,def:8,eva:24,md:40,mor:104}
               ,rewards : {gold:15,exp:63}
               ,elements : {weakTo:[Element.Fire]}
               ,ui: {size:"small",cssClass:"creep"}});
Monster.create({names : {original:"CRAWL", other:{origins:"Crawler"}}
               ,stats : {hp:84,atk:1,acc:21,hits:8,crt:1,def:8,eva:42,md:51,mor:106}
               ,rewards : {gold:200,exp:186}
               ,specialAttacks : {status:Status.Paralysis, element:Element.Status}
               ,ui: {size:"small",cssClass:"crawl"}});
Monster.create({names : {original:"HYENA", other:{origins:"Hyenadon",translated:"Hyeanodon"}}
               ,stats : {hp:120,atk:22,acc:30,hits:1,crt:1,def:4,eva:48,md:76,mor:122}
               ,rewards : {gold:72,exp:288}
               ,ui: {size:"large",cssClass:"hyena"}});
Monster.create({names : {original:"CEREBUS", other:{origins:"Hellhound",translated:"Hell Hound"}}
               ,stats : {hp:192,atk:30,acc:48,hits:1,crt:1,def:8,eva:48,md:103,mor:146}
               ,rewards : {gold:600,exp:1182}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire]}
               ,skills : {chance:50,order:["SCORCH"]}
               ,ui: {size:"large",cssClass:"cerberus"}});
Monster.create({names : {original:"OGRE", other:{origins:"Ogre"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:100,atk:18,acc:25,hits:1,crt:1,def:10,eva:18,md:65,mor:116}
               ,rewards : {gold:195,exp:195}
               ,ui: {size:"large",cssClass:"ogre"}});
Monster.create({names : {original:"GrOGRE", other:{origins:"Ogre Chieftain",translated:"Ogre Chief"}}
               ,type : Monster.Types.Giant
               ,stats : {hp:132,atk:23,acc:33,hits:1,crt:1,def:14,eva:30,md:71,mor:126}
               ,rewards : {gold:300,exp:282}
               ,ui: {size:"large",cssClass:"greenOgre"}});
Monster.create({names : {original:"WzOGRE", other:{origins:"Ogre Mage"}}
               ,type : [Monster.Types.Giant, Monster.Types.Mage, Monster.Types.Regenerative]
               ,stats : {hp:144,atk:23,acc:36,hits:1,crt:1,def:10,eva:54,md:80,mor:134}
               ,rewards : {gold:723,exp:723}
               ,elements : {resists:[Element.Earth]}
               ,magic : {chance:50,order:["RUSE","DARK","SLEP","HOLD","ICE2"]}
               ,ui: {size:"large",cssClass:"wizardOgre"}});
Monster.create({names : {original:"ASP", other:{origins:"Cobra"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:56,atk:6,acc:14,hits:1,crt:1,def:6,eva:30,md:46,mor:107}
               ,rewards : {gold:50,exp:123}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"small",cssClass:"asp"}});
Monster.create({names : {original:"COBRA", other:{origins:"Anaconda"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:80,atk:22,acc:20,hits:1,crt:31,def:10,eva:36,md:56,mor:110}
               ,rewards : {gold:50,exp:165}
               ,ui: {size:"small",cssClass:"cobra"}});
Monster.create({names : {original:"SeaSNAKE", other:{origins:"Sea Snake"}}
               ,type : [Monster.Types.Dragon, Monster.Types.Aquatic]
               ,stats : {hp:224,atk:35,acc:56,hits:1,crt:0,def:12,eva:48,md:116,mor:200}
               ,rewards : {gold:600,exp:957}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"seasnake"}});
Monster.create({names : {original:"SCORPION", other:{origins:"Scorpion"}}
               ,stats : {hp:84,atk:22,acc:21,hits:2,crt:1,def:10,eva:54,md:55,mor:112}
               ,rewards : {gold:70,exp:225}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"small",cssClass:"scorpion"}});
Monster.create({names : {original:"LOBSTER", other:{origins:"Sea Scorpion"}}
               ,type : Monster.Types.Aquatic
               ,stats : {hp:148,atk:35,acc:37,hits:3,crt:1,def:18,eva:60,md:85,mor:200}
               ,rewards : {gold:300,exp:639}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"lobster"}});
Monster.create({names : {original:"BULL", other:{origins:"Minotaur"}}
               ,stats : {hp:164,atk:22,acc:41,hits:2,crt:1,def:4,eva:48,md:95,mor:124}
               ,rewards : {gold:489,exp:489}
               ,ui: {size:"large",cssClass:"bull"}});
Monster.create({names : {original:"ZomBULL", other:{origins:"Necrotaur",translated:"Minotaur Zombie"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:224,atk:40,acc:56,hits:1,crt:1,def:14,eva:36,md:116,mor:136}
               ,rewards : {gold:1050,exp:1050}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"large",cssClass:"zombull"}});
Monster.create({names : {original:"TROLL", other:{origins:"Troll"}}
               ,type : Monster.Types.Regenerative
               ,stats : {hp:184,atk:24,acc:46,hits:3,crt:1,def:12,eva:48,md:100,mor:136}
               ,rewards : {gold:621,exp:621}
               ,elements : {weakTo:[Element.Fire]}
               ,ui: {size:"large",cssClass:"troll"}});
Monster.create({names : {original:"SeaTROLL", other:{origins:"Sea Troll"}}
               ,type : [Monster.Types.Aquatic, Monster.Types.Regenerative]
               ,stats : {hp:216,atk:40,acc:54,hits:1,crt:1,def:20,eva:48,md:110,mor:200}
               ,rewards : {gold:852,exp:852}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Earth]}
               ,ui: {size:"large",cssClass:"seaTroll"}});
Monster.create({names : {original:"SHADOW", other:{origins:"Shadow"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead]
               ,stats : {hp:50,atk:10,acc:13,hits:1,crt:1,def:0,eva:36,md:37,mor:124}
               ,rewards : {gold:45,exp:90}
               ,specialAttacks : {status:Status.Blind, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"shadow"}});
Monster.create({names : {original:"IMAGE", other:{origins:"Wraith"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead]
               ,stats : {hp:86,atk:22,acc:22,hits:1,crt:1,def:4,eva:90,md:52,mor:160}
               ,rewards : {gold:231,exp:231}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"image"}});
Monster.create({names : {original:"WRAITH", other:{origins:"Specter"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead]
               ,stats : {hp:114,atk:40,acc:29,hits:1,crt:1,def:12,eva:108,md:67,mor:160}
               ,rewards : {gold:432,exp:432}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"wraith"}});
Monster.create({names : {original:"GHOST", other:{origins:"Ghost"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead]
               ,stats : {hp:180,atk:93,acc:45,hits:1,crt:1,def:30,eva:36,md:85,mor:184}
               ,rewards : {gold:990,exp:990}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"ghost"}});
Monster.create({names : {original:"ZOMBIE", other:{origins:"Zombie"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:20,atk:10,acc:5,hits:1,crt:1,def:0,eva:6,md:25,mor:120}
               ,rewards : {gold:12,exp:24}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"zombie"}});
Monster.create({names : {original:"GHOUL", other:{origins:"Ghoul"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:48,atk:8,acc:12,hits:3,crt:1,def:6,eva:12,md:36,mor:124}
               ,rewards : {gold:50,exp:93}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"ghoul"}});
Monster.create({names : {original:"GEIST", other:{origins:"Ghast"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:56,atk:8,acc:14,hits:3,crt:1,def:10,eva:46,md:40,mor:160}
               ,rewards : {gold:117,exp:117}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"geist"}});
Monster.create({names : {original:"SPECTER", other:{origins:"Wight"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:52,atk:20,acc:13,hits:1,crt:1,def:12,eva:42,md:45,mor:160}
               ,rewards : {gold:150,exp:150}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"specter"}});
Monster.create({names : {original:"WORM", other:{origins:"Purple Worm"}}
               ,stats : {hp:448,atk:65,acc:112,hits:1,crt:10,def:10,eva:36,md:200,mor:200}
               ,rewards : {gold:1000,exp:4344}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"large",cssClass:"worm"}});
Monster.create({names : {original:"Sand W", other:{origins:"Sand Worm"}}
               ,stats : {hp:200,atk:46,acc:50,hits:1,crt:1,def:14,eva:62,md:103,mor:124}
               ,rewards : {gold:900,exp:2683}
               ,elements : {resists:[Element.Earth]}
               ,skills : {chance:50,order:["CRACK"]}
               ,ui: {size:"large",cssClass:"sandWorm"}});
Monster.create({names : {original:"Grey W", other:{origins:"Lava Worm"}}
               ,stats : {hp:280,atk:50,acc:70,hits:1,crt:1,def:31,eva:4,md:143,mor:200}
               ,rewards : {gold:400,exp:1671}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"large",cssClass:"greyWorm"}});
Monster.create({names : {original:"EYE", other:{origins:"Evil Eye",translated:"Beholder"}}
               ,type : Monster.Types.Mage
               ,stats : {hp:162,atk:30,acc:42,hits:1,crt:1,def:30,eva:12,md:92,mor:200}
               ,rewards : {gold:3225,exp:3225}
               ,elements : {resists:[Element.Earth]}
               ,magic : {chance:62.5,order:["XXXX","BRAK","RUB","LIT2","HOLD","MUTE","SLOW","SLEP"]}
               ,skills : {chance:62.5,order:["GLANCE","SQUINT","GAZE","STARE"]}
               ,ui: {size:"large",cssClass:"eye"}});
Monster.create({names : {original:"PHANTOM", other:{origins:"Death Eye",translated:"Death Beholder"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead, Monster.Types.Regenerative]
               ,stats : {hp:360,atk:120,acc:150,hits:1,crt:40,def:60,eva:24,md:160,mor:200}
               ,rewards : {gold:1,exp:1}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,magic : {chance:50,order:["STOP","ZAP!","XFER","BRAK","RUB","HOLD","MUTE","SLOW"]}
               ,skills : {chance:50,order:["GLARE"]}
               ,ui: {size:"large",cssClass:"phantom"}});
Monster.create({names : {original:"MEDUSA", other:{origins:"Medusa"}}
               ,stats : {hp:68,atk:20,acc:17,hits:1,crt:1,def:10,eva:36,md:55,mor:150}
               ,rewards : {gold:699,exp:699}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,skills : {chance:50,order:["GLANCE"]}
               ,ui: {size:"small",cssClass:"medusa"}});
Monster.create({names : {original:"GrMEDUSA", other:{origins:"Earth Medusa"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:96,atk:11,acc:24,hits:10,crt:1,def:12,eva:72,md:70,mor:200}
               ,rewards : {gold:1218,exp:1218}
               ,specialAttacks : {status:Status.Paralyze, element:Element.PoisonStone}
               ,skills : {chance:50,order:["GLANCE"]}
               ,ui: {size:"small",cssClass:"greenMedusa"}});
Monster.create({names : {original:"CATMAN", other:{origins:"Weretiger"}}
               ,type : [Monster.Types.Magical, Monster.Types.Were, Monster.Types.Regenerative]
               ,stats : {hp:160,atk:30,acc:40,hits:2,crt:1,def:16,eva:48,md:93,mor:148}
               ,rewards : {gold:780,exp:780}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"small",cssClass:"catman"}});
Monster.create({names : {original:"MANCAT", other:{origins:"Rakshasa"}}
               ,type : Monster.Types.Mage
               ,stats : {hp:110,atk:20,acc:28,hits:3,crt:1,def:30,eva:60,md:62,mor:150}
               ,rewards : {gold:800,exp:603}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,magic : {chance:75,order:["FIR2","SLOW","DARK","SLEP","FIRE","LIT","CURE"]}
               ,ui: {size:"small",cssClass:"mancat"}});
Monster.create({names : {original:"PEDE", other:{origins:"Centipede",translated:"Ankheg"}}
               ,stats : {hp:222,atk:39,acc:56,hits:1,crt:1,def:20,eva:48,md:116,mor:111}
               ,rewards : {gold:300,exp:1194}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"large",cssClass:"pede"}});
Monster.create({names : {original:"GrPEDE", other:{origins:"Remora",translated:"Remorhaz"}}
               ,stats : {hp:320,atk:73,acc:80,hits:1,crt:1,def:24,eva:48,md:185,mor:176}
               ,rewards : {gold:1000,exp:2244}
               ,elements : {resists:[Element.Fire, Element.Ice]}
               ,ui: {size:"large",cssClass:"greatPede"}});
Monster.create({names : {original:"TIGER", other:{origins:"Lesser Tiger",translated:"Kitty Tiger"}}
               ,stats : {hp:132,atk:22,acc:33,hits:2,crt:25,def:8,eva:48,md:85,mor:116}
               ,rewards : {gold:108,exp:438}
               ,ui: {size:"large",cssClass:"tiger"}});
Monster.create({names : {original:"SABER T", other:{origins:"Sabertooth",translated:"Saber Tiger"}}
               ,stats : {hp:200,atk:24,acc:50,hits:2,crt:70,def:8,eva:42,md:106,mor:180}
               ,rewards : {gold:500,exp:843}
               ,ui: {size:"large",cssClass:"saberT"}});
Monster.create({names : {original:"VAMPIRE", other:{origins:"Vampire"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead, Monster.Types.Regenerative]
               ,stats : {hp:156,atk:76,acc:39,hits:1,crt:1,def:24,eva:72,md:75,mor:200}
               ,rewards : {gold:2000,exp:1200}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,skills : {chance:25,order:["DAZZLE"]}
               ,ui: {size:"small",cssClass:"vampire"}});
Monster.create({names : {original:"WzVAMP", other:{origins:"Vampire Lord"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead, Monster.Types.Mage, Monster.Types.Regenerative]
               ,stats : {hp:300,atk:90,acc:42,hits:1,crt:1,def:28,eva:72,md:84,mor:200}
               ,rewards : {gold:3000,exp:2385}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,magic : {chance:25,order:["AFIR","MUTE","ICE2","ICE2","LIT2","FIR2","FIR2"]}
               ,skills : {chance:25,order:["DAZZLE"]}
               ,ui: {size:"small",cssClass:"wizardVampire"}});
Monster.create({names : {original:"GARGOYLE", other:{origins:"Gargoyle"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:80,atk:12,acc:20,hits:4,crt:1,def:8,eva:45,md:53,mor:132}
               ,rewards : {gold:80,exp:132}
               ,ui: {size:"small",cssClass:"gargoyle"}});
Monster.create({names : {original:"R.GOYLE", other:{origins:"Horned Devil"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:94,atk:10,acc:24,hits:4,crt:1,def:32,eva:72,md:127,mor:134}
               ,rewards : {gold:387,exp:387}
               ,specialAttacks : {element:Element.PoisonStone}
               ,elements : {resists:[Element.Fire, Element.Ice, Element.Earth]}
               ,magic : {chance:50,order:["FIR2","HOLD","FIRE","FIRE"]}
               ,ui: {size:"small",cssClass:"redGargoyle"}});
Monster.create({names : {original:"EARTH", other:{origins:"Gnoma",translated:"Earth Element"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:288,atk:66,acc:72,hits:1,crt:1,def:20,eva:18,md:130,mor:200}
               ,rewards : {gold:768,exp:1536}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"large",cssClass:"earth"}});
Monster.create({names : {original:"FIRE", other:{origins:"Pyros",translated:"Fire"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:276,atk:50,acc:69,hits:1,crt:1,def:20,eva:42,md:130,mor:200}
               ,rewards : {gold:800,exp:1620}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Earth]}
               ,ui: {size:"large",cssClass:"fire"}});
Monster.create({names : {original:"Frost D", other:{origins:"White Dragon"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:200,atk:53,acc:50,hits:1,crt:1,def:8,eva:120,md:196,mor:200}
               ,rewards : {gold:2000,exp:1701}
               ,elements : {weakTo:[Element.Fire, Element.Lightning], resists:[Element.PoisonStone, Element.Ice, Element.Earth]}
               ,skills : {chance:50,order:["BLIZZARD"]}
               ,ui: {size:"large",cssClass:"frostDragon"}});
Monster.create({names : {original:"Red D", other:{origins:"Red Dragon"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:248,atk:75,acc:62,hits:1,crt:1,def:30,eva:96,md:200,mor:200}
               ,rewards : {gold:4000,exp:2904}
               ,elements : {weakTo:[Element.PoisonStone, Element.Ice], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:50,order:["BLAZE"]}
               ,ui: {size:"large",cssClass:"redDragon"}});
Monster.create({names : {original:"Zombie D", other:{origins:"Dragon Zombie"}}
               ,type : [Monster.Types.Dragon, Monster.Types.Undead]
               ,stats : {hp:268,atk:56,acc:67,hits:1,crt:1,def:30,eva:24,md:135,mor:200}
               ,rewards : {gold:999,exp:2331}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Earth]}
               ,ui: {size:"large",cssClass:"zombieDragon"}});
Monster.create({names : {original:"SCUM", other:{origins:"Green Slime"}}
               ,stats : {hp:24,atk:1,acc:1,hits:1,crt:1,def:255,eva:0,md:36,mor:124}
               ,rewards : {gold:20,exp:84}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {weakTo:[Element.Fire, Element.Ice], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Lightning, Element.Earth]}
               ,ui: {size:"small",cssClass:"scum"}});
Monster.create({names : {original:"MUCK", other:{origins:"Gray Ooze"}}
               ,stats : {hp:76,atk:30,acc:19,hits:1,crt:1,def:7,eva:4,md:55,mor:152}
               ,rewards : {gold:70,exp:255}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"muck"}});
Monster.create({names : {original:"OOZE", other:{origins:"Ochre Jelly"}}
               ,stats : {hp:76,atk:32,acc:19,hits:1,crt:1,def:6,eva:6,md:55,mor:144}
               ,rewards : {gold:70,exp:252}
               ,elements : {weakTo:[Element.Fire, Element.Ice], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Lightning, Element.Earth]}
               ,ui: {size:"small",cssClass:"ooze"}});
Monster.create({names : {original:"SLIME", other:{origins:"Dark Flan",translated:"Black Pudding"}}
               ,stats : {hp:156,atk:49,acc:39,hits:1,crt:1,def:255,eva:24,md:85,mor:200}
               ,rewards : {gold:900,exp:1101}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice, Element.Lightning, Element.Earth]}
               ,ui: {size:"small",cssClass:"slime"}});
Monster.create({names : {original:"SPIDER", other:{origins:"Black Widow"}}
               ,stats : {hp:28,atk:10,acc:7,hits:1,crt:1,def:0,eva:30,md:28,mor:109}
               ,rewards : {gold:8,exp:30}
               ,ui: {size:"small",cssClass:"spider"}});
Monster.create({names : {original:"ARACHNID", other:{origins:"Tarantula"}}
               ,stats : {hp:64,atk:5,acc:16,hits:1,crt:1,def:12,eva:24,md:46,mor:111}
               ,rewards : {gold:50,exp:141}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"small",cssClass:"arachnid"}});
Monster.create({names : {original:"MANTICOR", other:{origins:"Manticore"}}
               ,stats : {hp:164,atk:22,acc:41,hits:2,crt:1,def:8,eva:72,md:95,mor:150}
               ,rewards : {gold:650,exp:1317}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {resists:[Element.Earth]}
               ,skills : {chance:50,order:["STINGER"]}
               ,ui: {size:"large",cssClass:"manticore"}});
Monster.create({names : {original:"SPHINX", other:{origins:"Sphinx"}}
               ,stats : {hp:228,atk:23,acc:57,hits:3,crt:1,def:12,eva:120,md:115,mor:132}
               ,rewards : {gold:1160,exp:1160}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"large",cssClass:"sphinx"}});
Monster.create({names : {original:"R.ANKYLO", other:{origins:"Baretta",translated:"Bulette"}}
               ,stats : {hp:256,atk:60,acc:64,hits:3,crt:1,def:38,eva:56,md:130,mor:146}
               ,rewards : {gold:300,exp:1428}
               ,ui: {size:"large",cssClass:"redAnkylo"}});
Monster.create({names : {original:"ANKYLO", other:{origins:"Desert Baretta",translated:"Desert Bulette"}}
               ,stats : {hp:352,atk:98,acc:88,hits:1,crt:1,def:48,eva:48,md:156,mor:144}
               ,rewards : {gold:1,exp:2610}
               ,ui: {size:"large",cssClass:"ankylo"}});
Monster.create({names : {original:"MUMMY", other:{origins:"Mummy"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:80,atk:30,acc:20,hits:1,crt:1,def:20,eva:24,md:60,mor:172}
               ,rewards : {gold:300,exp:300}
               ,specialAttacks : {status:Status.Sleep, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"mummy"}});
Monster.create({names : {original:"WzMUMMY", other:{origins:"King Mummy"}}
               ,type : Monster.Types.Undead
               ,stats : {hp:188,atk:43,acc:47,hits:1,crt:1,def:24,eva:24,md:95,mor:148}
               ,rewards : {gold:1000,exp:984}
               ,specialAttacks : {status:Status.Sleep, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,ui: {size:"small",cssClass:"wizardMummy"}});
Monster.create({names : {original:"COCTRICE", other:{origins:"Cockatrice"}}
               ,stats : {hp:50,atk:1,acc:10,hits:1,crt:1,def:4,eva:72,md:47,mor:124}
               ,rewards : {gold:200,exp:186}
               ,specialAttacks : {status:Status.Petrify, element:Element.PoisonStone}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"small",cssClass:"coctrice"}});
Monster.create({names : {original:"PERILISK", other:{origins:"Pyrolisk"}}
               ,stats : {hp:44,atk:20,acc:11,hits:1,crt:1,def:4,eva:72,md:45,mor:124}
               ,rewards : {gold:500,exp:423}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:25,order:["SQUINT"]}
               ,ui: {size:"small",cssClass:"perilisk"}});
Monster.create({names : {original:"WYVERN", other:{origins:"Wyvern"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:212,atk:30,acc:53,hits:1,crt:1,def:12,eva:96,md:115,mor:150}
               ,rewards : {gold:50,exp:1173}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"large",cssClass:"wyvern"}});
Monster.create({names : {original:"WYRM", other:{origins:"Wyrm"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:260,atk:40,acc:65,hits:1,crt:1,def:22,eva:60,md:131,mor:150}
               ,rewards : {gold:50,exp:1173}
               ,elements : {resists:[Element.Earth]}
               ,ui: {size:"large",cssClass:"wyrm"}});
Monster.create({names : {original:"TYRO", other:{origins:"Allosaurus"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:480,atk:65,acc:133,hits:1,crt:1,def:10,eva:60,md:200,mor:144}
               ,rewards : {gold:502,exp:3387}
               ,ui: {size:"large",cssClass:"tyro"}});
Monster.create({names : {original:"T REX", other:{origins:"Tyrannosaur",translated:"Tyrannosaurus"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:600,atk:115,acc:144,hits:1,crt:30,def:10,eva:60,md:200,mor:150}
               ,rewards : {gold:600,exp:7200}
               ,ui: {size:"large",cssClass:"trex"}});
Monster.create({names : {original:"CARIBE", other:{origins:"Piranha"}}
               ,stats : {hp:92,atk:22,acc:23,hits:1,crt:1,def:0,eva:72,md:68,mor:138}
               ,rewards : {gold:20,exp:240}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"caribe"}});
Monster.create({names : {original:"R.CARIBE", other:{origins:"Red Piranha"}}
               ,stats : {hp:172,atk:37,acc:43,hits:1,crt:1,def:20,eva:72,md:83,mor:142}
               ,rewards : {gold:46,exp:546}
               ,ui: {size:"small",cssClass:"redCaribe"}});
Monster.create({names : {original:"GATOR", other:{origins:"Crocodile"}}
               ,stats : {hp:184,atk:42,acc:46,hits:2,crt:1,def:16,eva:48,md:103,mor:138}
               ,rewards : {gold:900,exp:816}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"gator"}});
Monster.create({names : {original:"FrGATOR", other:{origins:"White Croc",translated:"White 'dile"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:288,atk:56,acc:72,hits:2,crt:1,def:20,eva:48,md:143,mor:142}
               ,rewards : {gold:2000,exp:1890}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"frostGator"}});
Monster.create({names : {original:"OCHO", other:{origins:"Ochu",translated:"Otyugh"}}
               ,stats : {hp:208,atk:20,acc:52,hits:3,crt:1,def:24,eva:24,md:116,mor:176}
               ,rewards : {gold:102,exp:1224}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,ui: {size:"large",cssClass:"ocho"}});
Monster.create({names : {original:"NAOCHO", other:{origins:"Neochu",translated:"Neo-Otyugh"}}
               ,stats : {hp:344,atk:35,acc:86,hits:3,crt:1,def:32,eva:24,md:170,mor:200}
               ,rewards : {gold:500,exp:3189}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,ui: {size:"large",cssClass:"naocho"}});
Monster.create({names : {original:"HYDRA", other:{origins:"Hydra"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:212,atk:30,acc:53,hits:3,crt:1,def:14,eva:36,md:116,mor:138}
               ,rewards : {gold:150,exp:915}
               ,ui: {size:"large",cssClass:"hydra"}});
Monster.create({names : {original:"R.HYDRA", other:{origins:"Fire Hydra"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:182,atk:20,acc:46,hits:3,crt:1,def:14,eva:36,md:103,mor:152}
               ,rewards : {gold:400,exp:1215}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire]}
               ,skills : {chance:50,order:["CREMATE"]}
               ,ui: {size:"large",cssClass:"redHydra"}});
Monster.create({names : {original:"GUARD", other:{origins:"Guardian"}}
               ,stats : {hp:200,atk:25,acc:50,hits:2,crt:1,def:40,eva:72,md:110,mor:200}
               ,rewards : {gold:400,exp:1224}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Status, Element.PoisonStone, Element.Death]}
               ,ui: {size:"small",cssClass:"guard"}});
Monster.create({names : {original:"SENTRY", other:{origins:"Soldier"}}
               ,stats : {hp:400,atk:102,acc:90,hits:1,crt:1,def:48,eva:96,md:160,mor:150}
               ,rewards : {gold:2000,exp:4000}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Earth]}
               ,ui: {size:"small",cssClass:"sentry"}});
Monster.create({names : {original:"WATER", other:{origins:"Aquos",translated:"Water"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:300,atk:69,acc:68,hits:1,crt:1,def:20,eva:72,md:130,mor:200}
               ,rewards : {gold:800,exp:1962}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Earth]}
               ,ui: {size:"small",cssClass:"water"}});
Monster.create({names : {original:"AIR", other:{origins:"Aeros",translated:"Air Elemental"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:358,atk:53,acc:62,hits:1,crt:1,def:4,eva:144,md:130,mor:200}
               ,rewards : {gold:807,exp:1614}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Earth]}
               ,ui: {size:"small",cssClass:"air"}});
Monster.create({names : {original:"NAGA", other:{origins:"Water Naga"}}
               ,type : [Monster.Types.Aquatic, Monster.Types.Mage]
               ,stats : {hp:356,atk:9,acc:71,hits:1,crt:1,def:8,eva:72,md:116,mor:200}
               ,rewards : {gold:2355,exp:2355}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,magic : {chance:75,order:["LIT2","HOLD","SLOW","DARK","LIT","LOCK","SLEP","LIT"]}
               ,ui: {size:"large",cssClass:"naga"}});
Monster.create({names : {original:"GrNAGA", other:{origins:"Spirit Naga"}}
               ,type : Monster.Types.Mage
               ,stats : {hp:420,atk:7,acc:88,hits:1,crt:1,def:16,eva:48,md:143,mor:154}
               ,rewards : {gold:4000,exp:3489}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,magic : {chance:75,order:["RUSE","MUTE","SLOW","DARK","SLEP","FIRE","LIT","HEAL"]}
               ,ui: {size:"large",cssClass:"greyNaga"}});
Monster.create({names : {original:"CHIMERA", other:{origins:"Chimera"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:300,atk:30,acc:60,hits:4,crt:1,def:20,eva:72,md:130,mor:200}
               ,rewards : {gold:2500,exp:2064}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:50,order:["CREMATE"]}
               ,ui: {size:"large",cssClass:"chimera"}});
Monster.create({names : {original:"JIMERA", other:{origins:"Rhyos",translated:"Gorgimera"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:350,atk:40,acc:70,hits:4,crt:1,def:18,eva:60,md:143,mor:200}
               ,rewards : {gold:5000,exp:4584}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:50,order:["CREMATE","POISON"]}
               ,ui: {size:"large",cssClass:"jimera"}});
Monster.create({names : {original:"WIZARD", other:{origins:"Piscodemon"}}
               ,type : [Monster.Types.Magical, Monster.Types.Aquatic]
               ,stats : {hp:84,atk:30,acc:21,hits:2,crt:1,def:16,eva:66,md:98,mor:126}
               ,rewards : {gold:300,exp:276}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Fire, Element.Ice]}
               ,ui: {size:"small",cssClass:"wizard"}});
Monster.create({names : {original:"SORCERER", other:{origins:"Mindflayer",translated:"Mind Flayer"}}
               ,stats : {hp:112,atk:1,acc:28,hits:3,crt:1,def:12,eva:48,md:187,mor:130}
               ,rewards : {gold:999,exp:822}
               ,specialAttacks : {status:Status.Death}
               ,skills : {chance:50,order:["TRANCE"]}
               ,ui: {size:"small",cssClass:"sorceror"}});
Monster.create({names : {original:"GARLAND", other:{origins:"Garland"}}
               ,stats : {hp:106,atk:15,acc:27,hits:1,crt:1,def:10,eva:12,md:64,mor:255}
               ,rewards : {gold:250,exp:130}
               ,ui: {size:"small",cssClass:"garland",boss:true}});
Monster.create({names : {original:"Gas D", other:{origins:"Green Dragon"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:352,atk:72,acc:68,hits:1,crt:1,def:16,eva:96,md:200,mor:200}
               ,rewards : {gold:5000,exp:4068}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Earth]}
               ,skills : {chance:50,order:["POISON G"]}
               ,ui: {size:"large",cssClass:"gasDragon"}});
Monster.create({names : {original:"Blue D", other:{origins:"Blue Dragon"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:454,atk:92,acc:86,hits:1,crt:1,def:20,eva:96,md:200,mor:200}
               ,rewards : {gold:2000,exp:3274}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Lightning, Element.Earth]}
               ,skills : {chance:50,order:["THUNDER"]}
               ,ui: {size:"large",cssClass:"blueDragon"}});
Monster.create({names : {original:"MudGOL", other:{origins:"Clay Golem"}}
               ,type : [Monster.Types.Magical, Monster.Types.Mage]
               ,stats : {hp:176,atk:64,acc:44,hits:1,crt:1,def:7,eva:28,md:93,mor:200}
               ,rewards : {gold:800,exp:1257}
               ,specialAttacks : {status:Status.Poison, element:Element.PoisonStone}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Lightning]}
               ,magic : {chance:25,order:["FAST"]}
               ,ui: {size:"large",cssClass:"mudGol"}});
Monster.create({names : {original:"RockGOL", other:{origins:"Stone Golem"}}
               ,type : [Monster.Types.Magical, Monster.Types.Mage]
               ,stats : {hp:200,atk:70,acc:50,hits:1,crt:1,def:16,eva:24,md:110,mor:200}
               ,rewards : {gold:1000,exp:2385}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,magic : {chance:37.5,order:["SLOW"]}
               ,ui: {size:"large",cssClass:"rockGol"}});
Monster.create({names : {original:"IronGOL", other:{origins:"Iron Golem"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:304,atk:93,acc:76,hits:1,crt:1,def:100,eva:24,md:143,mor:200}
               ,rewards : {gold:3000,exp:6717}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Earth]}
               ,skills : {chance:12.5,order:["TOXIC"]}
               ,ui: {size:"large",cssClass:"ironGol"}});
Monster.create({names : {original:"BADMAN", other:{origins:"Black Knight"}}
               ,stats : {hp:260,atk:44,acc:65,hits:2,crt:1,def:38,eva:36,md:135,mor:200}
               ,rewards : {gold:1800,exp:1263}
               ,ui: {size:"small",cssClass:"badman"}});
Monster.create({names : {original:"EVILMAN", other:{origins:"Doom Knight",translated:"Death Knight"}}
               ,type : [Monster.Types.Magical, Monster.Types.Mage]
               ,stats : {hp:190,atk:55,acc:48,hits:1,crt:1,def:32,eva:42,md:173,mor:200}
               ,rewards : {gold:3000,exp:2700}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death]}
               ,magic : {chance:25,order:["XFER","NUKE","XFER","XXXX","BLND"]}
               ,ui: {size:"small",cssClass:"evilman"}});
Monster.create({names : {original:"ASTOS", other:{origins:"Astos"}}
               ,stats : {hp:168,atk:26,acc:42,hits:1,crt:1,def:40,eva:78,md:170,mor:255}
               ,rewards : {gold:2000,exp:2250}
               ,magic : {chance:75,order:["RUB","SLO2","FAST","FIR2","LIT2","SLOW","DARK","SLEP"]}
               ,ui: {size:"small",cssClass:"astos",boss:true}});
Monster.create({names : {original:"MAGE", other:{origins:"Dark Wizard"}}
               ,type : Monster.Types.Mage
               ,stats : {hp:105,atk:26,acc:27,hits:1,crt:1,def:40,eva:78,md:170,mor:200}
               ,rewards : {gold:1095,exp:1095}
               ,magic : {chance:50,order:["RUB","LIT3","FIR3","BANE","SLO2","STUN"]}
               ,ui: {size:"small",cssClass:"mage"}});
Monster.create({names : {original:"FIGHTER", other:{origins:"Dark Warrior",translated:"Dark Fighter"}}
               ,type : Monster.Types.Mage
               ,stats : {hp:200,atk:40,acc:45,hits:1,crt:1,def:38,eva:90,md:186,mor:158}
               ,rewards : {gold:3420,exp:3420}
               ,magic : {chance:37.5,order:["WALL","XFER","HEL3","FOG2","INV2","CUR4","HEL3","CUR3"]}
               ,ui: {size:"small",cssClass:"fighter"}});
Monster.create({names : {original:"MADPONY", other:{origins:"Crazy Horse"}}
               ,stats : {hp:64,atk:10,acc:16,hits:2,crt:1,def:2,eva:22,md:40,mor:106}
               ,rewards : {gold:15,exp:63}
               ,ui: {size:"large",cssClass:"madpony"}});
Monster.create({names : {original:"NITEMARE", other:{origins:"Nightmare"}}
               ,type : Monster.Types.Magical
               ,stats : {hp:200,atk:30,acc:50,hits:3,crt:1,def:24,eva:132,md:100,mor:200}
               ,rewards : {gold:700,exp:1272}
               ,elements : {weakTo:[Element.Ice], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Earth]}
               ,skills : {chance:25,order:["SNORTING"]}
               ,ui: {size:"large",cssClass:"nitemare"}});
Monster.create({names : {original:"WarMECH", other:{origins:"Warmech",translated:"Death Machine"}}
               ,type : Monster.Types.Regenerative
               ,stats : {hp:1000,atk:128,acc:200,hits:2,crt:1,def:80,eva:96,md:200,mor:200}
               ,rewards : {gold:32000,exp:32000}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,skills : {chance:25,order:["NUCLEAR"]}
               ,ui: {size:"large",cssClass:"warmech"}});
Monster.create({names : {original:"LICH", other:{origins:"Lich"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead, Monster.Types.Mage]
               ,stats : {hp:400,atk:40,acc:49,hits:1,crt:1,def:40,eva:24,md:120,mor:255}
               ,rewards : {gold:3000,exp:2200}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {weakTo:[Element.Fire], resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,magic : {chance:75,order:["ICE2","SLP2","FAST","LIT2","HOLD","FIR2","SLOW","SLEP"]}
               ,ui: {size:"fiend",cssClass:"lich",boss:true}});
Monster.create({names : {original:"LICH2", other:{origins:"Lich"}}
               ,type : [Monster.Types.Magical, Monster.Types.Undead, Monster.Types.Mage]
               ,stats : {hp:500,atk:50,acc:64,hits:1,crt:1,def:50,eva:48,md:140,mor:255}
               ,rewards : {gold:1,exp:2000}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Death, Element.Ice]}
               ,magic : {chance:75,order:["NUKE","STOP","ZAP!","XXXX"]}
               ,ui: {size:"fiend",cssClass:"lich",boss:true}});
Monster.create({names : {original:"KARY", other:{origins:"Marilith"}}
               ,type : [Monster.Types.Magical, Monster.Types.Mage]
               ,stats : {hp:600,atk:40,acc:63,hits:6,crt:1,def:50,eva:48,md:183,mor:255}
               ,rewards : {gold:3000,exp:2475}
               ,elements : {weakTo:[Element.Status], resists:[Element.PoisonStone, Element.Fire, Element.Ice, Element.Lightning]}
               ,magic : {chance:37.5,order:["FIR2","DARK","FIR2","DARK","FIR2","HOLD","FIR2","HOLD"]}
               ,ui: {size:"fiend",cssClass:"kary",boss:true}});
Monster.create({names : {original:"KARY2", other:{origins:"Marilith"}}
               ,type : [Monster.Types.Magical, Monster.Types.Mage]
               ,stats : {hp:700,atk:60,acc:63,hits:6,crt:1,def:60,eva:60,md:183,mor:255}
               ,rewards : {gold:1,exp:2000}
               ,elements : {resists:[Element.PoisonStone, Element.Fire, Element.Ice, Element.Lightning]}
               ,magic : {chance:37.5,order:["FIR3","RUB","FIR3","RUB","FIR3","STUN","FIR3","STUN"]}
               ,ui: {size:"fiend",cssClass:"kary",boss:true}});
Monster.create({names : {original:"KRAKEN", other:{origins:"Kraken"}}
               ,type : Monster.Types.Water
               ,stats : {hp:800,atk:50,acc:90,hits:8,crt:1,def:60,eva:84,md:160,mor:255}
               ,rewards : {gold:5000,exp:4245}
               ,elements : {weakTo:[Element.Lightning], resists:[Element.Fire, Element.Earth]}
               ,skills : {chance:25,order:["INK"]}
               ,ui: {size:"fiend",cssClass:"kraken",boss:true}});
Monster.create({names : {original:"KRAKEN2", other:{origins:"Kraken"}}
               ,type : Monster.Types.Water
               ,stats : {hp:900,atk:70,acc:114,hits:8,crt:1,def:70,eva:98,md:200,mor:255}
               ,rewards : {gold:1,exp:2000}
               ,elements : {resists:[Element.Fire, Element.Earth]}
               ,magic : {chance:37.5,order:["LIT2"]}
               ,skills : {chance:25,order:["INK"]}
               ,ui: {size:"fiend",cssClass:"kraken",boss:true}});
Monster.create({names : {original:"TIAMAT", other:{origins:"Tiamat"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:1000,atk:49,acc:80,hits:4,crt:1,def:80,eva:72,md:200,mor:255}
               ,rewards : {gold:6000,exp:5496}
               ,elements : {weakTo:[Element.PoisonStone], resists:[Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,skills : {chance:50,order:["THUNDER","POISON G","BLIZZARD","BLAZE"]}
               ,ui: {size:"fiend",cssClass:"tiamat",boss:true}});
Monster.create({names : {original:"TIAMAT2", other:{origins:"Tiamat"}}
               ,type : Monster.Types.Dragon
               ,stats : {hp:1100,atk:75,acc:85,hits:4,crt:1,def:90,eva:90,md:200,mor:255}
               ,rewards : {gold:1,exp:2000}
               ,elements : {resists:[Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,magic : {chance:50,order:["BANE","ICE2","LIT2","FIR2"]}
               ,skills : {chance:50,order:["THUNDER","POISON G","BLIZZARD","BLAZE"]}
               ,ui: {size:"fiend",cssClass:"tiamat",boss:true}});
Monster.create({names : {original:"CHAOS", other:{origins:"Chaos"}}
               ,stats : {hp:2000,atk:100,acc:200,hits:2,crt:1,def:100,eva:100,md:200,mor:255}
               ,rewards : {gold:0,exp:0}
               ,specialAttacks : {status:Status.Paralyze, element:Element.Status}
               ,elements : {resists:[Element.Status, Element.PoisonStone, Element.Time, Element.Death, Element.Fire, Element.Ice, Element.Lightning, Element.Earth]}
               ,magic : {chance:50,order:["ICE3","LIT3","SLO2","CUR4","FIR3","ICE2","FAST","NUKE"]}
               ,skills : {chance:50,order:["CRACK","INFERNO","SWIRL","TORNADO"]}
               ,ui: {size:"chaos",cssClass:"chaos",boss:true}});
