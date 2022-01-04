import ExpressionParser from '../../../math/expressionparser/ExpressionParser.js';

var parser = new ExpressionParser();
var CreateTestFunction = function (expression) {
    return parser.compile(expression);
};

export default CreateTestFunction;