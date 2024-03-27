import EventEmitter from '../../../utils/eventemitter/EventEmitter';

export default EventSheetManager;

declare namespace EventSheetManager {
    interface IConfig {
        commandExecutor?: Object,
        parallel?: boolean,
    }
}

declare class EventSheetManager extends EventEmitter {
    constructor(config?: EventSheetManager.IConfig);

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

    hasData(key: string): this;

    toggleData(key: string): this;

    getData(key: string): any;

    dumpState(includeTree?: boolean, groupName?: string): Object;

    loadState(state: Object, groupName?: string): this;

    evalExpression(expression: any): any;

    renderString(template: string): string;

    // Start 'default' eventSheetGroup
    start(): this;

    // Start eventSheetGroup, or startTree by title in 'default' eventSheetGroup
    start(name: string): this;

    // startTree by title in groupName eventSheetGroup 
    start(title: string, groupName: string): this;

    // startTree by title in 'default' eventSheetGroup
    start(title: string, ignoreCondition: boolean): this;

    // startTree by title in groupName eventSheetGroup
    start(title: string, groupName: string, ignoreCondition: boolean,): this;

    stop(groupName?: string): this;

    updateRoundCounter(value?: number): this;
    getRoundCounter(): number;
    setRoundCounter(value: number): this;
    roundCounter: number;

}