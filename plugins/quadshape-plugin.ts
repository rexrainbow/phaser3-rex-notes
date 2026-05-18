import Factory from './gameobjects/shape/quad/Factory';
import Creator from './gameobjects/shape/quad/Creator';
import Quad from './gameobjects/shape/quad/Quad';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class QuadPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexQuadShape', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.QuadShape', Quad);

export default QuadPlugin;