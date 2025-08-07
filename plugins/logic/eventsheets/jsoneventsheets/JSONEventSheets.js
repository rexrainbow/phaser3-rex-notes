import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';
import BuildTree from './buildtree/BuildTree.js';

class JSONEventSheets extends EventSheetManager {
    boot() {
        super.boot();

        if (this.scene) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        super.shutdown(fromScene);

        return this;
    }

    addEventSheet(jsonData, groupName, config) {
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
                groupName,
                parallel
            }
        );

        this.addTree(eventsheet, eventsheet.groupName);

        return this;
    }
}

export default JSONEventSheets;