import Factory from './gameobjects/shape/customprogress/Factory';
import Creator from './gameobjects/shape/customprogress/Creator';
import CustomProgress from './gameobjects/shape/customprogress/CustomProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CustomProgressPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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