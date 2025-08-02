import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ForceSuccess;

declare namespace ForceSuccess {
    interface IConfig extends Decorator.IConfig {
    }
}

declare class ForceSuccess extends Decorator {
    constructor(
        config?: ForceSuccess.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}