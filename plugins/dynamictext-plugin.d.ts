import Factory from './gameobjects/dynamictext/dynamictext/Factory';
import Creator from './gameobjects/dynamictext/dynamictext/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexDynamicText: typeof Factory,
        }

        interface GameObjectCreator {
            rexDynamicText: typeof Creator,
        }
    }
}