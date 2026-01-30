import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default MarkedEventSheets;

declare namespace MarkedEventSheets {
    /**
     * Configuration options for creating MarkedEventSheets.
     */
    interface IConfig extends EventSheetManager.IConfig {

    }

    /**
     * Configuration for adding a marked event sheet.
     */
    interface IAddEventSheet {
        /**
         * Line break string.
         */
        lineBreak?: string,
        /**
         * Comment line prefix.
         */
        commentLineStart?: string,
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
 * Event sheet manager that loads marked text definitions.
 */
declare class MarkedEventSheets extends EventSheetManager {
    /**
     * Create MarkedEventSheets with scene and config.
     *
     * @param scene - Scene or owner object.
     * @param config - Configuration options.
     */
    constructor(scene: unknown, config?: MarkedEventSheets.IConfig);
    /**
     * Create MarkedEventSheets with config only.
     *
     * @param config - Configuration options.
     */
    constructor(config?: MarkedEventSheets.IConfig);

    /**
     * Add a marked event sheet with group name and config.
     *
     * @param markedString - Marked text string.
     * @param groupName - Group name.
     * @param config - Add configuration.
     * @returns This MarkedEventSheets instance.
     */
    addEventSheet(
        markedString: string,
        groupName?: string,
        config?: MarkedEventSheets.IAddEventSheet
    ): this;

    /**
     * Add a marked event sheet with config.
     *
     * @param markedString - Marked text string.
     * @param config - Add configuration.
     * @returns This MarkedEventSheets instance.
     */
    addEventSheet(
        markedString: string,
        config?: MarkedEventSheets.IAddEventSheet
    ): this;
}
