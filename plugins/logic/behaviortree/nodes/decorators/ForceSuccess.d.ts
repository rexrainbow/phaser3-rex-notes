import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ForceSuccess;

declare namespace ForceSuccess {
    /**
     * Configuration options for creating a ForceSuccess decorator.
     */
    interface IConfig extends Decorator.IConfig {
    }
}

/**
 * Decorator that forces success.
 */
declare class ForceSuccess extends Decorator {
    /**
     * Create a ForceSuccess decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: ForceSuccess.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
