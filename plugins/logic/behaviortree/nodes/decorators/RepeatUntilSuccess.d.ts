import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default RepeatUntilSuccess;

declare namespace RepeatUntilSuccess {
    /**
     * Configuration options for creating a RepeatUntilSuccess decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Maximum loop count expression.
         */
        maxLoop?: BaseNode.ExpressionValue;
    }
}

/**
 * Decorator that repeats until success.
 */
declare class RepeatUntilSuccess extends Decorator {
    /**
     * Create a RepeatUntilSuccess decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: RepeatUntilSuccess.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
