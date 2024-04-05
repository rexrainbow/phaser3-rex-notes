import Factory from './gameobjects/shape/circularprogress/Factory';
import Creator from './gameobjects/shape/circularprogress/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCircularProgress: typeof Factory,
        }

        interface GameObjectCreator {
            rexCircularProgress: typeof Creator,
        }
    }
}