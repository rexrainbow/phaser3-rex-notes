import NumberExpression from './NumberExpression.js';

var CreateNumberExpression = function (expression, nodePool) {
    if (expression == null) {
        return null;
    }

    var node;
    if (expression && typeof (expression.eval) === 'function') {
        // Is Expression node already
        node = expression;

    } else if (nodePool && (typeof (expression) === 'string') && nodePool[expression]) {
        // Pick node from nodePool via nodeId
        node = nodePool[expression];

    } else {
        node = new NumberExpression(expression);

    }

    return node;
}

export default CreateNumberExpression;
