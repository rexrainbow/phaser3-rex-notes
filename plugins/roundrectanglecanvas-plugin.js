import Factory from './gameobjects/canvas/roundrectangle/Factory.js';
import Creator from './gameobjects/canvas/roundrectangle/Creator.js';
import RoundRectangle from './gameobjects/canvas/roundrectangle/RoundRectangle.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CircleMaskImagePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangleCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangleCanvas', RoundRectangle);

export default CircleMaskImagePlugin;