import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default ShuffleSelector;

declare namespace ShuffleSelector {
    /**
     * Configuration options for creating a ShuffleSelector node.
     */
    interface IConfig extends Composite.IConfig {

    }
}

/**
 * Selector that shuffles children before selection.
 */
declare class ShuffleSelector extends Composite {
    /**
     * Create a ShuffleSelector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: ShuffleSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
