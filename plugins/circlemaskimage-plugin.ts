import Factory from './gameobjects/canvas/circlemaskimage/Factory';
import Creator from './gameobjects/canvas/circlemaskimage/Creator';
import CircleMaskImage from './gameobjects/canvas/circlemaskimage/CircleMaskImage';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CircleMaskImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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