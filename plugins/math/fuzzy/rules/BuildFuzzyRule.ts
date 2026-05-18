import  FuzzyRule  from './FuzzyRule';
import  FuzzyAND  from './operators/FuzzyAND';
import  FuzzyOR  from './operators/FuzzyOR';
import  FuzzyFAIRLY  from './operators/FuzzyFAIRLY'
import  FuzzyVERY  from './operators/FuzzyVERY'
import Parse from '../utils/parser/Parse';

var BuildFuzzyRule = function(ruleInput?: any, fuzzySets?: any) {
    var ruleJson = Parse(ruleInput);
    var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
    var consequence = fuzzySets[ruleJson[2]];
    var rule = new FuzzyRule(antecedent, consequence);
    return rule;
}

var BuildFuzzyCompositeTerm = function(terms?: any, fuzzySets?: any) {
    // terms: undefined, string, or array
    if (!terms) {
        return null;
    } else if (typeof (terms) === 'string') {
        if (!fuzzySets.hasOwnProperty(terms)) {
            throw `Can't find fuzzy set ${terms}`;
        }
        return fuzzySets[terms];
    }

    // Array
    var operations = [];
    for (var i = 1, cnt = terms.length; i < cnt; i++) {
        operations.push(BuildFuzzyCompositeTerm(terms[i], fuzzySets));
    }
    var operatorClass = OperatorClasses[terms[0]];
    var operator = new operatorClass(...operations);
    return operator;
}

const OperatorClasses = {
    and: FuzzyAND,
    or: FuzzyOR,
    fairly: FuzzyFAIRLY,
    very: FuzzyVERY
}

export default BuildFuzzyRule;