import Factory from './gameobjects/canvas/circularprogress/Factory';
import Creator from './gameobjects/canvas/circularprogress/Creator';
import CircularProgressCanvas from './gameobjects/canvas/circularprogress/CircularProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CircularProgressCanvasPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCircularProgressCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CircularProgressCanvas', CircularProgressCanvas);

export default CircularProgressCanvasPlugin;