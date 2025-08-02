import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default TimeLimit;

declare namespace TimeLimit {
    interface IConfig extends Decorator.IConfig {
        duration?: BaseNode.ExpressionValue;
        returnSuccess?: boolean;
    }
}

declare class TimeLimit extends Decorator {
    constructor(
        config?: TimeLimit.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}