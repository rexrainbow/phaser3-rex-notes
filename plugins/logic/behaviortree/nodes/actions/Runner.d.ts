import Action from '../Action';

export default Runner;

/**
 * Action node that always runs.
 */
declare class Runner extends Action {
    /**
     * Create a Runner node.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Action.IConfig);
}
