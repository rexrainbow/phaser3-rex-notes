import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Sequence;

declare namespace Sequence {
    interface IConfig extends Composite.IConfig {

    }
}

declare class Sequence extends Composite {
    constructor(
        config?: Sequence.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}