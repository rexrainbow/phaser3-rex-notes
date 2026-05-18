import Factory from './gameobjects/canvas/canvas/Factory';
import Creator from './gameobjects/canvas/canvas/Creator';
import Canvas from './gameobjects/canvas/canvas/Canvas';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CanvasPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Canvas', Canvas);

export default CanvasPlugin;