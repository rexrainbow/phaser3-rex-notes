import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';
import YAML2Tree from './yaml2tree/YAML2Tree.js';

class YAMLEventSheets extends EventSheetManager {
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

    addEventSheet(yamlString, groupName, config) {
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

        var eventsheet = YAML2Tree(
            this,
            yamlString,
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

export default YAMLEventSheets;