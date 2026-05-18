import FuzzyModule from './FuzzyModule';
import BuildFuzzyVariables from './variables/BuildFuzzyVariables';
import GetAllFuzzySets from './variables/GetAllFuzzySets';
import BuildFuzzyRules from './rules/BuildFuzzyRules';
import IsInvalidLine from './utils/IsInvalidLine';

var BuildFuzzyModule = function(config?: any) {
    if (typeof (config) === 'string') {
        var variables = [];
        var rules = [];
        var lines = config.split('\n');
        for (var i = 0, cnt = lines.length; i < cnt; i++) {
            var line = lines[i];
            if (IsInvalidLine(line)) {
                continue;
            }
            if (line.indexOf('=>') !== -1) {
                rules.push(line);
            } else {
                variables.push(line);
            }
        }
        config = {
            variables: variables,
            rules: rules
        }
    }

    var fuzzyModule = new FuzzyModule();
    BuildFuzzyVariables(fuzzyModule, config.variables);
    BuildFuzzyRules(fuzzyModule, config.rules, GetAllFuzzySets(fuzzyModule));

    return fuzzyModule;
}

export default BuildFuzzyModule;