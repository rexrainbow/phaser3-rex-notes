import BuildFuzzyModule from '../../plugins/fuzzy.js';

var fuzzyModuleConfig = `
// Health point
HP-   : 0, 0.25, 0.5
HP    : 0.25, 0.5, 0.75
HP+   : 0.5, 0.75, 1

// Aggressive 
AGG-  : 0, 0.25, 0.5
AGG   : 0.25, 0.5, 0.75
AGG+  : 0.5, 0.75, 1

// Attack
ATK-  : 0, 0.25, 0.5
ATK   : 0.25, 0.5, 0.75
ATK+  : 0.5, 0.75, 1

// Heal
HEAL- : 0, 0.25, 0.5
HEAL  : 0.25, 0.5, 0.75
HEAL+ : 0.5, 0.75, 1

// Rules
// Heal
HP-          => HEAL+
HP and AGG-  => HEAL
HP+ and AGG- => HEAL-

// Attack
HP+ or AGG+   => ATK+
HP and AGG    => ATK
HP- and AGG-  => ATK-
`;

var fuzzyModule = BuildFuzzyModule(fuzzyModuleConfig);

var result;

result = fuzzyModule
    .fuzzify({
        HP: 0.35,
        AGG: 0.5
    })
    .defuzzify(['HEAL', 'ATK']);

console.log(`HEAL=${result.HEAL}, ATK=${result.ATK}`);

result = fuzzyModule
    .fuzzify({
        HP: 0.35,
        AGG: 0.75
    })
    .defuzzify(['HEAL', 'ATK']);

console.log(`HEAL=${result.HEAL}, ATK=${result.ATK}`);