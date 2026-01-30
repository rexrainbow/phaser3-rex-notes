import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default BreakDecorator;

declare namespace BreakDecorator {
    /**
     * Configuration options for creating a BreakDecorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Tag value to match.
         */
        tag?: string
    }
}

/**
 * Decorator that breaks on tag match.
 */
declare class BreakDecorator extends Decorator {
    /**
     * Create a BreakDecorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: BreakDecorator.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
