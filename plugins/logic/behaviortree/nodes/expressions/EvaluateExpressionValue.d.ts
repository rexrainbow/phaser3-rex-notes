import BaseExpression from './BaseExpression';

export default EvaluateExpressionValue;

declare function EvaluateExpressionValue(
    value: unknown,
    context?: BaseExpression.ContextType
): any;
