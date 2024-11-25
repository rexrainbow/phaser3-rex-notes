import Factory from './gameobjects/shape/line/Factory';
import Creator from './gameobjects/shape/line/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexLineShape: typeof Factory,
        }

        interface GameObjectCreator {
            rexLineShape: typeof Creator,
        }
    }
}