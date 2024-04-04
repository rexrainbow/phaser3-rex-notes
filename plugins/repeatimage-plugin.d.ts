import Factory from './gameobjects/canvas/repeatimage/Factory';
import Creator from './gameobjects/canvas/repeatimage/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexRepeatImage: typeof Factory,
        }

        interface GameObjectCreator {
            rexRepeatImage: typeof Creator,
        }
    }
}