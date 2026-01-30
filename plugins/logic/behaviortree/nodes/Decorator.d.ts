import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Decorator;

declare namespace Decorator {
    /**
     * Configuration options for creating a Decorator node.
     */
    interface IConfig extends BaseNode.IConfig {
        /**
         * Child node id or instance.
         */
        child?: string | BaseNode;
    }
}

/**
 * Base class for decorator nodes.
 */
declare class Decorator extends BaseNode {
    /**
     * Create a Decorator node.
     *
     * @param config - Configuration options.
     * @param nodePool - Node pool for resolving ids.
     */
    constructor(
        config?: Decorator.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    /**
     * Child node instance.
     */
    child: BaseNode | null;

    /**
     * Destroy the node.
     */
    destroy(): void;

    /**
     * Add a child node.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @returns This Decorator instance.
     */
    addChild(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType
    ): this;

    /**
     * Chain a child node.
     *
     * @param node - Node id or instance.
     * @param nodePool - Node pool for resolving ids.
     * @returns This Decorator instance.
     */
    chainChild(
        node: string | BaseNode,
        nodePool?: BaseNode.NodePoolType
    ): this;

    /**
     * Check if child is running.
     *
     * @param tick - Tick instance.
     * @returns True if child is running.
     */
    isChildRunning(tick: Tick): boolean;

    /**
     * Abort child nodes.
     *
     * @param tick - Tick instance.
     */
    abortChildren(tick: Tick): void;

    /**
     * Open child node.
     *
     * @param tick - Tick instance.
     * @returns This Decorator instance.
     */
    openChild(tick: Tick): this;

}
