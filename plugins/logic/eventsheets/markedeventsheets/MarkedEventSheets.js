import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';
import Marked2Tree from './methods/Marked2Tree.js';

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

        var tree = Marked2Tree(markedString, {
            lineBreak,
            commentLineStart,
            parallel
        });

        this.addTree(tree, groupName);
        return this;
    }
}

export default MarkedEventSheets;