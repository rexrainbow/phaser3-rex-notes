import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default BreakDecorator;

declare namespace BreakDecorator {
    interface IConfig extends Decorator.IConfig {
        tag?: string
    }
}

declare class BreakDecorator extends Decorator {
    constructor(
        config?: BreakDecorator.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}