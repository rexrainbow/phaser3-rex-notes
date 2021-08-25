import BuildFuzzyVariable from './BuildFuzzyVariable';
import Parse from '../utils/parser/Parse';
import IsInvalidLine from '../utils/IsInvalidLine';

var BuildFuzzyVariables = function (fuzzyModule, variables) {
    // String -> FuzzySets array
    if (typeof (variables) === 'string') {
        variables = variables.split('\n');
    }

    // FuzzySets array -> Variables dictionary
    if (Array.isArray(variables)) {  // Fuzzy sets in array
        var lines = variables;
        variables = [];
        for (var i = 0, cnt = lines.length; i < cnt; i++) {
            var line = lines[i];
            if (typeof (line) !== 'string') {
                variables.push(line);
                continue;
            }

            // Fuzzy set might be string
            if (IsInvalidLine(line)) {
                continue;
            }
            variables.push(Parse(line));
        }
        // Bind fuzzy set to variables
        variables = BindFuzzySets(variables);
    }

    for (var name in variables) {
        var flv = BuildFuzzyVariable(variables[name]);
        fuzzyModule.addFLV(name, flv);
    }
}

var BindFuzzySets = function (fuzzySets) {
    var variables = {};
    for (var i = 0, cnt = fuzzySets.length; i < cnt; i++) {
        var fuzzySet = fuzzySets[i];
        var variableName = GetVariableName(fuzzySet[0]);
        if (!variables.hasOwnProperty(variableName)) {
            variables[variableName] = [];
        }
        variables[variableName].push(fuzzySet);
    }
    return variables;
}

var GetVariableName = function (setName) {
    if (setName.indexOf('.') !== -1) {
        return setName.split('.')[0];
    } else {
        return setName.replace(/[+-]*/g, '')
    }
}

export default BuildFuzzyVariables;