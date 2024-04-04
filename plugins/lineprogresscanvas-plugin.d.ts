import Factory from './gameobjects/canvas/lineprogress/Factory';
import Creator from './gameobjects/canvas/lineprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexLineProgressCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexLineProgressCanvas: typeof Creator,
        }
    }
}