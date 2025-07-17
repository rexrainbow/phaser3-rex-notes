import DelaunayImageFactory from './gameobjects/mesh/delaunay/image/Factory';
import DelaunayImageCreator from './gameobjects/mesh/delaunay/image/Creator';

import DelaunayRenderTextureFactory from './gameobjects/mesh/delaunay/rendertexture/Factory';
import DelaunayRenderTextureCreator from './gameobjects/mesh/delaunay/rendertexture/Creator';

export default class extends Phaser.Plugins.BasePlugin { }


declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexDelaunayImage: typeof DelaunayImageFactory,
            rexDelaunayRenderTexture: typeof DelaunayRenderTextureFactory,
        }

        interface GameObjectCreator {
            rexDelaunayImage: typeof DelaunayImageCreator,
            rexDelaunayRenderTexture: typeof DelaunayRenderTextureCreator,
        }
    }
}