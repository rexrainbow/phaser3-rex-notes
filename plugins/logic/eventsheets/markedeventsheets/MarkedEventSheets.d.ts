import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default MarkedEventSheets;

declare namespace MarkedEventSheets {
    interface IConfig extends EventSheetManager.IConfig {

    }

    interface IAddEventSheet {
        lineBreak?: string,
        commentLineStart?: string,
        parallel?: boolean,
        active?: boolean,
        once?: boolean,
    }
}

declare class MarkedEventSheets extends EventSheetManager {
    constructor(scene: unknown, config?: MarkedEventSheets.IConfig);
    constructor(config?: MarkedEventSheets.IConfig);

    addEventSheet(
        markedString: string,
        groupName?: string,
        config?: MarkedEventSheets.IAddEventSheet,
    ): this;

    addEventSheet(
        markedString: string,
        config?: MarkedEventSheets.IAddEventSheet,
    ): this;
}