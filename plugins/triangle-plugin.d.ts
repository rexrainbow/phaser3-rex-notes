import Factory from './gameobjects/shape/triangle/Factory';
import Creator from './gameobjects/shape/triangle/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexTriangle: typeof Factory,
        }

        interface GameObjectCreator {
            rexTriangle: typeof Creator,
        }
    }
}