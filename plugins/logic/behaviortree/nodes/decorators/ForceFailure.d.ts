import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ForceFailure;

declare namespace ForceFailure {
    interface IConfig extends Decorator.IConfig {
    }
}

declare class ForceFailure extends Decorator {
    constructor(
        config?: ForceFailure.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}