import Factory from './gameobjects/fullwindow/fullwindowrectangle/Factory.js';
import Creator from './gameobjects/fullwindow/fullwindowrectangle/Creator.js';
import FullWindowRectangle from './gameobjects/fullwindow/fullwindowrectangle/FullWindowRectangle.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class FullWindowRectanglePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
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