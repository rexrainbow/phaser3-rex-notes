import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default SwitchSelector;

declare namespace SwitchSelector {
    /**
     * Configuration options for creating a SwitchSelector node.
     */
    interface IConfig extends Composite.IConfig {
        /**
         * Condition expression.
         */
        expression?: BaseNode.ExpressionValue;
        /**
         * Key list for selection.
         */
        keys?: string[];
        /**
         * Break evaluation on condition.
         */
        conditionEvalBreak?: boolean;
    }
}

/**
 * Selector that switches based on an expression.
 */
declare class SwitchSelector extends Composite {
    /**
     * Create a SwitchSelector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: SwitchSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Set the selected child index or key.
     *
     * @param index - Child index or key.
     * @returns This SwitchSelector instance.
     */
    setSelectChildIndex(index: number | string): this;

    /**
     * Evaluate the condition.
     *
     * @param tick - Tick instance.
     * @returns Child index.
     */
    evalCondition(tick: Tick): number;

}
