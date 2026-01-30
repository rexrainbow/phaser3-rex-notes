import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Service;

declare namespace Service {
    /**
     * Configuration options for creating a Service.
     */
    interface IConfig extends BaseNode.IConfig {
        /**
         * Tick interval expression.
         */
        interval?: BaseNode.ExpressionValue;
        /**
         * Random deviation expression.
         */
        randomDeviation?: BaseNode.ExpressionValue;
    }
}

/**
 * Service helper for periodic checks.
 */
declare class Service {
    /**
     * Create a Service.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Service.IConfig);

    /**
     * Check whether the service can tick.
     *
     * @param tick - Tick instance.
     * @returns True if it can tick.
     */
    canTick(tick: Tick): boolean;
}
