import Expression from '../Expression';
import BaseNode from '../BaseNode';

export default NOTExpression;

declare namespace NOTExpression {
    /**
     * Configuration options for creating a NOTExpression node.
     */
    interface IConfig extends Expression.IConfig {
        /**
         * Expression to invert.
         */
        expression?: BaseNode.ExpressionValue;
    }
}

/**
 * Logical NOT expression.
 */
declare class NOTExpression extends Expression {
    /**
     * Create a NOTExpression.
     *
     * @param config - Expression value or configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: BaseNode.ExpressionValue | NOTExpression.IConfig,
        nodePool?: BaseNode.NodePoolType
    );
}
