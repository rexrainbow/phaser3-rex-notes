class BaseExpression {
    expressionHandler: any;

    setExpressionHandler(callback?: any) {
        this.expressionHandler = callback;
        return this;
    }

    eval(context?: any) {
        return this.expressionHandler(context);
    }
}

export default BaseExpression;