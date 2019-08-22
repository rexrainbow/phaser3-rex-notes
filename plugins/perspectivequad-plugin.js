import Factory from './gameobjects/perspectivequad/Factory.js';
import Creator from './gameobjects/perspectivequad/Creator.js';
import PerspectiveQuad from './gameobjects/perspectivequad/PerspectiveQuad.js';
import SetValue from './utils/object/SetValue.js';

class PerspectiveQuadPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveQuad', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveQuad', PerspectiveQuad);

export default PerspectiveQuadPlugin;