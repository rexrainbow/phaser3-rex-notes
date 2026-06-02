import BaseNode from '../nodes/BaseNode';
import Blackboard from '../blackboard/Base';
import Tick from '../tick/Tick';

export default BehaviorTree;

declare namespace BehaviorTree {
    /**
     * Configuration options for creating a BehaviorTree.
     */
    interface IConfig {
        /**
         * Tree id.
         */
        id?: string;
        /**
         * Tree title.
         */
        title?: string;
        /**
         * Tree description.
         */
        description?: string;
        /**
         * Custom properties.
         */
        properties?: Record<string, unknown>;
        /**
         * Root node.
         */
        root?: BaseNode | null;
    }

    /**
     * Dumped tree data.
     */
    interface IDump {
        /**
         * Serial number.
         */
        sn?: number;
        /**
         * Tree id.
         */
        id: string;
        /**
         * Tree title.
         */
        title: string;
        /**
         * Tree description.
         */
        description: string;
        /**
         * Root node id.
         */
        root: string | null;
        /**
         * Custom properties.
         */
        properties: Record<string, unknown>;
        /**
         * Node specs.
         */
        nodes: IDumpNodeSpec[];
    }

    /**
     * Dumped node spec.
     */
    interface IDumpNodeSpec {
        /**
         * Node id.
         */
        id?: string;
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
         * Node properties.
         */
        properties?: Record<string, unknown>;
        /**
         * Child node ids.
         */
        children?: string[];
        /**
         * Single child node id.
         */
        child?: string;
        /**
         * Service node ids.
         */
        services?: string[];
    }
}


/**
 * Behavior tree runtime and configuration container.
 */
declare class BehaviorTree {
    /**
     * Create a BehaviorTree.
     *
     * @param config - Configuration options for the tree.
     */
    constructor(config?: BehaviorTree.IConfig);

    /**
     * Tree id.
     */
    id: string;
    /**
     * Tree category.
     */
    category: string;
    /**
     * Tree name.
     */
    name: string;
    /**
     * Tree title.
     */
    title: string;
    /**
     * Tree description.
     */
    description: string;
    /**
     * Custom properties.
     */
    properties: Record<string, unknown>;
    /**
     * Tick controller.
     */
    ticker: Tick;

    /**
     * Get or set the root node.
     */
    get root(): BaseNode | null;
    set root(node: BaseNode | null);

    /**
     * Destroy the tree.
     */
    destroy(): void;

    /**
     * Set the tree title.
     *
     * @param title - The title string.
     * @returns This BehaviorTree instance.
     */
    setTitle(title: string): this;

    /**
     * Set the tree name.
     *
     * @param name - The name string.
     * @returns This BehaviorTree instance.
     */
    setName(name: string): this;

    /**
     * Set the tree description.
     *
     * @param description - The description string.
     * @returns This BehaviorTree instance.
     */
    setDescription(description: string): this;

    /**
     * Set the root node.
     *
     * @param node - The root node.
     * @returns This BehaviorTree instance.
     */
    setRoot(node: BaseNode | null): this;

    /**
     * Get the root node.
     *
     * @returns The root node.
     */
    getRoot(): BaseNode | null;

    /**
     * Iterate each node.
     *
     * @param callback - Callback invoked per node.
     * @param scope - Callback scope.
     * @returns This BehaviorTree instance.
     */
    forEachNode(
        callback: (node: BaseNode) => void,
        scope?: object
    ): this;

    /**
     * Get all nodes.
     *
     * @param out - Output array.
     * @returns The nodes list.
     */
    getAllNodes(out?: BaseNode[]): BaseNode[];

    /**
     * Get children nodes of a parent.
     *
     * @param parent - Parent node.
     * @param out - Output array.
     * @returns The child nodes.
     */
    getChildrenNodes(
        parent?: BaseNode,
        out?: BaseNode[]
    ): BaseNode[];

    /**
     * Tick the tree.
     *
     * @param blackboard - Blackboard instance.
     * @param target - Target object for this tick.
     * @returns Status code.
     */
    tick(
        blackboard: Blackboard,
        target?: object
    ): number;

    /**
     * Abort the tree.
     *
     * @param blackboard - Blackboard instance.
     * @param target - Target object for this tick.
     * @returns Status code.
     */
    abort(
        blackboard: Blackboard,
        target?: object
    ): number;

    /**
     * Get tree memory from blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @returns Tree memory.
     */
    getTreeMemory(
        blackboard: Blackboard
    ): Blackboard.MemoryType;

    /**
     * Get data from blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @param key - Data key.
     * @returns The stored value.
     */
    getData(
        blackboard: Blackboard,
        key: string
    ): unknown;

    /**
     * Set data in blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @param key - Data key.
     * @param value - Value to store.
     * @returns This BehaviorTree instance.
     */
    setData(
        blackboard: Blackboard,
        key: string,
        value: unknown
    ): this;

    /**
     * Get the tree state from blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @returns The current state code.
     */
    getState(
        blackboard: Blackboard
    ): number;

    /**
     * Reset the tree state in blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @returns This BehaviorTree instance.
     */
    resetState(
        blackboard: Blackboard
    ): this;

    /**
     * Dump tree data.
     *
     * @returns The dump data.
     */
    dump(): BehaviorTree.IDump;

    /**
     * Load tree data.
     *
     * @param data - The dump data.
     * @param names - Node name map.
     * @returns This BehaviorTree instance.
     */
    load(
        data: BehaviorTree.IDump,
        names?: Record<string, BaseNode.GeneralNodeClass>
    ): this;

    /**
     * Set the starting serial number.
     *
     * @param value - Start value.
     */
    static setStartIDValue(value: number): void;

    /**
     * Get the current serial number.
     *
     * @returns The serial number.
     */
    static getSerialNumber(): number;

    /**
     * Set the serial id prefix.
     *
     * @param prefix - Prefix string.
     */
    static setSerialIDPrefix(prefix: string): void;

}
