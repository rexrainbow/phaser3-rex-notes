export default Base;

declare namespace Base {
    type MemoryType = Record<string, any>;

    interface IDumpData {
        base: Base.MemoryType,
        tree: Base.MemoryType
    }
}

declare class Base {

    constructor();

    destroy(): void;

    set(key: string, value: any, treeID?: string, nodeID?: string): this;

    setData(key: string, value: any, treeID?: string, nodeID?: string): this;

    get(key: string, treeID?: string, nodeID?: string): any;

    getData(key: string, treeID?: string, nodeID?: string): any;

    has(key: string, treeID?: string, nodeID?: string): boolean;

    hasData(key: string, treeID?: string, nodeID?: string): boolean;

    inc(key: string, inc: number, treeID?: string, nodeID?: string, startValue?: number): this;

    incData(key: string, inc: number, treeID?: string, nodeID?: string, startValue?: number): this;

    toggle(key: string, treeID?: string, nodeID?: string, startValue?: boolean): this;

    toggleData(key: string, treeID?: string, nodeID?: string, startValue?: boolean): this;

    removeData(key: string, treeID?: string, nodeID?: string): void;

    removeTree(treeID: string): this;

    removeTreeData(treeID: string): this;

    removeNode(treeID: string, nodeID: string): this;

    removeNodeData(treeID: string, nodeID: string): this;

    getGlobalMemory(): Base.MemoryType;

    getTreeMemory(treeID: string): Base.MemoryType;

    getNodeMemory(treeID: string, nodeID: string): Base.MemoryType;

    dump(): Base.IDumpData;

    load(data: Base.IDumpData): this;

}