import BaseNode from './BaseNode';
import Tick from '../tick/Tick';

export default Decorator;

declare namespace Decorator {
    interface IConfig extends BaseNode.IConfig {
        child?: string | BaseNode;
    }
}

declare class Decorator extends BaseNode {
    constructor(
        config?: Decorator.IConfig,
        nodePool?: BaseNode.NodePoolType
    );

    child: BaseNode | null;

    destroy(): void;

    addChild(node: string | BaseNode, nodePool?: BaseNode.NodePoolType): this;

    chainChild(node: string | BaseNode, nodePool?: BaseNode.NodePoolType): this;

    isChildRunning(tick: Tick): boolean;

    abortChildren(tick: Tick): void;

    openChild(tick: Tick): this;

}