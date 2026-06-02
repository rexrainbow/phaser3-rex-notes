import EventSheets from '../eventsheets/EventSheets.js';
import BuildTree from './buildtree/BuildTree.js';

class MarkedEventSheets extends EventSheets {
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
            groupName = groupName
        } = config;

        var eventsheet = BuildTree(
            this,
            markedString,
            {
                groupName,
                lineBreak,
                commentLineStart,
                parallel
            }
        );

        this.addTree(eventsheet, eventsheet.groupName);

        return this;
    }
}

export default MarkedEventSheets;