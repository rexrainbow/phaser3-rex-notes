import Action from '../Action';

export default Succeeder;

/**
 * Action node that always succeeds.
 */
declare class Succeeder extends Action {
    /**
     * Create a Succeeder node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Action.IConfig);
}
