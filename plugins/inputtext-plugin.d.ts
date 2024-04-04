import Factory from './gameobjects/dom/inputtext/Factory';
import Creator from './gameobjects/dom/inputtext/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexInputText: typeof Factory,
        }

        interface GameObjectCreator {
            rexInputText: typeof Creator,
        }
    }
}