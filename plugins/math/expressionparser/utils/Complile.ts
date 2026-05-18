import ExpressionParser from '../ExpressionParser';

var parser = new ExpressionParser();
var Compile = function(expression?: any) {
    return parser.compile(expression);
}

export default Compile;