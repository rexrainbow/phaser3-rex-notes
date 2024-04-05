import Factory from './gameobjects/rendertexture/ninepatch/Factory';
import Creator from './gameobjects/rendertexture/ninepatch/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexNinePatch: typeof Factory,
        }

        interface GameObjectCreator {
            rexNinePatch: typeof Creator,
        }
    }
}