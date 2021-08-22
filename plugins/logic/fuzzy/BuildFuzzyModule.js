import { FuzzyModule } from 'yuka/build/yuka.module';
import BuildFuzzyVariable from './BuildFuzzyVariable';
import BuildFuzzyRule from './BuildFuzzyRule';

var BuildFuzzyModule = function (config) {
    var fuzzyModule = new FuzzyModule();

    var fuzzySets = {};
    // Build FLV, and fuzzySets
    var variables = config.variables;
    for (var flvName in variables) {
        var setsConfig = variables[flvName];
        var flv = BuildFuzzyVariable(setsConfig);
        fuzzyModule.addFLV(flvName, flv);

        for (var i = 0, cnt = setsConfig.length; i < cnt; i++) {
            var setName = `${flvName}${setsConfig[i][0]}`;
            fuzzySets[setName] = flv.fuzzySets[i];
        }
    }

    // Build rule
    var rules = config.rules;
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

    return fuzzyModule;
}

export default BuildFuzzyModule;