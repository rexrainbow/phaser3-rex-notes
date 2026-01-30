import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default TimeLimit;

declare namespace TimeLimit {
    /**
     * Configuration options for creating a TimeLimit decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Duration expression.
         */
        duration?: BaseNode.ExpressionValue;
        /**
         * Return success when time is exceeded.
         */
        returnSuccess?: boolean;
    }
}

/**
 * Decorator that limits execution time.
 */
declare class TimeLimit extends Decorator {
    /**
     * Create a TimeLimit decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: TimeLimit.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
