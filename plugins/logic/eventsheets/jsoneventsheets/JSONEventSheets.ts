import EventSheetManager from '../eventsheetmanager/EventSheetManager';
import BuildTree from './buildtree/BuildTree';

class JSONEventSheets extends EventSheetManager {
    parallel: any;

    addTree: any;
    defaultTreeGroupName: any;
    destroy: any;
    isShutdown: any;
    scene: any;

    boot() {
        super.boot();

        if (this.scene) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene?: any) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        super.shutdown(fromScene);

        return this;
    }

    addEventSheet(jsonData?: any, groupName?: any, config?: any) {
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