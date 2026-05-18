import Expression from './Expression';

class BooleanExpression extends Expression {
    eval(context?: any) {
        return !!super.eval(context);
    }
}

export default BooleanExpression;