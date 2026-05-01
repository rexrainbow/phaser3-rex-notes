import Factory from './gameobjects/canvas/alphamaskimage/Factory.js';
import Creator from './gameobjects/canvas/alphamaskimage/Creator.js';
import AlphaMaskImage from './gameobjects/canvas/alphamaskimage/AlphaMaskImage.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class AlphaMaskImagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexAlphaMaskImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.AlphaMaskImage', AlphaMaskImage);

export default AlphaMaskImagePlugin;