import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Bypass;

declare namespace Bypass {
    interface IConfig extends Decorator.IConfig {
    }
}

declare class Bypass extends Decorator {
    constructor(
        config?: Bypass.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}