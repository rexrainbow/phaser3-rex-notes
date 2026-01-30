import Action from '../Action';

export default Failer;

/**
 * Action node that always fails.
 */
declare class Failer extends Action {
    /**
     * Create a Failer node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Action.IConfig);
}
