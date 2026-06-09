import Tree from '../behaviortree/BehaviorTree.js';
import Blackboard from '../blackboard/Base';
import BaseNode from '../nodes/BaseNode';
import ExpressionParser from '../../../math/expressionparser/ExpressionParser';
import StringTemplate from '../../../string/stringtemplate/StringTemplate';
import EventEmitter from '../../../utils/eventemitter/EventEmitter';

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
     * Event emitter used by runtime diagnostic events.
     */
    eventEmitter: EventEmitter | null;
    /**
     * True when runtime diagnostic events are emitted.
     */
    eventEnable: boolean;

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
     * Set event emitter used by runtime diagnostic events.
     *
     * @param eventEmitter - Event emitter instance.
     * @returns This Tick instance.
     */
    setEventEmitter(eventEmitter: EventEmitter | null): this;

    /**
     * Enable or disable runtime diagnostic events.
     *
     * @param enable - True to enable event emission.
     * @returns This Tick instance.
     */
    setEventEnable(enable?: boolean): this;

    /**
     * Toggle runtime diagnostic event emission.
     *
     * @returns This Tick instance.
     */
    toggleEventEnable(): this;

    /**
     * Emit a runtime diagnostic event.
     *
     * @param name - Event name.
     * @param args - Event arguments.
     * @returns This Tick instance.
     */
    emit(name: string | symbol, ...args: any[]): this;

    /**
     * Emit tick start event.
     *
     * @returns This Tick instance.
     */
    emitTickStart(): this;

    /**
     * Emit tick end event.
     *
     * @param status - Tree status code.
     * @returns This Tick instance.
     */
    emitTickEnd(status: number): this;

    /**
     * Emit a node lifecycle event.
     *
     * @param name - Lifecycle event suffix.
     * @param node - Node instance.
     * @returns This Tick instance.
     */
    emitNodeEvent(name: string, node: BaseNode): this;

    /**
     * Emit node status event.
     *
     * @param node - Node instance.
     * @param status - Node status code.
     * @returns This Tick instance.
     */
    emitNodeStatus(node: BaseNode, status: number): this;

    /**
     * Emit node abort event.
     *
     * @param node - Node instance.
     * @returns This Tick instance.
     */
    emitNodeAbort(node: BaseNode): this;

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
     * Parser used by expression nodes.
     */
    expressionParser: ExpressionParser;

    /**
     * String template renderer used by string expression nodes.
     */
    stringTemplate: StringTemplate;

    /**
     * Get expression evaluation context.
     *
     * @returns Evaluation context.
     */
    getEvalContext(): Blackboard.MemoryType;

    /**
     * Evaluate an expression.
     *
     * @param expression - Expression instance.
     * @returns Evaluation result.
     */
    evalExpression(expression: BaseNode.ExpressionValue): any;

}
