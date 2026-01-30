import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default IfSelector;

declare namespace IfSelector {
    /**
     * Configuration options for creating an IfSelector node.
     */
    interface IConfig extends Composite.IConfig {
        /**
         * Condition expression.
         */
        expression?: BaseNode.ExpressionValue;
        /**
         * Break evaluation on condition.
         */
        conditionEvalBreak?: boolean;
    }
}

/**
 * Selector that chooses based on a condition.
 */
declare class IfSelector extends Composite {
    /**
     * Create an IfSelector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: IfSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Set the selected child index.
     *
     * @param index - Child index.
     * @returns This IfSelector instance.
     */
    setSelectChildIndex(index: number): this;

    /**
     * Evaluate the condition.
     *
     * @param tick - Tick instance.
     * @returns Child index.
     */
    evalCondition(tick: Tick): number;
}
