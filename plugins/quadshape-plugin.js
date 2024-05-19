import Factory from './gameobjects/shape/quad/Factory.js';
import Creator from './gameobjects/shape/quad/Creator.js';
import Quad from './gameobjects/shape/quad/Quad.js';
import SetValue from './utils/object/SetValue.js';

class QuadPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
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