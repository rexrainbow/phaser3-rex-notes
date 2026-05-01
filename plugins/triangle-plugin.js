import Factory from './gameobjects/shape/triangle/Factory.js';
import Creator from './gameobjects/shape/triangle/Creator.js';
import Triangle from './gameobjects/shape/triangle/Triangle.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TrianglePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTriangle', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Triangle', Triangle);

export default TrianglePlugin;