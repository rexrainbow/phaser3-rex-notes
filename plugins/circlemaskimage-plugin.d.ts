import Factory from './gameobjects/canvas/circlemaskimage/Factory';
import Creator from './gameobjects/canvas/circlemaskimage/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCircleMaskImage: typeof Factory,
        }

        interface GameObjectCreator {
            rexCircleMaskImage: typeof Creator,
        }
    }
}