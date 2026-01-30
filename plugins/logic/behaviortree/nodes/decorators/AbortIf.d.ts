import Decorator from '../Decorator';
import BaseNode from '../BaseNode.js';

export default AbortIf;

declare namespace AbortIf {
    /**
     * Configuration options for creating an AbortIf decorator.
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
 * Decorator that aborts when condition fails.
 */
declare class AbortIf extends Decorator {
    /**
     * Create an AbortIf decorator.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: AbortIf.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

}
