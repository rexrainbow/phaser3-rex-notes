import Factory from './gameobjects/canvas/roundrectangle/Factory';
import Creator from './gameobjects/canvas/roundrectangle/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexRoundRectangleCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexRoundRectangleCanvas: typeof Creator,
        }
    }
}