import BaseNode from '../nodes/BaseNode';
import Blackboard from '../blackboard/Base';
import Tick from '../tick/Tick';

export default BehaviorTree;

declare namespace BehaviorTree {
    interface IConfig {
        id?: string;
        title?: string;
        description?: string;
        properties?: Record<string, unknown>;
        root?: BaseNode | null;
    }

    interface IDump {
        sn?: number;
        id: string;
        title: string;
        description: string;
        root: string | null;
        properties: Record<string, unknown>;
        nodes: IDumpNodeSpec[];
    }

    interface IDumpNodeSpec {
        id?: string;
        name?: string;
        title?: string;
        description?: string;
        properties?: Record<string, unknown>;
        children?: string[];
        child?: string;
        services?: string[];
    }
}


declare class BehaviorTree {
    constructor(config?: BehaviorTree.IConfig);

    id: string;
    category: string;
    name: string;
    title: string;
    description: string;
    properties: Record<string, unknown>;
    ticker: Tick;

    get root(): BaseNode | null;
    set root(node: BaseNode | null);

    destroy(): void;

    setTitle(title: string): this;

    setName(name: string): this;

    setDescription(description: string): this;

    setRoot(node: BaseNode | null): this;

    getRoot(): BaseNode | null;

    forEachNode(callback: (node: BaseNode) => void, scope?: object): this;

    getAllNodes(out?: BaseNode[]): BaseNode[];

    getChildrenNodes(
        parent?: BaseNode,
        out?: BaseNode[]
    ): BaseNode[];

    tick(
        blackboard: Blackboard,
        target?: object
    ): number;

    abort(
        blackboard: Blackboard,
        target?: object
    ): number;

    getTreeMemory(
        blackboard: Blackboard
    ): Blackboard.MemoryType;

    getData(
        blackboard: Blackboard,
        key: string
    ): unknown;

    setData(
        blackboard: Blackboard,
        key: string,
        value: unknown
    ): this;

    getState(
        blackboard: Blackboard
    ): number;

    resetState(
        blackboard: Blackboard
    ): this;

    dump(): BehaviorTree.IDump;

    load(
        data: BehaviorTree.IDump,
        names?: Record<string, BaseNode.GeneralNodeClass>
    ): this;

    static setStartIDValue(value: number): void;

    static getSerialNumber(): number;

    static setSerialIDPrefix(prefix: string): void;

}