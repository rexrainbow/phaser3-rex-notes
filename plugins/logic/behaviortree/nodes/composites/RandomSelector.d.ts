import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default RandomSelector;

declare namespace RandomSelector {
    /**
     * Configuration options for creating a RandomSelector node.
     */
    interface IConfig extends Composite.IConfig {

    }
}

/**
 * Selector that chooses a random child.
 */
declare class RandomSelector extends Composite {
    /**
     * Create a RandomSelector node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: RandomSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
