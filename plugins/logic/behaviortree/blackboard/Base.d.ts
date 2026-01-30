export default Base;

declare namespace Base {
    /**
     * Memory storage type.
     */
    type MemoryType = Record<string, any>;

    /**
     * Dumped blackboard data.
     */
    interface IDumpData {
        /**
         * Global memory.
         */
        base: Base.MemoryType,
        /**
         * Tree memory.
         */
        tree: Base.MemoryType
    }
}

/**
 * Blackboard for storing tree and node state.
 */
declare class Base {

    /**
     * Create a blackboard.
     */
    constructor();

    /**
     * Destroy the blackboard.
     */
    destroy(): void;

    /**
     * Set a value.
     *
     * @param key - Data key.
     * @param value - Value to store.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns This Base instance.
     */
    set(
        key: string,
        value: any,
        treeID?: string,
        nodeID?: string
    ): this;

    /**
     * Set a value.
     *
     * @param key - Data key.
     * @param value - Value to store.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns This Base instance.
     */
    setData(
        key: string,
        value: any,
        treeID?: string,
        nodeID?: string
    ): this;

    /**
     * Get a value.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns The stored value.
     */
    get(
        key: string,
        treeID?: string,
        nodeID?: string
    ): any;

    /**
     * Get a value.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns The stored value.
     */
    getData(
        key: string,
        treeID?: string,
        nodeID?: string
    ): any;

    /**
     * Check if a value exists.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns True if the key exists.
     */
    has(
        key: string,
        treeID?: string,
        nodeID?: string
    ): boolean;

    /**
     * Check if a value exists.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns True if the key exists.
     */
    hasData(
        key: string,
        treeID?: string,
        nodeID?: string
    ): boolean;

    /**
     * Increment a numeric value.
     *
     * @param key - Data key.
     * @param inc - Increment value.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @param startValue - Start value if missing.
     * @returns This Base instance.
     */
    inc(
        key: string,
        inc: number,
        treeID?: string,
        nodeID?: string,
        startValue?: number
    ): this;

    /**
     * Increment a numeric value.
     *
     * @param key - Data key.
     * @param inc - Increment value.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @param startValue - Start value if missing.
     * @returns This Base instance.
     */
    incData(
        key: string,
        inc: number,
        treeID?: string,
        nodeID?: string,
        startValue?: number
    ): this;

    /**
     * Toggle a boolean value.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @param startValue - Start value if missing.
     * @returns This Base instance.
     */
    toggle(
        key: string,
        treeID?: string,
        nodeID?: string,
        startValue?: boolean
    ): this;

    /**
     * Toggle a boolean value.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @param startValue - Start value if missing.
     * @returns This Base instance.
     */
    toggleData(
        key: string,
        treeID?: string,
        nodeID?: string,
        startValue?: boolean
    ): this;

    /**
     * Remove a value.
     *
     * @param key - Data key.
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     */
    removeData(
        key: string,
        treeID?: string,
        nodeID?: string
    ): void;

    /**
     * Remove tree data.
     *
     * @param treeID - Tree id.
     * @returns This Base instance.
     */
    removeTree(treeID: string): this;

    /**
     * Remove tree data.
     *
     * @param treeID - Tree id.
     * @returns This Base instance.
     */
    removeTreeData(treeID: string): this;

    /**
     * Remove node data.
     *
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns This Base instance.
     */
    removeNode(
        treeID: string,
        nodeID: string
    ): this;

    /**
     * Remove node data.
     *
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns This Base instance.
     */
    removeNodeData(
        treeID: string,
        nodeID: string
    ): this;

    /**
     * Get global memory.
     *
     * @returns Global memory.
     */
    getGlobalMemory(): Base.MemoryType;

    /**
     * Get tree memory.
     *
     * @param treeID - Tree id.
     * @returns Tree memory.
     */
    getTreeMemory(treeID: string): Base.MemoryType;

    /**
     * Get node memory.
     *
     * @param treeID - Tree id.
     * @param nodeID - Node id.
     * @returns Node memory.
     */
    getNodeMemory(
        treeID: string,
        nodeID: string
    ): Base.MemoryType;

    /**
     * Dump blackboard data.
     *
     * @returns Dumped data.
     */
    dump(): Base.IDumpData;

    /**
     * Load blackboard data.
     *
     * @param data - Dumped data.
     * @returns This Base instance.
     */
    load(data: Base.IDumpData): this;

}
