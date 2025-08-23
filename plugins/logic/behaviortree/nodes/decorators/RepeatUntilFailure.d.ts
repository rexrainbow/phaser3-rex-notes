import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default RepeatUntilFailure;

declare namespace RepeatUntilFailure {
    interface IConfig extends Decorator.IConfig {
        maxLoop?: BaseNode.ExpressionValue;
        returnSuccess?: boolean;
    }
}

declare class RepeatUntilFailure extends Decorator {
    constructor(
        config?: RepeatUntilFailure.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}