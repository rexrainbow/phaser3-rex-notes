import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';
import Marked2Tree from './marked2tree/Marked2Tree.js';

class MarkedEventSheets extends EventSheetManager {
    addEventSheet(markedString, groupName, config) {
        if (typeof (groupName) !== 'string') {
            config = groupName;
            groupName = undefined;
        }

        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }

        if (config === undefined) {
            config = {};
        }

        var {
            lineBreak = '\\',
            commentLineStart = '\/\/',
            parallel = this.parallel,
        } = config;

        var eventsheet = Marked2Tree(
            this,
            markedString,
            {
                groupName,
                lineBreak,
                commentLineStart,
                parallel
            }
        );

        this.addTree(eventsheet, groupName);
        return this;
    }
}

export default MarkedEventSheets;