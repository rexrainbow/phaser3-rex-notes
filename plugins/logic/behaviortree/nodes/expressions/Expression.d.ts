import BaseExpression from './BaseExpression';

export default Expression;

declare namespace Expression {
    type ContextType = BaseExpression.ContextType;
}

declare class Expression extends BaseExpression {
    constructor(expression: string | number);
}