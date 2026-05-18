import Factory from './gameobjects/canvas/lineprogress/Factory';
import Creator from './gameobjects/canvas/lineprogress/Creator';
import LineProgressCanvas from './gameobjects/canvas/lineprogress/LineProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class LineProgressCanvasPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLineProgressCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.LineProgressCanvas', LineProgressCanvas);

export default LineProgressCanvasPlugin;