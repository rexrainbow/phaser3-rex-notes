import BaseNode from './BaseNode';

export default Action;

declare namespace Action {
    /**
     * Configuration options for creating an Action node.
     */
    interface IConfig extends BaseNode.IConfig {
        /**
         * Service node ids or instances.
         */
        services?: Array<string | BaseNode>;
    }
}

/**
 * Base class for action nodes.
 */
declare class Action extends BaseNode {
    /**
     * Create an Action node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Action.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Service node instances.
     */
    services?: BaseNode[];

    /**
     * Destroy the node.
     */
    destroy(): void;

    /**
     * Add a service node.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @returns This Action instance.
     */
    addService(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType
    ): this;
}
