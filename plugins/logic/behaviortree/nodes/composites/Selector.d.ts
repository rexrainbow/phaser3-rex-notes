import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Selector;

declare namespace Selector {
    /**
     * Configuration options for creating a Selector node.
     */
    interface IConfig extends Composite.IConfig {

    }
}

/**
 * Composite node that selects the first successful child.
 */
declare class Selector extends Composite {
    /**
     * Create a Selector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Selector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
