import EventSheetManager from '../../plugins/logic/eventsheets/eventsheetmanager/EventSheetManager.js';
import CreateMonitorPanel from './monitor/CreateMonitorPanel.js';

var Base = function (EventSheetManagerClass) {
    if (EventSheetManagerClass === undefined) {
        EventSheetManagerClass = EventSheetManager;
    }
    return class Base extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new EventSheetManagerClass(scene, config);
        }

        addMonitorPanel(scene, style, target, properties) {
            return CreateMonitorPanel(scene, style, target, properties);
        }
    }
}
export default Base;