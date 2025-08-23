import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default RepeatUntilSuccess;

declare namespace RepeatUntilSuccess {
    interface IConfig extends Decorator.IConfig {
        maxLoop?: BaseNode.ExpressionValue;
    }
}

declare class RepeatUntilSuccess extends Decorator {
    constructor(
        config?: RepeatUntilSuccess.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}