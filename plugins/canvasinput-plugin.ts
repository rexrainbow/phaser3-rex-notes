import Factory from './gameobjects/dynamictext/canvasinput/Factory';
import Creator from './gameobjects/dynamictext/canvasinput/Creator';
import CanvasInput from './gameobjects/dynamictext/canvasinput/CanvasInput';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CanvasInputPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvasInput', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CanvasInput', CanvasInput);

export default CanvasInputPlugin;