import Factory from './gameobjects/dynamictext/textplayer/Factory';
import Creator from './gameobjects/dynamictext/textplayer/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexTextPlayer: typeof Factory,
        }

        interface GameObjectCreator {
            rexTextPlayer: typeof Creator,
        }
    }
}