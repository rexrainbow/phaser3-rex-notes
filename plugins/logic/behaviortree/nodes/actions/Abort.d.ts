import Action from '../Action';

export default Abort;

/**
 * Action node that aborts execution.
 */
declare class Abort extends Action {
    /**
     * Create an Abort node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Action.IConfig);
}
