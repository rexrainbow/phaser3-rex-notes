import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default RandomSelector;

declare namespace RandomSelector {
    interface IConfig extends Composite.IConfig {

    }
}

declare class RandomSelector extends Composite {
    constructor(
        config?: RandomSelector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}