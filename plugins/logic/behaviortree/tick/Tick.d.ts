import Tree from '../behaviortree/BehaviorTree.js';
import Blackboard from '../blackboard/Base';
import BaseExpression from '../nodes/expressions/BaseExpression';

export default Tick;

declare namespace Tick {

}

declare class Tick<T = object> {

    constructor();

    tree: Tree;
    blackboard: Blackboard;
    target: T;

    destroy(): void;

    setTree(tree: Tree): this;

    setBlackBoard(blackboard: Blackboard): this;

    setTarget(target: T): this;

    reset(): this;

    getGlobalMemory(): Blackboard.MemoryType;

    getTreeMemory(): Blackboard.MemoryType;

    getNodeMemory(nodeID: string): Blackboard.MemoryType;

    readonly currentTime: number;

    evalExpression(expression: BaseExpression): any;

}