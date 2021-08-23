import BuildFuzzyRule from './BuildFuzzyRule';

var BuildFuzzyRules = function (fuzzyModule, rules, fuzzySets) {
    if (typeof (rules) === 'string') {
        rules = rules.split('\n');
    }
    for (var i = 0, cnt = rules.length; i < cnt; i++) {
        var rule = rules[i];
        if (rule.length === 0 || !rule.trim()) {
            continue;
        }
        fuzzyModule.addRule(BuildFuzzyRule(rule, fuzzySets));
    }
}

export default BuildFuzzyRules;