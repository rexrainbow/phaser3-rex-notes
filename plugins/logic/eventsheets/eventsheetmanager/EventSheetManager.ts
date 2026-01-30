import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import { BehaviorTree, Blackboard } from '../../behaviortree';

export default EventSheetManager;

declare namespace EventSheetManager {
    /**
     * Command handler for task execution.
     *
     * @param parameters - Task parameters.
     * @param manager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns An EventEmitter or void.
     */
    type CommandHandler = (
        parameters: { [key: string]: any },
        manager: EventSheetManager,
        eventSheet: BehaviorTree
    ) => EventEmitter | void;

    /**
     * Default handler for task execution.
     *
     * @param taskName - Task name string.
     * @param parameters - Task parameters.
     * @param manager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns An EventEmitter or void.
     */
    type DefaultHandler = (
        taskName: string,
        parameters: { [key: string]: any },
        manager: EventSheetManager,
        eventSheet?: BehaviorTree
    ) => EventEmitter | void;

    /**
     * Configuration options for creating an EventSheetManager.
     */
    interface IConfig {
        /**
         * Command executor object.
         */
        commandExecutor?: object,
        /**
         * Enable parallel execution.
         */
        parallel?: boolean,
    }

    /**
     * Configuration for starting a group by event.
     */
    interface IStartGroupByEventConfig {
        /**
         * Event name to listen for.
         */
        eventName: string,
        /**
         * Group name to start.
         */
        groupName: string,
        /**
         * Start only once.
         */
        once?: boolean
    }

    /**
     * Runtime state for a tree group.
     */
    interface ITreeGroupState {
        /**
         * Whether the group is running.
         */
        isRunning: boolean,
        /**
         * Pending tree titles.
         */
        pendingTrees: string[],
        /**
         * Dumped tree data.
         */
        trees?: BehaviorTree.IDump[],
    }

    /**
     * Dumped manager state.
     */
    interface IState {
        /**
         * Blackboard dump data.
         */
        blackboard: ReturnType<Blackboard['dump']>;
        /**
         * Tree group states.
         */
        treeGroups: { [groupName: string]: EventSheetManager.ITreeGroupState },
    }

    /**
     * Expression callback signature.
     */
    type ExpressionCallbackType = (...args: any[]) => any;
}

/**
 * Manager for behavior-tree-based event sheets.
 */
declare class EventSheetManager extends EventEmitter {
    /**
     * Create an EventSheetManager with scene and config.
     *
     * @param scene - Scene or owner object.
     * @param config - Configuration options.
     */
    constructor(scene: unknown, config?: EventSheetManager.IConfig);
    /**
     * Create an EventSheetManager with config only.
     *
     * @param config - Configuration options.
     */
    constructor(config?: EventSheetManager.IConfig);

    /**
     * Destroy the manager.
     */
    destroy(): void;

    /**
     * Blackboard instance.
     */
    readonly blackboard: Blackboard;
    /**
     * Global memory object.
     */
    readonly memory: ReturnType<Blackboard['getGlobalMemory']>;

    /**
     * Set the command executor.
     *
     * @param commandExecutor - Command executor object.
     * @returns This EventSheetManager instance.
     */
    setCommandExecutor(commandExecutor?: object): this;
    /**
     * Current command executor.
     */
    commandExecutor: object;

    /**
     * Check if a tree group exists.
     *
     * @param name - Group name.
     * @returns True if the group exists.
     */
    hasTreeGroup(name: string): boolean;

    /**
     * Get a tree group by name.
     *
     * @param name - Group name.
     * @returns The group object.
     */
    getTreeGroup(name: string): unknown;

    /**
     * Get a tree by title and optional group.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @returns The tree instance or undefined.
     */
    getTree(title: string, groupName?: string): BehaviorTree | undefined;

    /**
     * Get tree state.
     *
     * @param eventsheet - Tree title or instance.
     * @param groupName - Group name.
     * @returns The state code.
     */
    getTreeState(
        eventsheet: string | BehaviorTree,
        groupName?: string
    ): number;

    /**
     * Remove all event sheets.
     *
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    removeAllEventSheets(groupName?: string): this;

    /**
     * Remove an event sheet by title.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    removeEventSheet(title: string, groupName?: string): this;

    /**
     * Get event sheet title list.
     *
     * @param out - Output array.
     * @param groupName - Group name.
     * @returns The title list.
     */
    getEventSheetTitleList(out?: string[], groupName?: string): string[];

    /**
     * Get event sheet active state.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @returns True if active.
     */
    getEventSheetActiveState(title: string, groupName?: string): boolean;

    /**
     * Set event sheet active state by group and title.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @param active - Active state value.
     * @returns This EventSheetManager instance.
     */
    setEventSheetActiveState(
        title: string,
        groupName: string,
        active?: boolean
    ): this;
    /**
     * Set event sheet active state by title.
     *
     * @param title - Tree title.
     * @param active - Active state value.
     * @returns This EventSheetManager instance.
     */
    setEventSheetActiveState(title: string, active?: boolean): this;

    /**
     * Dump event sheet group data.
     *
     * @param groupName - Group name.
     * @returns Dumped tree data.
     */
    dumpEventSheetGroup(groupName?: string): BehaviorTree.IDump[];

