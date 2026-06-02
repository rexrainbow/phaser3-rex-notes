import Tree from '../behaviortree/BehaviorTree.js';
import Blackboard from '../blackboard/Base';
import BaseExpression from '../nodes/expressions/BaseExpression';

export default Tick;

declare namespace Tick {

}

/**
 * Tick context for behavior tree execution.
 */
declare class Tick<T = object> {

    /**
     * Create a Tick context.
     */
    constructor();

    /**
     * Behavior tree instance.
     */
    tree: Tree;
    /**
     * Blackboard instance.
     */
    blackboard: Blackboard;
    /**
     * Target object.
     */
    target: T;

    /**
     * Destroy the tick context.
     */
    destroy(): void;

    /**
     * Set the tree.
     *
     * @param tree - Behavior tree instance.
     * @returns This Tick instance.
     */
    setTree(tree: Tree): this;

    /**
     * Set the blackboard.
     *
     * @param blackboard - Blackboard instance.
     * @returns This Tick instance.
     */
    setBlackBoard(blackboard: Blackboard): this;

    /**
     * Set the target object.
     *
     * @param target - Target object.
     * @returns This Tick instance.
     */
    setTarget(target: T): this;

    /**
     * Reset tick state.
     *
     * @returns This Tick instance.
     */
    reset(): this;

    /**
     * Get global memory.
     *
     * @returns Global memory.
     */
    getGlobalMemory(): Blackboard.MemoryType;

    /**
     * Get tree memory.
     *
     * @returns Tree memory.
     */
    getTreeMemory(): Blackboard.MemoryType;

    /**
     * Get node memory.
     *
     * @param nodeID - Node id.
     * @returns Node memory.
     */
    getNodeMemory(nodeID: string): Blackboard.MemoryType;

    /**
     * Current time value.
     */
    readonly currentTime: number;

    /**
     * Evaluate an expression.
     *
     * @param expression - Expression instance.
     * @returns Evaluation result.
     */
    evalExpression(expression: BaseExpression): any;

}
