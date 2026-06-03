import Tick from '../tick/Tick';
import Blackboard from '../blackboard/Base';
import Expression from './Expression';

export default BaseNode;

declare namespace BaseNode {
    /**
     * Configuration options for creating a node.
     */
    interface IConfig {
        /**
         * Node id.
         */
        id?: string;
        /**
         * Node category.
         */
        category?: string;
        /**
         * Node name.
         */
        name?: string;
        /**
         * Node title.
         */
        title?: string;
        /**
         * Node description.
         */
        description?: string;
        /**
         * Custom properties.
         */
        properties?: Record<string, unknown>;
    }

    /**
     * Expression value type.
     */
    type ExpressionValue =
        Expression |
        number |
        string |
        boolean |
        ((...args: unknown[]) => unknown);

    /**
     * Node pool map.
     */
    type NodePoolType = Record<string, BaseNode>;

    /**
     * Generic node class for dynamic creation.
     */
    class GeneralNodeClass extends BaseNode {
        /**
         * Create a general node.
         *
         * @param config - Configuration options.
         * @param nodePool - Node pool for resolving ids.
         */
        constructor(
            config?: Record<string, unknown>,
            nodePool?: NodePoolType
        )
    }
}

/**
 * Base class for behavior tree nodes.
 */
declare class BaseNode {
    /**
     * Create a node.
     *
     * @param config - Configuration options for the node.
     */
    constructor(
        config?: BaseNode.IConfig
    );

    /**
     * Parent node.
     */
    parent: BaseNode | null;
    /**
     * Node id.
     */
    id: string;
    /**
     * Node category.
     */
    category: string;
    /**
     * Node name.
     */
    name: string;
    /**
     * Node title.
     */
    title: string;
    /**
     * Node description.
     */
    description: string;
    /**
     * Custom properties.
     */
    properties: Record<string, unknown>;

    /**
     * Destroy the node.
     */
    destroy(): void;

    /**
     * Set node title.
     *
     * @param title - The title string.
     * @returns This BaseNode instance.
     */
    setTitle(title: string): this;
    /**
     * Set node name.
     *
     * @param name - The name string.
     * @returns This BaseNode instance.
     */
    setName(name: string): this;
    /**
     * Set node description.
     *
     * @param description - The description string.
     * @returns This BaseNode instance.
     */
    setDescription(description: string): this;
    /**
     * Set parent node.
     *
     * @param parent - The parent node.
     * @returns This BaseNode instance.
     */
    setParent(parent: BaseNode | null): this;
    /**
     * Get parent node.
     *
     * @returns The parent node.
     */
    getParent(): BaseNode | null;
    /**
     * Get tree root.
     *
     * @param tick - Tick instance.
     * @returns The tree node or null.
     */
    getTree(tick?: Tick): BaseNode | null;

    addExpression(
        name: string,
        node: BaseNode.ExpressionValue,
        nodePool?: BaseNode.NodePoolType
    ): Expression;

    /**
     * Enter the node.
     *
     * @param tick - Tick instance.
     */
    enter(tick: Tick): void;
    /**
     * Open the node.
     *
     * @param tick - Tick instance.
     */
    open(tick: Tick): void;
    /**
     * Tick the node.
     *
     * @param tick - Tick instance.
     * @returns Status code.
     */
    tick(tick: Tick): number;
    /**
     * Close the node.
     *
     * @param tick - Tick instance.
     */
    close(tick: Tick): void;
    /**
     * Exit the node.
     *
     * @param tick - Tick instance.
     */
    exit(tick: Tick): void;
    /**
     * Abort child nodes.
     *
     * @param tick - Tick instance.
     */
    abortChildren(tick: Tick): void;
    /**
     * Abort this node.
     *
     * @param tick - Tick instance.
     */
    abort(tick: Tick): void;

    /**
     * Get node memory from blackboard.
     *
     * @param tick - Tick instance.
     * @returns Node memory.
     */
    getNodeMemory(tick: Tick): Blackboard.MemoryType;
    /**
     * Get open state.
     *
     * @param tick - Tick instance.
     * @returns True if open.
     */
    getOpenState(tick: Tick): boolean;
    /**
     * Set open state.
     *
     * @param tick - Tick instance.
     * @param state - Open state value.
     * @returns This BaseNode instance.
     */
    setOpenState(
        tick: Tick,
        state?: boolean
    ): this;

    /**
     * Success status code.
     */
    readonly SUCCESS: number;
    /**
     * Failure status code.
     */
    readonly FAILURE: number;
    /**
     * Running status code.
     */
    readonly RUNNING: number;
    /**
     * Error status code.
     */
    readonly ERROR: number;
}
