import Factory from './gameobjects/canvas/circularprogress/Factory';
import Creator from './gameobjects/canvas/circularprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCircularProgressCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexCircularProgressCanvas: typeof Creator,
        }
    }
}