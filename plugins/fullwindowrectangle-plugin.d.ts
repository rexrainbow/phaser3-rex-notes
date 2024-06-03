import Factory from './gameobjects/fullwindow/fullwindowrectangle/Factory';
import Creator from './gameobjects/fullwindow/fullwindowrectangle/Creator';

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