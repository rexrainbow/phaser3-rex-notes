import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';
import Marked2Tree from './methods/Marked2Tree.js';

class MarkedEventSheets extends EventSheetManager {
    addEventSheet(markedString, {
        lineReturn = '\\',
        commentLineStart = '\/\/',
        parallel = this.parallel,
    } = {},
        groupName = 'default'
    ) {

        var tree = Marked2Tree(markedString, {
            lineReturn,
            commentLineStart,
            parallel
        });

        this.addTree(tree, groupName);
        return this;
    }
}

export default MarkedEventSheets;