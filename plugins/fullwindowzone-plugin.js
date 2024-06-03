import Factory from './gameobjects/fullwindow/fullwindowzone/Factory.js';
import Creator from './gameobjects/fullwindow/fullwindowzone/Creator.js';
import FullWindowZone from './gameobjects/fullwindow/fullwindowzone/FullWindowZone.js';
import SetValue from './utils/object/SetValue.js';

class FullWindowZonePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFullWindowZone', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FullWindowZone', FullWindowZone);

export default FullWindowZonePlugin;