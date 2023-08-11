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

    setTaskHandlers(commandExecutor?: Object): this;

    addEventSheet(
        content: string,
        groupName?: string,
        config?: any,
    ): this;

    removeAllEventSheets(groupName?: string): this;

    removeEventSheet(title: string, groupName?: string): this;

    getEventSheetTitleList(groupName?: string): string[];

    dumpTrees(groupName?: string): Object[];

    loadTrees(data: Object[], groupName?: string): this;

    setData(key: string, value: any): this;

    hasData(key: string): this;

    toggleData(key: string): this;

    getData(key: string): any;

    dumpState(includeTree?: boolean, groupName?: string): Object;

    loadState(state: Object, groupName?: string): this;

    evalExpression(expression: any): any;

    renderString(template: string): string;

    // Start 'default' treeGroup
    start(): this;

    // Start treeGroup, or startTree by title in 'default' treeGroup
    start(name: string): this;

    // startTree by title in groupName treeGroup 
    start(title: string, groupName: string): this;

    // startTree by title in 'default' treeGroup
    start(title: string, ignoreCondition: boolean): this;

    // startTree by title in groupName treeGroup
    start(title: string, groupName: string, ignoreCondition: boolean,): this;

    stop(groupName?: string): this;
}