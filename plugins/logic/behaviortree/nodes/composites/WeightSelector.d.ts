import Composite from '../Composite';
import BaseNode from '../BaseNode';
import Tick from '../../tick/Tick';

export default WeightSelector;

declare namespace WeightSelector {
    /**
     * Configuration options for creating a WeightSelector node.
     */
    interface IConfig extends Composite.IConfig {
        /**
         * Expression used to select weight.
         */
        expression?: BaseNode.ExpressionValue;
        /**
         * Weight list for children.
         */
        weights?: number[];
        /**
         * Break evaluation on condition.
         */
        conditionEvalBreak?: boolean;
    }
}

/**
 * Selector that chooses by weight.
 */
declare class WeightSelector extends Composite {
    /**
     * Create a WeightSelector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: WeightSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Set the selected child index.
     *
     * @param index - Child index.
     * @returns This WeightSelector instance.
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
