import MeshFactory from './gameobjects/mesh/mesh/sprite/Factory.js';
import MeshCreator from './gameobjects/mesh/mesh/sprite/Creator.js';
import Mesh from './gameobjects/mesh/mesh/sprite/Sprite.js';

import SetValue from './utils/object/SetValue.js';

class MeshPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexMesh', MeshFactory, MeshCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Mesh', Mesh);

export default MeshPlugin;