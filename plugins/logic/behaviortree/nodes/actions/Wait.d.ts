import Action from '../Action';
import BaseNode from '../BaseNode';

export default Wait;

declare namespace Wait {
    /**
     * Configuration options for creating a Wait node.
     */
    interface IConfig extends Action.IConfig {
        /**
         * Duration expression.
         */
        duration?: BaseNode.ExpressionValue;
    }
}

/**
 * Action node that waits for a duration.
 */
declare class Wait extends Action {
    /**
     * Create a Wait node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Wait.IConfig);
}
