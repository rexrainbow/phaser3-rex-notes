import Expression from './Expression';

export default BooleanExpression;

declare namespace BooleanExpression {
    type ContextType = Expression.ContextType;
}

declare class BooleanExpression extends Expression {
    eval(context: BooleanExpression.ContextType): boolean;
}