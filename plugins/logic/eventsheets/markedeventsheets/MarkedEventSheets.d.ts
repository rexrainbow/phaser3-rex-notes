import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

export default MarkedEventSheets;

declare namespace MarkedEventSheets {
    interface IConfig extends EventSheetManager.IConfig {

    }

    interface IAddEventSheet {
        lineReturn?: string,
        commentLineStart?: string,
        parallel?: boolean,
    }
}

declare class MarkedEventSheets extends EventSheetManager {
    addEventSheet(
        content: string,
        config?: MarkedEventSheets.IAddEventSheet,
        groupName?: string
    ): this;

}