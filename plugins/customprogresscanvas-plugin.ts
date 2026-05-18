import Factory from './gameobjects/canvas/customprogress/Factory';
import Creator from './gameobjects/canvas/customprogress/Creator';
import CustomProgressCanvas from './gameobjects/canvas/customprogress/CustomProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CustomProgressPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCustomProgressCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CustomProgressCanvas', CustomProgressCanvas);

export default CustomProgressPlugin;