import Factory from './gameobjects/canvas/alphamaskimage/Factory';
import Creator from './gameobjects/canvas/alphamaskimage/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexAlphaMaskImage: typeof Factory,
        }

        interface GameObjectCreator {
            rexAlphaMaskImage: typeof Creator,
        }
    }
}