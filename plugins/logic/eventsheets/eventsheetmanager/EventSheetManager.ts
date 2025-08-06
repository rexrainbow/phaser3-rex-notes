import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import { BehaviorTree, Blackboard } from '../../behaviortree';

export default EventSheetManager;

declare namespace EventSheetManager {
    type CommandHandler = (
        parameters: { [key: string]: any },
        manager: EventSheetManager,
        eventSheet: BehaviorTree
    ) => EventEmitter | void;

    type DefaultHandler = (
        taskName: string,
        parameters: { [key: string]: any },
        manager: EventSheetManager,
        eventSheet?: BehaviorTree
    ) => EventEmitter | void;

    interface IConfig {
        commandExecutor?: object,
        parallel?: boolean,
    }

    interface IStartGroupByEventConfig {
        eventName: string,
        groupName: string,
        once?: boolean
    }

    interface ITreeGroupState {
        isRunning: boolean,
        pendingTrees: string[],
        trees?: BehaviorTree.IDump[],
    }

    interface IState {
        blackboard: ReturnType<Blackboard['dump']>;
        treeGroups: { [groupName: string]: EventSheetManager.ITreeGroupState },
    }

    type ExpressionCallbackType = (...args: any[]) => any;
}

declare class EventSheetManager extends EventEmitter {
    constructor(scene: unknown, config?: EventSheetManager.IConfig);
    constructor(config?: EventSheetManager.IConfig);

    destroy(): void;

    readonly blackboard: Blackboard;
    readonly memory: ReturnType<Blackboard['getGlobalMemory']>;

    setCommandExecutor(commandExecutor?: object): this;
    commandExecutor: object;

    addEventSheet(
        content: string,
        groupName?: string,
        config?: Record<string, unknown>
    ): this;

    hasTreeGroup(name: string): boolean;

    getTreeGroup(name: string): unknown;

    getTree(title: string, groupName?: string): BehaviorTree | undefined;

    getTreeState(
        eventsheet: string | BehaviorTree,
        groupName?: string
    ): number;

    removeAllEventSheets(groupName?: string): this;

    removeEventSheet(title: string, groupName?: string): this;

    getEventSheetTitleList(out?: string[], groupName?: string): string[];

    getEventSheetActiveState(title: string, groupName?: string): boolean;

    setEventSheetActiveState(
        title: string,
        groupName: string,
        active?: boolean
    ): this;
    setEventSheetActiveState(title: string, active?: boolean): this;

    dumpEventSheetGroup(groupName?: string): BehaviorTree.IDump[];

    loadEventSheetGroup(
        data: BehaviorTree.IDump[],
        groupName?: string
    ): this;

    setData(key: string, value: unknown): this;
    setData(data: Record<string, unknown>): this;
    incData(key: string, inc: number): this;

    hasData(key: string): boolean;

    toggleData(key: string): this;

    getData(key: string): unknown;

    removeData(key: string): this;

    addExpression(
        key: string,
        callback: EventSheetManager.ExpressionCallbackType
    ): this;
    addExpressions(
        expressions: {
            [key: string]: EventSheetManager.ExpressionCallbackType
        }
    ): this;

    dumpState(includeTree?: boolean): EventSheetManager.IState;

    loadState(state?: EventSheetManager.IState): this;

    evalExpression(expression: unknown): unknown;

    renderString(template: string): string;

    // Start groupName, or 'default' eventSheetGroup
    startGroup(groupName?: string): this;

    // Start 'default' eventSheetGroup
    start(): this;

    // Start eventSheetGroup, or startTree by title in 'default' eventSheetGroup
    start(name: string): this;

    // startTree by title in groupName eventSheetGroup 
    start(title: string, groupName: string): this;

    // startTree by title in 'default' eventSheetGroup
    start(title: string, ignoreCondition: boolean): this;

    // startTree by title in groupName eventSheetGroup
    start(
        title: string,
        groupName: string,
        ignoreCondition: boolean
    ): this;

    continue(groupName?: string): this;

    stopGroup(groupName?: string): this;
    stop(groupName?: string): this;
    stopAllGroups(): this;
    stopAll(): this;

    startGroupByEvent(eventName: string, groupName: string, once?: boolean): this;
    startGroupByEvent(config: EventSheetManager.IStartGroupByEventConfig): this;

    updateRoundCounter(value?: number): this;
    getRoundCounter(): number;
    setRoundCounter(value: number): this;
    $roundCounter: number;

    // Invoked by Handler of TaskAction node
    pauseEventSheet(): (() => void) | null;
    pauseEventSheetUnitlEvent(
        eventEmitter: EventEmitter,
        eventName?: string
    ): this;

}