import Factory from './gameobjects/fullwindow/fullwindowrectangle/Factory';
import Creator from './gameobjects/fullwindow/fullwindowrectangle/Creator';
import FullWindowRectangle from './gameobjects/fullwindow/fullwindowrectangle/FullWindowRectangle';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class FullWindowRectanglePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFullWindowRectangle', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FullWindowRectangle', FullWindowRectangle);

export default FullWindowRectanglePlugin;