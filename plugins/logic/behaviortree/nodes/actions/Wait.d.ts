import Action from '../Action';
import BaseNode from '../BaseNode';

export default Wait;

declare namespace Wait {
    interface IConfig extends Action.IConfig {
        duration?: BaseNode.ExpressionValue;
    }
}

declare class Wait extends Action {
    constructor(config?: Wait.IConfig);
}