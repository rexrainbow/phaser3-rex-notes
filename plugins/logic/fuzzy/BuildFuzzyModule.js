import { FuzzyModule } from 'yuka/build/yuka.module';
import BuildFuzzyVariables from './variables/BuildFuzzyVariables.js';
import GetFuzzySets from './variables/GetFuzzySets.js';
import BuildFuzzyRules from './rules/BuildFuzzyRules.js';

var BuildFuzzyModule = function (config) {
    var fuzzyModule = new FuzzyModule();

    BuildFuzzyVariables(fuzzyModule, config.variables);
    BuildFuzzyRules(fuzzyModule, config.rules, GetFuzzySets(fuzzyModule));

    return fuzzyModule;
}

export default BuildFuzzyModule;