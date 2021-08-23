import parser from './parser.js';

const VariableParser = new parser.Parser();
var ParseVariable = function (variableInput) {
    return VariableParser.parse(variableInput);
}

export default ParseVariable;