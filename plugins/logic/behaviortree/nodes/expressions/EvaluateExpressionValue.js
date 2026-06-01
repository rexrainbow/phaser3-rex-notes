import Compile from '../../../../math/expressionparser/utils/Complile.js';

var StringExpressionCache = new Map();

var GetCompiledStringExpression = function (expression) {
    var callback = StringExpressionCache.get(expression);
    if (!callback) {
        callback = Compile(expression);
        StringExpressionCache.set(expression, callback);
    }
    return callback;
};

var EvaluateExpressionValue = function (value, context) {
    switch (typeof (value)) {
        case 'function':
            return value(context);

        case 'string':
            return GetCompiledStringExpression(value)(context);

        default:
            if (
                value &&
                context &&
                (typeof (value) === 'object') &&
                (typeof (context.evalExpressionObject) === 'function')
            ) {
                return context.evalExpressionObject(value);
            }
            return value;
    }
};

export default EvaluateExpressionValue;
