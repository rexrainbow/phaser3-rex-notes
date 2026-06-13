import {
    CreateNumberExpression,
    CreateStringExpression,
} from '../../../../behaviortree/nodes/expressions/index.js';

var CreateExpressions = function (parentNode, nodePool, parameters) {
    var expression;
    for (var name in parameters) {
        // Number/String Expression nodes, or constant number/boolean/string values
        expression = CreateExpression(parameters[name], nodePool);
        parentNode.addExpression(name, expression);
    }
}

var CreateExpression = function (expression, nodePool) {
    if (typeof (expression) !== 'string') {
        return expression;
    }

    // Expression Node, string, number, boolean
    if (typeof (expression) === 'string') {
        if (IsNumberExpressionString(expression)) {
            // Is a number
            expression = RemoveNumberExpressionWrapper(expression);
            expression = CreateNumberExpression(expression, nodePool);

        } else if (IsStringExpressionString(expression)) {
            // Might be a string tempate
            expression = CreateStringExpression(expression, nodePool);

        }
        // else : Constant string
    }
    return expression;
}

var IsNumberExpressionString = function (s) {
    return s.startsWith('#(') && s.endsWith(')')
}

var IsStringExpressionString = function (s) {
    return (s.indexOf('{{') > -1) && (s.indexOf('}}') > -1)
}

var RemoveNumberExpressionWrapper = function (s) {
    return s.substring(2, s.length - 1);
}


export default CreateExpressions;
