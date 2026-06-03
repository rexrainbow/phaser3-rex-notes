import NumberExpression from './NumberExpression.js';

var CreateNumberExpression = function (expression, nodePool) {
    if (expression == null) {
        return null;
    }

    var expressionType = typeof (expression);
    if ((expressionType === 'number') || (expressionType === 'boolean')) {
        return expression;
    }

    var node;
    if (nodePool && (expressionType === 'string')) {
        // Pick node from nodePool via nodeId
        if (!nodePool.hasOwnProperty(expression)) {
            throw new Error(`BehaviorTree.load: Missing expression node "${expression}"`);
        }
        node = nodePool[expression];

    } else if (expression && typeof (expression.eval) === 'function') {
        // Is Expression node already
        node = expression;

    } else {
        node = new NumberExpression(expression);

    }

    return node;
}

export default CreateNumberExpression;
