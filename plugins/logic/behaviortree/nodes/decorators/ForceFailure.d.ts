import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ForceFailure;

declare namespace ForceFailure {
    /**
     * Configuration options for creating a ForceFailure decorator.
     */
    interface IConfig extends Decorator.IConfig {
    }
}

/**
 * Decorator that forces failure.
 */
declare class ForceFailure extends Decorator {
    /**
     * Create a ForceFailure decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: ForceFailure.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
