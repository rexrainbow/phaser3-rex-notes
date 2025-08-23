import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default ShuffleSelector;

declare namespace ShuffleSelector {
    interface IConfig extends Composite.IConfig {

    }
}

declare class ShuffleSelector extends Composite {
    constructor(
        config?: ShuffleSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}