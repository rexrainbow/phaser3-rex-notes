import { FuzzyRule } from '../../../utils/yuka/fuzzy/FuzzyRule.js';
import { FuzzyAND } from '../../../utils/yuka/fuzzy/operators/FuzzyAND.js';
import { FuzzyOR } from '../../../utils/yuka/fuzzy/operators/FuzzyOR.js';
import { FuzzyFAIRLY } from '../../../utils/yuka/fuzzy/operators/FuzzyFAIRLY.js'
import { FuzzyVERY } from '../../../utils/yuka/fuzzy/operators/FuzzyVERY.js'
import Parse from '../utils/parser/Parse';

var BuildFuzzyRule = function (ruleInput, fuzzySets) {
    var ruleJson = Parse(ruleInput);
    var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
    var consequence = fuzzySets[ruleJson[2]];
    var rule = new FuzzyRule(antecedent, consequence);
    return rule;
}

var BuildFuzzyCompositeTerm = function (terms, fuzzySets) {
    // terms: undefined, string, or array
    if (!terms) {
        return null;
    } else if (typeof (terms) === 'string') {
        return fuzzySets[terms];
    }

    // Array
    var operations = [];
    for (var i = 1, cnt = terms.length; i < cnt; i++) {
        operations.push(BuildFuzzyCompositeTerm(terms[i], fuzzySets));
    }
    var operatorClass = OperatorClasses[terms[0]];
    var rule = new operatorClass(...operations);
    return rule;
}

const OperatorClasses = {
    and: FuzzyAND,
    or: FuzzyOR,
    fairly: FuzzyFAIRLY,
    very: FuzzyVERY
}

export default BuildFuzzyRule;