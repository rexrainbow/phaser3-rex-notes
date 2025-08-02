import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Invert;

declare namespace Invert {
    interface IConfig extends Decorator.IConfig {
    }
}

declare class Invert extends Decorator {
    constructor(
        config?: Invert.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}