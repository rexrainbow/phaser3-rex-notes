import Expression from '../Expression';
import BaseNode from '../BaseNode';

export default ANDExpression;

declare namespace ANDExpression {
    /**
     * Configuration options for creating an ANDExpression node.
     */
    interface IConfig extends Expression.IConfig {
        /**
         * Ordered expressions. Returns true only when every expression is truthy.
         */
        expressions?: BaseNode.ExpressionValue[];
    }
}

/**
 * Logical AND expression with short-circuit evaluation.
 */
declare class ANDExpression extends Expression {
    /**
     * Create an ANDExpression.
     *
     * @param config - Ordered expressions or configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: BaseNode.ExpressionValue[] | ANDExpression.IConfig,
        nodePool?: BaseNode.NodePoolType
    );
}
