import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default If;

declare namespace If {
    interface IConfig extends Decorator.IConfig {
        expression?: BaseNode.ExpressionValue;
        conditionEvalBreak?: boolean;
    }
}

declare class If extends Decorator {
    constructor(
        config?: If.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}