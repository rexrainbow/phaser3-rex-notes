import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Composite;

declare namespace Composite {
    /**
     * Configuration options for creating a Composite node.
     */
    interface IConfig extends BaseNode.IConfig {
        /**
         * Child node ids or instances.
         */
        children?: Array<string | BaseNode>;
        /**
         * Service node ids or instances.
         */
        services?: Array<string | BaseNode>;
    }

}

/**
 * Base class for composite nodes.
 */
declare class Composite extends BaseNode {
    /**
     * Create a Composite node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Composite.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Child node instances.
     */
    children: BaseNode[];
    /**
     * Service node instances.
     */
    services?: BaseNode[];

    /**
     * Destroy the node.
     */
    destroy(): void;

    /**
     * Insert a child node at an index.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @param index - Insert index.
     * @returns This Composite instance.
     */
    insertChild(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType,
        index?: number
    ): this;

    /**
     * Add a child node.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @returns This Composite instance.
     */
    addChild(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType
    ): this;

    /**
     * Add a service node.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @returns This Composite instance.
     */
    addService(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType
    ): this;

    /**
     * Abort child nodes.
     *
     * @param tick - Tick instance.
     */
    abortChildren(tick: Tick): void;

}
