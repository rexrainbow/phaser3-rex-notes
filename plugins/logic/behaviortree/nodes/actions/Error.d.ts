import Action from '../Action';

export default Error;

/**
 * Action node that returns error.
 */
declare class Error extends Action {
    /**
     * Create an Error node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Action.IConfig);
}
