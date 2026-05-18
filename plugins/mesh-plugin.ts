import MeshFactory from './gameobjects/mesh/mesh/sprite/Factory';
import MeshCreator from './gameobjects/mesh/mesh/sprite/Creator';
import Mesh from './gameobjects/mesh/mesh/sprite/Sprite';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class MeshPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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