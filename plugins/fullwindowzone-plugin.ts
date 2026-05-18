import Factory from './gameobjects/fullwindow/fullwindowzone/Factory';
import Creator from './gameobjects/fullwindow/fullwindowzone/Creator';
import FullWindowZone from './gameobjects/fullwindow/fullwindowzone/FullWindowZone';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class FullWindowZonePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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