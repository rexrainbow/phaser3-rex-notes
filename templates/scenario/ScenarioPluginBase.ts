import EventSheetManager from '../../plugins/logic/eventsheets/eventsheetmanager/EventSheetManager';
import CreateMonitorPanel from './monitor/CreateMonitorPanel';

import { Plugins as PhaserPlugins } from 'phaser';
var Base = function(EventSheetManagerClass?: any) {
    if (EventSheetManagerClass === undefined) {
        EventSheetManagerClass = EventSheetManager;
    }
    return class Base extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

        constructor(pluginManager?: any) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene?: any, config?: any) {
            return new EventSheetManagerClass(scene, config);
        }

        addMonitorPanel(scene?: any, style?: any, target?: any, properties?: any) {
            return CreateMonitorPanel(scene, style, target, properties);
        }
    }
}
export default Base;