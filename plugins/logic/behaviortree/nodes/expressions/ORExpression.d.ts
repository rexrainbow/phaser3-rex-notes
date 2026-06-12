import Expression from '../Expression';
import BaseNode from '../BaseNode';

export default ORExpression;

declare namespace ORExpression {
    /**
     * Configuration options for creating an ORExpression node.
     */
    interface IConfig extends Expression.IConfig {
        /**
         * Ordered expressions. Returns true when any expression is truthy.
         */
        expressions?: BaseNode.ExpressionValue[];
    }
}

/**
 * Logical OR expression with short-circuit evaluation.
 */
declare class ORExpression extends Expression {
    /**
     * Create an ORExpression.
     *
     * @param config - Ordered expressions or configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: BaseNode.ExpressionValue[] | ORExpression.IConfig,
        nodePool?: BaseNode.NodePoolType
    );
}
