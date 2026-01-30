import Action from '../Action';

export default BreakAction;

declare namespace BreakAction {
    /**
     * Configuration options for creating a BreakAction node.
     */
    interface IConfig extends Action.IConfig {
        /**
         * Decorator title to break.
         */
        breakDecoratorTitle?: string,
        /**
         * Tag value to match.
         */
        tag?: string
    }
}

/**
 * Action node that breaks a decorator chain.
 */
declare class BreakAction extends Action {
    /**
     * Create a BreakAction node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: BreakAction.IConfig);
}
