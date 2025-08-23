import BaseNode from './BaseNode';

export default Action;

declare namespace Action {
    interface IConfig extends BaseNode.IConfig {
        services?: Array<string | BaseNode>;
    }
}

declare class Action extends BaseNode {
    constructor(
        config?: Action.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    services?: BaseNode[];

    destroy(): void;

    addService(node: string | BaseNode, nodePool?: BaseNode.NodePoolType): this;
}