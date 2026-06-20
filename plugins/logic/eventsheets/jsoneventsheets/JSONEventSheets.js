import EventSheets from '../eventsheets/EventSheets.js';
import BuildTree from './buildtree/BuildTree.js';

class JSONEventSheets extends EventSheets {
    buildEventSheet(jsonData, groupName, config) {
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
            parallel = this.parallel,
            groupName = groupName
        } = config;

        var eventsheet = BuildTree(
            this,
            jsonData,
            {
                ...config,
                groupName,
                parallel
            }
        );

        return eventsheet;
    }

}

export default JSONEventSheets;
