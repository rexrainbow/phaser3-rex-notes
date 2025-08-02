import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Limiter;

declare namespace Limiter {
    interface IConfig extends Decorator.IConfig {
        maxLoop?: BaseNode.ExpressionValue;
    }
}

declare class Limiter extends Decorator {
    constructor(
        config?: Limiter.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}