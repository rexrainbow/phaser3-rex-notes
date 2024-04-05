import Factory from './gameobjects/shape/customshapes/Factory';
import Creator from './gameobjects/shape/customshapes/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCustomShapes: typeof Factory,
        }

        interface GameObjectCreator {
            rexCustomShapes: typeof Creator,
        }
    }
}