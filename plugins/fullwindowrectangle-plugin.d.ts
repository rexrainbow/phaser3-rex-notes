import Factory from './gameobjects/shape/fullwindowrectangle/Factory';
import Creator from './gameobjects/shape/fullwindowrectangle/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexFullWindowRectangle: typeof Factory,
        }

        interface GameObjectCreator {
            rexFullWindowRectangle: typeof Creator,
        }
    }
}