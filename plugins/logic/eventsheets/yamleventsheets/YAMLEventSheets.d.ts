import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default YAMLEventSheets;

declare namespace YAMLEventSheets {
    interface IConfig extends EventSheetManager.IConfig {

    }

    interface IAddEventSheet {
        parallel?: boolean,
        groupName?: string,
    }
}

declare class YAMLEventSheets extends EventSheetManager {
    constructor(scene: unknown, config?: YAMLEventSheets.IConfig);
    constructor(config?: YAMLEventSheets.IConfig);

    addEventSheet(
        yamlString: string,
        groupName?: string,
        config?: YAMLEventSheets.IAddEventSheet,
    ): this;

    addEventSheet(
        yamlString: string,
        config?: YAMLEventSheets.IAddEventSheet,
    ): this;
}