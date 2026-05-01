import Factory from './gameobjects/shape/customprogress/Factory.js';
import Creator from './gameobjects/shape/customprogress/Creator.js';
import CustomProgress from './gameobjects/shape/customprogress/CustomProgress.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CustomProgressPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCustomProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CustomProgress', CustomProgress);

export default CustomProgressPlugin;