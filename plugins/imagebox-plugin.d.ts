import Factory from './gameobjects/image/imagebox/Factory';
import Creator from './gameobjects/image/imagebox/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexImageBox: typeof Factory,
        }

        interface GameObjectCreator {
            rexImageBox: typeof Creator,
        }
    }
}