    /**
     * Load event sheet group data.
     *
     * @param data - Dumped tree data.
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    loadEventSheetGroup(
        data: BehaviorTree.IDump[],
        groupName?: string
    ): this;

    /**
     * Set a data value by key.
     *
     * @param key - Data key.
     * @param value - Value to store.
     * @returns This EventSheetManager instance.
     */
    setData(key: string, value: unknown): this;
    /**
     * Set multiple data values by object.
     *
     * @param data - Data object.
     * @returns This EventSheetManager instance.
     */
    setData(data: Record<string, unknown>): this;
    /**
     * Increment a data value.
     *
     * @param key - Data key.
     * @param inc - Increment value.
     * @returns This EventSheetManager instance.
     */
    incData(key: string, inc: number): this;

    /**
     * Check if a data key exists.
     *
     * @param key - Data key.
     * @returns True if the key exists.
     */
    hasData(key: string): boolean;

    /**
     * Toggle a boolean data value.
     *
     * @param key - Data key.
     * @returns This EventSheetManager instance.
     */
    toggleData(key: string): this;

    /**
     * Get a data value.
     *
     * @param key - Data key.
     * @returns The stored value.
     */
    getData(key: string): unknown;

    /**
     * Remove a data value.
     *
     * @param key - Data key.
     * @returns This EventSheetManager instance.
     */
    removeData(key: string): this;

    /**
     * Add an expression by key.
     *
     * @param key - Expression key.
     * @param callback - Expression callback.
     * @returns This EventSheetManager instance.
     */
    addExpression(
        key: string,
        callback: EventSheetManager.ExpressionCallbackType
    ): this;
    /**
     * Add multiple expressions.
     *
     * @param expressions - Expression map.
     * @returns This EventSheetManager instance.
     */
    addExpressions(
        expressions: {
            [key: string]: EventSheetManager.ExpressionCallbackType
        }
    ): this;

    /**
     * Dump manager state.
     *
     * @param includeTree - Whether to include tree data.
     * @returns Dumped state.
     */
    dumpState(includeTree?: boolean): EventSheetManager.IState;

    /**
     * Load manager state.
     *
     * @param state - Dumped state.
     * @returns This EventSheetManager instance.
     */
    loadState(state?: EventSheetManager.IState): this;

    /**
     * Evaluate an expression.
     *
     * @param expression - Expression value.
     * @returns The evaluation result.
     */
    evalExpression(expression: unknown): unknown;

    /**
     * Render a string template.
     *
     * @param template - Template string.
     * @returns Rendered string.
     */
    renderString(template: string): string;

    /**
     * Start a group or the default group.
     *
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    startGroup(groupName?: string): this;

    /**
     * Start the default group.
     *
     * @returns This EventSheetManager instance.
     */
    start(): this;

    /**
     * Start a group or a tree by title in the default group.
     *
     * @param name - Group name or tree title.
     * @returns This EventSheetManager instance.
     */
    start(name: string): this;

    /**
     * Start a tree by title in the given group.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    start(title: string, groupName: string): this;

    /**
     * Start a tree by title in the default group.
     *
     * @param title - Tree title.
     * @param ignoreCondition - Whether to ignore start conditions.
     * @returns This EventSheetManager instance.
     */
    start(title: string, ignoreCondition: boolean): this;

    /**
     * Start a tree by title in the given group.
     *
     * @param title - Tree title.
     * @param groupName - Group name.
     * @param ignoreCondition - Whether to ignore start conditions.
     * @returns This EventSheetManager instance.
     */
    start(
        title: string,
        groupName: string,
        ignoreCondition: boolean
    ): this;

    /**
     * Continue running groups.
     *
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    continue(groupName?: string): this;

    /**
     * Stop a group.
     *
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    stopGroup(groupName?: string): this;
    /**
     * Stop a group.
     *
     * @param groupName - Group name.
     * @returns This EventSheetManager instance.
     */
    stop(groupName?: string): this;
    /**
     * Stop all groups.
     *
     * @returns This EventSheetManager instance.
     */
    stopAllGroups(): this;
    /**
     * Stop all groups.
     *
     * @returns This EventSheetManager instance.
     */
    stopAll(): this;

    /**
     * Start a group when an event fires.
     *
     * @param eventName - Event name.
     * @param groupName - Group name.
     * @param once - Whether to listen once.
     * @returns This EventSheetManager instance.
     */
    startGroupByEvent(
        eventName: string,
        groupName: string,
        once?: boolean
    ): this;
    /**
     * Start a group when an event fires.
     *
     * @param config - Event start configuration.
     * @returns This EventSheetManager instance.
     */
    startGroupByEvent(config: EventSheetManager.IStartGroupByEventConfig): this;

    /**
     * Update the round counter.
     *
     * @param value - Counter value.
     * @returns This EventSheetManager instance.
     */
    updateRoundCounter(value?: number): this;
    /**
     * Get the round counter value.
     *
     * @returns The counter value.
     */
    getRoundCounter(): number;
    /**
     * Set the round counter.
     *
     * @param value - Counter value.
     * @returns This EventSheetManager instance.
     */
    setRoundCounter(value: number): this;
    /**
     * Round counter value.
     */
    $roundCounter: number;

    /**
     * Pause the event sheet.
     *
     * @returns A resume function or null.
     */
    pauseEventSheet(): (() => void) | null;
    /**
     * Pause the event sheet until an event fires.
     *
     * @param eventEmitter - Event emitter instance.
     * @param eventName - Event name.
     * @returns This EventSheetManager instance.
     */
    pauseEventSheetUnitlEvent(
        eventEmitter: EventEmitter,
        eventName?: string
    ): this;

}
