import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Bypass;

declare namespace Bypass {
    /**
     * Configuration options for creating a Bypass decorator.
     */
    interface IConfig extends Decorator.IConfig {
    }
}

/**
 * Decorator that bypasses its child.
 */
declare class Bypass extends Decorator {
    /**
     * Create a Bypass decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Bypass.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
