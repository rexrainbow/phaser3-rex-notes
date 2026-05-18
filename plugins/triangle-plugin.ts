import Factory from './gameobjects/shape/triangle/Factory';
import Creator from './gameobjects/shape/triangle/Creator';
import Triangle from './gameobjects/shape/triangle/Triangle';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class TrianglePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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