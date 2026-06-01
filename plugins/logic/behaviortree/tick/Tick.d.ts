import Tree from '../behaviortree/BehaviorTree.js';
import Blackboard from '../blackboard/Base';
import BaseExpression from '../nodes/expressions/BaseExpression';

export default Tick;

declare namespace Tick {
    type EvalContextGetter<T = object> = (tick: Tick<T>) => BaseExpression.ContextType;
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
     * Optional expression evaluation context getter.
     */
    evalContextGetter?: Tick.EvalContextGetter<T>;

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
     * Set the expression evaluation context getter.
     *
     * @param callback - Context getter, or undefined to use global blackboard memory.
     * @returns This Tick instance.
     */
    setEvalContextGetter(callback?: Tick.EvalContextGetter<T>): this;

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
     * Get the context passed to expression evaluation.
     *
     * @returns Evaluation context.
     */
    getEvalContext(): BaseExpression.ContextType;

    /**
     * Evaluate a behavior-tree expression instance.
     *
     * This is used by built-in nodes such as `If`, `ContinueIf`, `Wait`, and
     * `Cooldown`. When `context` is omitted, the current tick evaluation
     * context from `getEvalContext()` is used. The expression instance decides
     * how to evaluate itself against that context.
     *
     * @param expressionObject - Expression instance created by a behavior-tree node.
     * @param context - Optional explicit evaluation context.
     * @returns Evaluation result.
     */
    evalExpression(
        expressionObject: BaseExpression,
        context?: BaseExpression.ContextType
    ): any;

    /**
     * Evaluate a raw expression value.
     *
     * This helper is intended for custom expression handlers that need to
     * evaluate nested values, for example a condition parameter like
     * `{ value: "time * 10" }`. String values are evaluated through the
     * behavior-tree expression compiler, function values are called with the
     * context, and object values can be delegated to
     * `context.evalExpressionObject()` when provided.
     *
     * When `context` is omitted, the current tick evaluation context from
     * `getEvalContext()` is used.
     *
     * @param expressionString - Raw expression value to evaluate.
     * @param context - Optional explicit evaluation context.
     * @returns Evaluation result.
     */
    evalExpressionValue(
        expressionString: string,
        context?: BaseExpression.ContextType
    ): any;

}
