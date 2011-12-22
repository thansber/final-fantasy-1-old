// Start game
new Map.Transition("start", Map.WORLD_MAP, {y:0, x:0}, {y:165, x:153});

// World map -> towns
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:160, x:151});
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:161, x:151});
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:162, x:151});
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:160, x:154});
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:161, x:154});
new Map.Transition(Map.WORLD_MAP, Map.CONERIA, {y:162, x:154});
new Map.Transition(Map.WORLD_MAP, Map.PRAVOKA, {y:150, x:209});
new Map.Transition(Map.WORLD_MAP, Map.PRAVOKA, {y:150, x:211});
new Map.Transition(Map.WORLD_MAP, Map.PRAVOKA, {y:149, x:210});
new Map.Transition(Map.WORLD_MAP, Map.ELFLAND, {y:221, x:134});
new Map.Transition(Map.WORLD_MAP, Map.ELFLAND, {y:222, x:134});
new Map.Transition(Map.WORLD_MAP, Map.ELFLAND, {y:221, x:137});
new Map.Transition(Map.WORLD_MAP, Map.ELFLAND, {y:222, x:137});
new Map.Transition(Map.WORLD_MAP, Map.MELMOND, {y:159, x:81});
new Map.Transition(Map.WORLD_MAP, Map.MELMOND, {y:160, x:81}); 
new Map.Transition(Map.WORLD_MAP, Map.MELMOND, {y:160, x:82}); 
new Map.Transition(Map.WORLD_MAP, Map.CRESCENT_LAKE, {y:216, x:219});
new Map.Transition(Map.WORLD_MAP, Map.CRESCENT_LAKE, {y:216, x:220});
new Map.Transition(Map.WORLD_MAP, Map.CRESCENT_LAKE, {y:217, x:218});
new Map.Transition(Map.WORLD_MAP, Map.CRESCENT_LAKE, {y:217, x:220});
new Map.Transition(Map.WORLD_MAP, Map.CRESCENT_LAKE, {y:218, x:218});
new Map.Transition(Map.WORLD_MAP, Map.ONRAC, {y:57, x:61});
new Map.Transition(Map.WORLD_MAP, Map.ONRAC, {y:57, x:62});
new Map.Transition(Map.WORLD_MAP, Map.ONRAC, {y:58, x:61});
new Map.Transition(Map.WORLD_MAP, Map.ONRAC, {y:58, x:62});
new Map.Transition(Map.WORLD_MAP, Map.GAIA, {y:28, x:221});
new Map.Transition(Map.WORLD_MAP, Map.GAIA, {y:28, x:222});
new Map.Transition(Map.WORLD_MAP, Map.LEFEIN, {y:98, x:235});
new Map.Transition(Map.WORLD_MAP, Map.LEFEIN, {y:99, x:234});
new Map.Transition(Map.WORLD_MAP, Map.LEFEIN, {y:99, x:235});
new Map.Transition(Map.WORLD_MAP, Map.LEFEIN, {y:99, x:236});

// Towns -> world map
new Map.Transition(Map.CONERIA, Map.WORLD_MAP);
new Map.Transition(Map.PRAVOKA, Map.WORLD_MAP);
new Map.Transition(Map.ELFLAND, Map.WORLD_MAP);
new Map.Transition(Map.MELMOND, Map.WORLD_MAP);
new Map.Transition(Map.CRESCENT_LAKE, Map.WORLD_MAP);
new Map.Transition(Map.ONRAC, Map.WORLD_MAP);
new Map.Transition(Map.GAIA, Map.WORLD_MAP);
new Map.Transition(Map.LEFEIN, Map.WORLD_MAP);