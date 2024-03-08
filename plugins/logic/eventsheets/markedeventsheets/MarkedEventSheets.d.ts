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