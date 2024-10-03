import Factory from './gameobjects/shape/roundrectangleprogress/Factory';
import Creator from './gameobjects/shape/roundrectangleprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexRoundRectangleProgress: typeof Factory,
        }

        interface GameObjectCreator {
            rexRoundRectangleProgress: typeof Creator,
        }
    }
}