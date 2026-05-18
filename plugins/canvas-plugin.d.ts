import Factory from './gameobjects/canvas/canvas/Factory';
import Creator from './gameobjects/canvas/canvas/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexCanvas: typeof Creator,
        }
    }
}