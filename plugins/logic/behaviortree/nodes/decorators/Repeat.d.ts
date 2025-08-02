import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Repeat;

declare namespace Repeat {
    interface IConfig extends Decorator.IConfig {
        maxLoop?: BaseNode.ExpressionValue;
    }
}

declare class Repeat extends Decorator {
    constructor(
        config?: Repeat.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}