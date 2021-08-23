import BuildFuzzyVariable from './BuildFuzzyVariable';

var BuildFuzzyVariables = function (fuzzyModule, variables) {
    for (var name in variables) {
        var flv = BuildFuzzyVariable(variables[name]);
        fuzzyModule.addFLV(name, flv);
    }
}

export default BuildFuzzyVariables;