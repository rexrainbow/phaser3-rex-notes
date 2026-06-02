class BaseExpression {
    constructor(source) {
        this.setSource(source);
        this.lastValue = undefined;
    }

    setSource(source) {
        this.source = source;
        return this;
    }

    runEvaluationPipeline(source, transformSourceHandler, compile, context) {
        if (source === undefined) {
            source = this.source;
        }

        var expression = (transformSourceHandler) ? transformSourceHandler(source) : source;

        var callback;
        if (typeof (expression) === 'string') {
            callback = compile(expression);
        } else {
            callback = expression;
        }

        var value = callback(context);

        this.lastValue = value;

        return value;
    }
}

export default BaseExpression;
