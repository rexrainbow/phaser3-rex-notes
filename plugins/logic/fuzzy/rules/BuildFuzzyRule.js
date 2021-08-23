import { FuzzyRule, FuzzyAND, FuzzyOR } from 'yuka/build/yuka.module';
import ParseRule from './ruleparser/ParseRule';

var BuildFuzzyRule = function (ruleInput, fuzzySets) {
    var ruleJson = ParseRule(ruleInput);
    var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
    var consequence = fuzzySets[ruleJson[2]];
    var rule = new FuzzyRule(antecedent, consequence);
    return rule;
}

var BuildFuzzyCompositeTerm = function (compositeTerm, fuzzySets) {
    if (typeof (compositeTerm) === 'string') {
        return fuzzySets[compositeTerm];
    }

    var op0 = compositeTerm[1],
        op1 = compositeTerm[2];
    if (typeof (op0) === 'string') {
        op0 = fuzzySets[op0];
    } else if (op0) {
        op0 = BuildFuzzyCompositeTerm(op0, fuzzySets);
    }
    if (typeof (op1) === 'string') {
        op1 = fuzzySets[op1];
    } else if (op1) {
        op1 = BuildFuzzyCompositeTerm(op1, fuzzySets);
    }

    var compositeTerm;
    switch (compositeTerm[0]) {
        case 'and': compositeTerm = new FuzzyAND(op0, op1); break;
        case 'or': compositeTerm = new FuzzyOR(op0, op1); break;
    }
    return compositeTerm;
}

export default BuildFuzzyRule;