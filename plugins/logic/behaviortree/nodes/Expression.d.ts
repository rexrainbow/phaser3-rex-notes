import Tick from '../tick/Tick';
import BaseNode from './BaseNode';

export default Expression;

declare namespace Expression {
    /**
     * Configuration options for creating an Expression node.
     */
    interface IConfig {
        /**
         * Expression node name.
         */
        name?: string;
        /**
         * Expression node title.
         */
        title?: string;
        /**
         * Custom properties.
         */
        properties?: Record<string, unknown>;
    }
}

/**
 * Base class for expression nodes.
 */
declare class Expression extends BaseNode {
    /**
     * Create an Expression node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Expression.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    eval(tick: Tick): any;

    /**
     * Store the child expression index that determined the last evaluation result.
     *
     * @param tick - Current tick instance.
     * @param index - Child expression index, or -1 when no child caused an early return.
     */
    setLastReturnIndex(tick: Tick, index: number): this;

    /**
     * Get the child expression index that determined the last evaluation result.
     *
     * @param tick - Current tick instance.
     */
    getLastReturnIndex(tick: Tick): number | undefined;
}
