import Factory from './gameobjects/tagtext/bbcodetext/Factory';
import Creator from './gameobjects/tagtext/bbcodetext/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexBBCodeText: typeof Factory,
        }

        interface GameObjectCreator {
            rexBBCodeText: typeof Creator,
        }
    }
}