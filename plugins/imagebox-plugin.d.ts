import Factory from './gameobjects/container/imagebox/Factory';
import Creator from './gameobjects/container/imagebox/Creator';

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