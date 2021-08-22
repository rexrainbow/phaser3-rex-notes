import BuildFuzzyModule from '../../plugins/logic/fuzzy/BuildFuzzyModule.js';

var fuzzyModule = BuildFuzzyModule({
    variables: {
        A: [
            ['-', 0, 0.25, 0.5],
            ['', 0.25, 0.5, 0.75],
            ['+', 0.5, 0.75, 1]
        ],
        B: [
            ['-', 0, 0.25, 0.5],
            ['', 0.25, 0.5, 0.75],
            ['+', 0.5, 0.75, 1]
        ],
        C: [
            ['-', 0, 0.25, 0.5],
            ['', 0.25, 0.5, 0.75],
            ['+', 0.5, 0.75, 1]
        ],
    },
    rules: `
        A- AND B- => C-
        A AND B- => C-
        A+ AND B- => C
        A+ AND B => C
        A+ AND B+ => C+
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