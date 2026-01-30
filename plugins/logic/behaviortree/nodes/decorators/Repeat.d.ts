import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Repeat;

declare namespace Repeat {
    /**
     * Configuration options for creating a Repeat decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Maximum loop count expression.
         */
        maxLoop?: BaseNode.ExpressionValue;
    }
}

/**
 * Decorator that repeats its child.
 */
declare class Repeat extends Decorator {
    /**
     * Create a Repeat decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Repeat.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
