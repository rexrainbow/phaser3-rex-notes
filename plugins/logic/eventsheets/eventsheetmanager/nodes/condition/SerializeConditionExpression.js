var SerializeConditionExpression = function (expression) {
    if (expression == null) {
        return expression;
    }

    if (Array.isArray(expression)) {
        return expression.map(SerializeConditionExpression);
    }

    var expressionType = typeof (expression);
    if ((expressionType === 'string') ||
        (expressionType === 'number') ||
        (expressionType === 'boolean')) {
        return expression;
    }

    if (expression.properties && (expression.properties.expression !== undefined)) {
        return expression.properties.expression;
    }

    if (expression.name === 'ParameterExpression') {
        var parameters = {};
        var expressions = expression.expressions || {};
        for (var key in expressions) {
            parameters[key] = SerializeConditionExpression(expressions[key]);
        }

        return {
            name: expression.properties.name,
            parameters: parameters,
        };
    }

    if (expression.expression !== undefined) {
        return expression.expression;
    }

    return expression.name || expressionType;
}

export default SerializeConditionExpression;
