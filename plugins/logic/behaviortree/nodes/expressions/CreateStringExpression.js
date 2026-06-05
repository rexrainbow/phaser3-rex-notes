import StringExpression from './StringExpression.js';
import IsExpressionLike from '../../utils/IsExpressionLike.js';
import DecodeExpression from '../../utils/DecodeExpression.js';
import ResolveNode from '../../behaviortree/dump/ResolveNode.js';

var CreateStringExpression = function (expression, nodePool) {
    expression = DecodeExpression(expression, nodePool);

    if (expression == null) {
        return null;
    }

    var expressionType = typeof (expression);

    var node;
    if (nodePool && (expressionType === 'string')) {
        // Get node from nodePool
        node = ResolveNode(expression, nodePool, undefined, 'expression node');

    } else if (IsExpressionLike(expression)) {
        // Is Expression node already
        node = expression;

    } else {
        // Create new string expression object
        node = new StringExpression(expression);

    }

    return node;
}

export default CreateStringExpression;
