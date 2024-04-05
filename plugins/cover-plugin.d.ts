import Factory from './gameobjects/shape/cover/Factory';
import Creator from './gameobjects/shape/cover/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCover: typeof Factory,
        }

        interface GameObjectCreator {
            rexCover: typeof Creator,
        }
    }
}