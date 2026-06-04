import NumberExpression from './NumberExpression.js';
import IsExpressionLike from '../../utils/IsExpressionLike.js';
import DecodeExpression from '../../utils/DecodeExpression.js';

var StringToNumber = function (value) {
    if (typeof (value) !== 'string') {
        return value;
    }

    var text = value.trim();
    if (text === '') {
        return value;
    }

    var numberValue = Number(text);
    return Number.isFinite(numberValue) ? numberValue : value;
}

var CreateNumberExpression = function (expression, nodePool) {
    expression = DecodeExpression(expression, nodePool);

    if (expression == null) {
        return null;
    }

    // Convert number-string to number
    expression = StringToNumber(expression);

    // Constant number or boolean    
    var expressionType = typeof (expression);
    if ((expressionType === 'number') || (expressionType === 'boolean')) {
        return expression;
    }

    var node;
    if (nodePool && (expressionType === 'string')) {
        // Get node from nodePool
        if (!nodePool.hasOwnProperty(expression)) {
            throw new Error(`BehaviorTree.load: Missing expression node "${expression}"`);
        }
        node = nodePool[expression];

    } else if (IsExpressionLike(expression)) {
        // Is Expression node already
        node = expression;

    } else {
        // 
        node = new NumberExpression(expression);

    }

    return node;
}

export default CreateNumberExpression;
