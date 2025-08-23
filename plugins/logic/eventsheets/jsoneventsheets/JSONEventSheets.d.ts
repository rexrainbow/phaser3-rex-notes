import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default JSONEventSheets;

declare namespace JSONEventSheets {
    interface IConfig extends EventSheetManager.IConfig {

    }

    interface IAddEventSheet {
        parallel?: boolean,
        groupName?: string,
    }
}

declare class JSONEventSheets extends EventSheetManager {
    constructor(scene: unknown, config?: JSONEventSheets.IConfig);
    constructor(config?: JSONEventSheets.IConfig);

    addEventSheet(
        jsonData: Object,
        groupName?: string,
        config?: JSONEventSheets.IAddEventSheet,
    ): this;

    addEventSheet(
        jsonData: Object,
        config?: JSONEventSheets.IAddEventSheet,
    ): this;
}