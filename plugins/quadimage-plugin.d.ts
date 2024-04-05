import QuadImageFactory from './gameobjects/mesh/quad/image/Factory';
import QuadImageCreator from './gameobjects/mesh/quad/image/Creator';

import QuadRenderTextureFactory from './gameobjects/mesh/quad/rendertexture/Factory';
import QuadRenderTextureCreator from './gameobjects/mesh/quad/rendertexture/Creator';

import SkewImageFactory from './gameobjects/mesh/quad/skewimage/Factory';
import SkewImageCreator from './gameobjects/mesh/quad/skewimage/Creator';

import SkewRenderTextureFactory from './gameobjects/mesh/quad/skewrendertexture/Factory';
import SkewRenderTextureCreator from './gameobjects/mesh/quad/skewrendertexture/Creator';

import ContainerSkew from './behaviors/containerskew/ContainerSkew.js';
import ContainerLite from './gameobjects/container/containerlite/ContainerLite';

export default class extends Phaser.Plugins.BasePlugin {
    addContainerPerspective(
        parentContainer: ContainerLite,
        config?: ContainerSkew.IConfig
    ): ContainerSkew
}


declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexQuadImage: typeof QuadImageFactory,
            rexQuadRenderTexture: typeof QuadRenderTextureFactory,
            rexSkewImage: typeof SkewImageFactory,
            rexSkewRenderTexture: typeof SkewRenderTextureFactory,
        }

        interface GameObjectCreator {
            rexQuadImage: typeof QuadImageCreator,
            rexQuadRenderTexture: typeof QuadRenderTextureCreator,
            rexSkewImage: typeof SkewImageCreator,
            rexSkewRenderTexture: typeof SkewRenderTextureCreator,
        }
    }
}