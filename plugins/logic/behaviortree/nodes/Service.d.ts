import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Service;

declare namespace Service {
    interface IConfig extends BaseNode.IConfig {
        interval?: BaseNode.ExpressionValue;
        randomDeviation?: BaseNode.ExpressionValue;
    }
}

declare class Service {
    constructor(config?: Service.IConfig);

    canTick(tick: Tick): boolean;
}
