import Factory from './gameobjects/canvas/lineprogress/Factory.js';
import Creator from './gameobjects/canvas/lineprogress/Creator.js';
import LineProgressCanvas from './gameobjects/canvas/lineprogress/LineProgress.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class LineProgressCanvasPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
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