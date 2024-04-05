import Factory from './gameobjects/shape/customprogress/Factory';
import Creator from './gameobjects/shape/customprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCustomProgress: typeof Factory,
        }

        interface GameObjectCreator {
            rexCustomProgress: typeof Creator,
        }
    }
}