import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Cooldown;

declare namespace Cooldown {
    /**
     * Configuration options for creating a Cooldown decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Duration expression.
         */
        duration?: BaseNode.ExpressionValue;
    }
}

/**
 * Decorator that adds a cooldown period.
 */
declare class Cooldown extends Decorator {
    /**
     * Create a Cooldown decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Cooldown.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
