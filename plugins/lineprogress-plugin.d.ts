import Factory from './gameobjects/shape/lineprogress/Factory';
import Creator from './gameobjects/shape/lineprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexLineProgress: typeof Factory,
        }

        interface GameObjectCreator {
            rexLineProgress: typeof Creator,
        }
    }
}