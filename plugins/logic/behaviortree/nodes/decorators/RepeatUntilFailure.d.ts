import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default RepeatUntilFailure;

declare namespace RepeatUntilFailure {
    /**
     * Configuration options for creating a RepeatUntilFailure decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Maximum loop count expression.
         */
        maxLoop?: BaseNode.ExpressionValue;
        /**
         * Return success when finished.
         */
        returnSuccess?: boolean;
    }
}

/**
 * Decorator that repeats until failure.
 */
declare class RepeatUntilFailure extends Decorator {
    /**
     * Create a RepeatUntilFailure decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: RepeatUntilFailure.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
