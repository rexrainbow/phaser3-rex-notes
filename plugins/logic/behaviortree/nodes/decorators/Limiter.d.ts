import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Limiter;

declare namespace Limiter {
    /**
     * Configuration options for creating a Limiter decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Maximum loop count expression.
         */
        maxLoop?: BaseNode.ExpressionValue;
    }
}

/**
 * Decorator that limits repetitions.
 */
declare class Limiter extends Decorator {
    /**
     * Create a Limiter decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Limiter.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
