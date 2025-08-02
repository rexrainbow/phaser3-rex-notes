import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Cooldown;

declare namespace Cooldown {
    interface IConfig extends Decorator.IConfig {
        duration?: BaseNode.ExpressionValue;
    }
}

declare class Cooldown extends Decorator {
    constructor(
        config?: Cooldown.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}