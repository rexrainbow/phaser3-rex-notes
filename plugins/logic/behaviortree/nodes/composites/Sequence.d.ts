import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Sequence;

declare namespace Sequence {
    /**
     * Configuration options for creating a Sequence node.
     */
    interface IConfig extends Composite.IConfig {

    }
}

/**
 * Composite node that runs children in order.
 */
declare class Sequence extends Composite {
    /**
     * Create a Sequence node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Sequence.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
