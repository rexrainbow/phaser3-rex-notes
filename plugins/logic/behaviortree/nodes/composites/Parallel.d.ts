import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Parallel;

declare namespace Parallel {
    /**
     * Configuration options for creating a Parallel node.
     */
    interface IConfig extends Composite.IConfig {
        /**
         * Finish mode value.
         */
        finishMode?: number;
        /**
         * Return success when finished.
         */
        returnSuccess?: boolean;
    }
}

/**
 * Composite node that runs children in parallel.
 */
declare class Parallel extends Composite {
    /**
     * Create a Parallel node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Parallel.IConfig,
        nodePool?: BaseNode.NodePoolType
    );
}
