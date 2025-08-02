import Composite from '../Composite';
import BaseNode from '../BaseNode';

export default Parallel;

declare namespace Parallel {
    interface IConfig extends Composite.IConfig {
        finishMode?: number;
        returnSuccess?: boolean;
    }
}

declare class Parallel extends Composite {
    constructor(
        config?: Parallel.IConfig,
        nodePool?: BaseNode.NodePoolType
    );
}