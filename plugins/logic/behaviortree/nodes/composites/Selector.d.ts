import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Selector;

declare namespace Selector {
    interface IConfig extends Composite.IConfig {

    }
}

declare class Selector extends Composite {
    constructor(
        config?: Selector.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}