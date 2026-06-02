var DefaultExpressionTransformHandler = function (source) {
    var expression;
    if (typeof (expression) === 'number') {
        expression = function () {
            return source;
        }
    } else {
        expression = source;
    }
    return source;
}

export default DefaultExpressionTransformHandler;