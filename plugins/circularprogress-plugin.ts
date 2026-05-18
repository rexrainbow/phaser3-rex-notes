import Factory from './gameobjects/shape/circularprogress/Factory';
import Creator from './gameobjects/shape/circularprogress/Creator';
import CircularProgress from './gameobjects/shape/circularprogress/CircularProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CircularProgressPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCircularProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CircularProgress', CircularProgress);

export default CircularProgressPlugin;