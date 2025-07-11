import Factory from './Factory';
import Creator from './Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexLazyLoadImageBox: typeof Factory,
        }

        interface GameObjectCreator {
            rexLazyLoadImageBox: typeof Creator,
        }
    }
}