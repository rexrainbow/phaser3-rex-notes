import Factory from './gameobjects/shape/quad/Factory';
import Creator from './gameobjects/shape/quad/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexQuadShape: typeof Factory,
        }

        interface GameObjectCreator {
            rexQuadShape: typeof Creator,
        }
    }
}