import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Composite;

declare namespace Composite {
    interface IConfig extends BaseNode.IConfig {
        children?: Array<string | BaseNode>;
        services?: Array<string | BaseNode>;
    }

}

declare class Composite extends BaseNode {
    constructor(
        config?: Composite.IConfig,
        nodePool?: BaseNode.NodePoolType,
    );

    children: BaseNode[];
    services?: BaseNode[];

    destroy(): void;

    insertChild(node: string | BaseNode, nodePool?: BaseNode.NodePoolType, index?: number): this;

    addChild(node: string | BaseNode, nodePool?: BaseNode.NodePoolType): this;

    addService(node: string | BaseNode, nodePool?: BaseNode.NodePoolType): this;

    abortChildren(tick: Tick): void;

}