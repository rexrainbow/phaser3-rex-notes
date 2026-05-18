import Factory from './gameobjects/canvas/alphamaskimage/Factory';
import Creator from './gameobjects/canvas/alphamaskimage/Creator';
import AlphaMaskImage from './gameobjects/canvas/alphamaskimage/AlphaMaskImage';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class AlphaMaskImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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