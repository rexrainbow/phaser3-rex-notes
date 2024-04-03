import Factory from './gameobjects/shape/roundrectangle/Factory';
import Creator from './gameobjects/shape/roundrectangle/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexRoundRectangle: typeof Factory,
        }

        interface GameObjectCreator {
            rexRoundRectangle: typeof Creator,
        }
    }
}