import Factory from './gameobjects/canvas/circlemaskimage/Factory.js';
import Creator from './gameobjects/canvas/circlemaskimage/Creator.js';
import CircleMaskImage from './gameobjects/canvas/circlemaskimage/CircleMaskImage.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CircleMaskImagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCircleMaskImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CircleMaskImage', CircleMaskImage);

export default CircleMaskImagePlugin;