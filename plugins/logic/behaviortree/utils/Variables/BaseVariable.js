class BaseVariable {
    setExpressionHandler(callback) {
        this.expressionHandler = callback;
        return this;
    }

    eval(context) {
        return this.expressionHandler(context);
    }
}

export default BaseVariable;