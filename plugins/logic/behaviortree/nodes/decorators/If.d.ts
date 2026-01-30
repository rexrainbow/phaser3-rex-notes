import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default If;

declare namespace If {
    /**
     * Configuration options for creating an If decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Condition expression.
         */
        expression?: BaseNode.ExpressionValue;
        /**
         * Break evaluation on condition.
         */
        conditionEvalBreak?: boolean;
        /**
         * State to return on failure.
         */
        onFailState?: number;
    }
}

/**
 * Decorator that runs child when condition passes.
 */
declare class If extends Decorator {
    /**
     * Create an If decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: If.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
