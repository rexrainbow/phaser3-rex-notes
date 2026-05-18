import Factory from './gameobjects/container/containerlite/Factory';
import Creator from './gameobjects/container/containerlite/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexContainerLite: typeof Factory,
        }

        interface GameObjectCreator {
            rexContainerLite: typeof Creator,
        }
    }
}