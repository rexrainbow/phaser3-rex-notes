import MeshFactory from './gameobjects/mesh/mesh/sprite/Factory';
import MeshCreator from './gameobjects/mesh/mesh/sprite/Creator';

export default class extends Phaser.Plugins.BasePlugin { }


declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexMesh: typeof MeshFactory,
        }

        interface GameObjectCreator {
            rexMeshImage: typeof MeshCreator,
        }
    }
}