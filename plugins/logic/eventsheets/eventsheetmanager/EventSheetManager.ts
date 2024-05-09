import EventEmitter from '../../../utils/eventemitter/EventEmitter';

export default EventSheetManager;

declare namespace EventSheetManager {
    interface IConfig {
        commandExecutor?: Object,
        parallel?: boolean,
    }

    interface IStartGroupByEventConfig {
        eventName: string,
        groupName: string,
        once?: boolean
    }
}

declare class EventSheetManager extends EventEmitter {
    constructor(scene: unknown, config?: EventSheetManager.IConfig);
    constructor(config?: EventSheetManager.IConfig);

    destroy(): void;

    readonly memory: { [key: string]: any };

    setCommandExecutor(commandExecutor?: Object): this;
    commandExecutor: Object;

    addEventSheet(
        content: string,
        groupName?: string,
        config?: any,
    ): this;

    removeAllEventSheets(groupName?: string): this;

    removeEventSheet(title: string, groupName?: string): this;

    getEventSheetTitleList(groupName?: string): string[];

    getEventSheetActiveState(title: string, groupName?: string): boolean;

    setEventSheetActiveState(title: string, groupName?: string, active?: boolean): this;
    setEventSheetActiveState(title: string, active?: boolean): this;

    dumpEventSheetGroup(groupName?: string): Object[];

    loadEventSheetGroup(data: Object[], groupName?: string): this;

    setData(key: string, value: any): this;
    setData(data: { [key: string]: any }): this;

    hasData(key: string): this;

    toggleData(key: string): this;

    getData(key: string): any;

    removeData(key: string): this;

    addExpression(
        key: string,
        callback: (...args: number[]) => number
    ): this;
    addExpressions(
        expressions: {
            [key: string]: (...args: number[]) => number
        }
    ): this;

    dumpState(includeTree?: boolean, groupName?: string): Object;

    loadState(state: Object, groupName?: string): this;

    evalExpression(expression: any): any;

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
    start(title: string, groupName: string, ignoreCondition: boolean): this;

    stopGroup(groupName?: string): this;
    stop(groupName?: string): this;
    stopAllGroups(): this;
    stopAll(): this;

    startGroupByEvent(eventName: string, groupName: string, once?: boolean): this;
    startGroupByEvent(config: EventSheetManager.IStartGroupByEventConfig): this;

    updateRoundCounter(value?: number): this;
    getRoundCounter(): number;
    setRoundCounter(value: number): this;
    roundCounter: number;

    // Invoked by Handler of TaskAction node
    pauseEventSheet(): Function | null;
    pauseEventSheetUnitlEvent(eventEmitter: EventEmitter, eventName?: string): this;

}