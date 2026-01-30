import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default Invert;

declare namespace Invert {
    /**
     * Configuration options for creating an Invert decorator.
     */
    interface IConfig extends Decorator.IConfig {
    }
}

/**
 * Decorator that inverts child status.
 */
declare class Invert extends Decorator {
    /**
     * Create an Invert decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Invert.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
