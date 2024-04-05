import Factory from './gameobjects/rendertexture/line/Factory';
import Creator from './gameobjects/rendertexture/line/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexLine: typeof Factory,
        }

        interface GameObjectCreator {
            rexLine: typeof Creator,
        }
    }
}