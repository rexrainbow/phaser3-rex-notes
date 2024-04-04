import Factory from './gameobjects/container/containerlite/Factory.js';
import Creator from './gameobjects/container/containerlite/Creator.js';

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