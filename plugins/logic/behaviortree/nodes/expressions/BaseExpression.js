class BaseExpression {
    setExpressionHandler(callback) {
        this.expressionHandler = callback;
        return this;
    }

    eval(context) {
        if (typeof (this.expressionHandler) === 'function') {
            return this.expressionHandler(context, this);
        }

        var evalCallback = (context) ? context.evalExpressionObject : null;
        if (evalCallback) {
            return evalCallback(this.expressionHandler, this);
        }

        return this.expressionHandler;
    }
}

export default BaseExpression;
