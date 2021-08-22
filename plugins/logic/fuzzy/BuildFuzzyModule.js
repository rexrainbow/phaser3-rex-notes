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
    for (var i = 0, cnt = rules.length; i < cnt; i++) {
        var rule = BuildFuzzyRule(rules[i], fuzzySets);
        fuzzyModule.addRule(rule);
    }

    return fuzzyModule;
}

export default BuildFuzzyModule;