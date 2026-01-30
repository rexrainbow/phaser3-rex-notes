import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default ContinueIf;

declare namespace ContinueIf {
    /**
     * Configuration options for creating a ContinueIf decorator.
     */
    interface IConfig extends Decorator.IConfig {
        /**
         * Condition expression.
         */
        expression?: BaseNode.ExpressionValue;
        /**
         * Return success when condition fails.
         */
        returnSuccess?: boolean;
    }
}

/**
 * Decorator that continues if condition passes.
 */
declare class ContinueIf extends Decorator {
    /**
     * Create a ContinueIf decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: ContinueIf.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
