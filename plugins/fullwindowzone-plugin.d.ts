import Factory from './gameobjects/fullwindow/fullwindowzone/Factory';
import Creator from './gameobjects/fullwindow/fullwindowzone/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexFullWindowZone: typeof Factory,
        }

        interface GameObjectCreator {
            rexFullWindowZone: typeof Creator,
        }
    }
}