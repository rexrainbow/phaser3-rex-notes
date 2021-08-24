import parser from './parser.js';

const RuleParser = new parser.Parser();
var ParseRule = function (ruleInput) {
    return RuleParser.parse(ruleInput);
}

export default ParseRule;