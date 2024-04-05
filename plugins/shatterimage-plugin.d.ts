import ShatterImageFactory from './gameobjects/mesh/shatter/image/Factory';
import ShatterImageCreator from './gameobjects/mesh/shatter/image/Creator';

import ShatterRenderTextureFactory from './gameobjects/mesh/shatter/rendertexture/Factory';
import ShatterRenderTextureCreator from './gameobjects/mesh/shatter/rendertexture/Creator';

export default class extends Phaser.Plugins.BasePlugin { }


declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexShatterImage: typeof ShatterImageFactory,
            rexShatterRenderTexture: typeof ShatterRenderTextureFactory,
        }

        interface GameObjectCreator {
            rexShatterImage: typeof ShatterImageCreator,
            rexShatterRenderTexture: typeof ShatterRenderTextureCreator,
        }
    }
}