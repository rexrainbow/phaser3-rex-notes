import Factory from './gameobjects/shape/roundrectangle/Factory.js';
import Creator from './gameobjects/shape/roundrectangle/Creator.js';
import RoundRectangle from './gameobjects/shape/roundrectangle/RoundRectangle.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RoundRectanglePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangle', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangle', RoundRectangle);

export default RoundRectanglePlugin;