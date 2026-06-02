import Expression from './Expression.js';

class BooleanExpression extends Expression {
    runEvaluationPipeline(source, transformSourceHandler, compile, context) {
        return !!super.runEvaluationPipeline(source, transformSourceHandler, compile, context);
    }
}

export default BooleanExpression;
