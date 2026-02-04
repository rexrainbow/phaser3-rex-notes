export default CreateProxyContext;

declare namespace CreateProxyContext {
    /**
     * Configuration options for creating a proxy context.
     */
    interface IConfig {
        /**
         * Proxy has trap.
         */
        has: (target: Object, key: string) => boolean;
        /**
         * Proxy get trap.
         */
        get:  (target: Object, key: string) => any;
    }
}

/**
 * Create a proxy-based context object.
 *
 * @param config - Proxy trap configuration.
 * @param baseContext - Base context object.
 * @returns Proxy constructor type.
 */
declare var CreateProxyContext: (
    config: CreateProxyContext.IConfig,
    baseContext?: Object
) => typeof Proxy;
