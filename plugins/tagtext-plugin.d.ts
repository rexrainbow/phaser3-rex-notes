import Factory from './gameobjects/tagtext/tagtext/Factory';
import Creator from './gameobjects/tagtext/tagtext/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexTagText: typeof Factory,
        }

        interface GameObjectCreator {
            rexTagText: typeof Creator,
        }
    }
}