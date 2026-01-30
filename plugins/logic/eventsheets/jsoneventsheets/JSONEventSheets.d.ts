import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default JSONEventSheets;

declare namespace JSONEventSheets {
    /**
     * Configuration options for creating JSONEventSheets.
     */
    interface IConfig extends EventSheetManager.IConfig {

    }

    /**
     * Configuration for adding a JSON event sheet.
     */
    interface IAddEventSheet {
        /**
         * Enable parallel execution for the sheet.
         */
        parallel?: boolean,
        /**
         * Group name to add the sheet to.
         */
        groupName?: string,
    }
}

/**
 * Event sheet manager that loads JSON definitions.
 */
declare class JSONEventSheets extends EventSheetManager {
    /**
     * Create JSONEventSheets with scene and config.
     *
     * @param scene - Scene or owner object.
     * @param config - Configuration options.
     */
    constructor(scene: unknown, config?: JSONEventSheets.IConfig);
    /**
     * Create JSONEventSheets with config only.
     *
     * @param config - Configuration options.
     */
    constructor(config?: JSONEventSheets.IConfig);

    /**
     * Add a JSON event sheet with group name and config.
     *
     * @param jsonData - JSON data object.
     * @param groupName - Group name.
     * @param config - Add configuration.
     * @returns This JSONEventSheets instance.
     */
    addEventSheet(
        jsonData: Object,
        groupName?: string,
        config?: JSONEventSheets.IAddEventSheet
    ): this;

    /**
     * Add a JSON event sheet with config.
     *
     * @param jsonData - JSON data object.
     * @param config - Add configuration.
     * @returns This JSONEventSheets instance.
     */
    addEventSheet(
        jsonData: Object,
        config?: JSONEventSheets.IAddEventSheet
    ): this;
}
