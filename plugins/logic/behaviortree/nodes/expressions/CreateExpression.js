import StringToNumber from '../../utils/StringToNumber.js';
import NumberExpression from './NumberExpression.js';
import StringExpression from './StringExpression.js';
import ANDExpression from './ANDExpression.js';
import ORExpression from './ORExpression.js';
import NOTExpression from './NOTExpression.js';
import IsExpressionLike from '../../utils/IsExpressionLike.js';
import DecodeExpression from '../../utils/DecodeExpression.js';
import ResolveNode from '../../behaviortree/dump/ResolveNode.js';

var IsPlainObject = function (value) {
    return value &&
        (typeof (value) === 'object') &&
        !Array.isArray(value) &&
        !IsExpressionLike(value);
}

var HasOwnProperty = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

var IsLogicExpressionConfig = function (expression) {
    return IsPlainObject(expression) &&
        (HasOwnProperty(expression, 'and') ||
            HasOwnProperty(expression, 'all') ||
            HasOwnProperty(expression, 'or') ||
            HasOwnProperty(expression, 'any') ||
            HasOwnProperty(expression, 'not'));
}

var CreateLogicExpression = function (expression, nodePool) {
    expression = DecodeExpression(expression, nodePool);

    if (!IsLogicExpressionConfig(expression)) {
        return null;
    }

    if (HasOwnProperty(expression, 'and') || HasOwnProperty(expression, 'all')) {
        var andExpressions = expression.and || expression.all || [];
        return new ANDExpression({
            expressions: andExpressions.map(function (child) {
                return CreateNumberExpression(child, nodePool);
            })
        });
    }

    if (HasOwnProperty(expression, 'or') || HasOwnProperty(expression, 'any')) {
        var orExpressions = expression.or || expression.any || [];
        return new ORExpression({
            expressions: orExpressions.map(function (child) {
                return CreateNumberExpression(child, nodePool);
            })
        });
    }

    return new NOTExpression({
        expression: CreateNumberExpression(expression.not, nodePool)
    });
}

var CreateNumberExpression = function (expression, nodePool) {
    expression = DecodeExpression(expression, nodePool);

    if (expression == null) {
        return null;
    }

    if (IsLogicExpressionConfig(expression)) {
        return CreateLogicExpression(expression, nodePool);
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
        node = ResolveNode(expression, nodePool, undefined, 'expression node');

    } else if (IsExpressionLike(expression)) {
        // Is Expression node already
        node = expression;

    } else {
        // Create new number expression object
        node = new NumberExpression(expression);

    }

    return node;
}

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

export {
    CreateNumberExpression,
    CreateStringExpression,
    CreateLogicExpression,
}
