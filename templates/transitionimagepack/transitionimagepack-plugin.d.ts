import Factory from './Factory';
import Creator from './Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexTransitionImagePack: typeof Factory,
        }

        interface GameObjectCreator {
            rexTransitionImagePack: typeof Creator,
        }
    }
}