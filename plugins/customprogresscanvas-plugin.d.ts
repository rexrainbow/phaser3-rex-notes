import Factory from './gameobjects/canvas/customprogress/Factory';
import Creator from './gameobjects/canvas/customprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCustomProgressCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexCustomProgressCanvas: typeof Creator,
        }
    }
}