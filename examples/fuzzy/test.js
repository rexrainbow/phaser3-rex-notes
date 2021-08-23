import BuildFuzzyModule from '../../plugins/logic/fuzzy/BuildFuzzyModule.js';

var fuzzyModule = BuildFuzzyModule({
    variables: `
        // A
        A- : 0, 0.25, 0.5
        A  : 0.25, 0.5, 0.75
        A+ : 0.5, 0.75, 1

        // B
        B- : 0, 0.25, 0.5
        B  : 0.25, 0.5, 0.75
        B+ : 0.5, 0.75, 1

        // C
        C- : 0, 0.25, 0.5
        C  : 0.25, 0.5, 0.75
        C+ : 0.5, 0.75, 1
    `,
    rules: `
        A- AND B- => C-
        A AND B- => C-
        A+ AND B- => C
        A+ AND B => C
        A+ AND B+ => C+

        // TODO
    `
})

fuzzyModule
    .fuzzify('A', 0.5)
    .fuzzify('B', 0.75)

console.log(fuzzyModule.defuzzify('C'));

fuzzyModule
    .fuzzify('A', 1)
    .fuzzify('B', 0.8)

console.log(fuzzyModule.defuzzify('C'));