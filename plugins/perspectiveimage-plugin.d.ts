import PerspectiveImageFactory from './gameobjects/mesh/perspective/image/Factory';
import PerspectiveImageCreator from './gameobjects/mesh/perspective/image/Creator';

import PerspectiveRenderTextureFactory from './gameobjects/mesh/perspective/rendertexture/Factory';
import PerspectiveRenderTextureCreator from './gameobjects/mesh/perspective/rendertexture/Creator';

import PerspectiveCardFactory from './gameobjects/mesh/perspective/card/Factory';
import PerspectiveCardCreator from './gameobjects/mesh/perspective/card/Creator';

import ContainerPerspective from './behaviors/containerperspective/ContainerPerspective.js';
import ContainerLite from './gameobjects/container/containerlite/ContainerLite';

export default class extends Phaser.Plugins.BasePlugin {
    addContainerPerspective(
        parentContainer: ContainerLite,
        config?: ContainerPerspective.IConfig
    ): ContainerPerspective
}


declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexPerspectiveImage: typeof PerspectiveImageFactory,
            rexPerspectiveRenderTexture: typeof PerspectiveRenderTextureFactory,
            rexPerspectiveCard: typeof PerspectiveCardFactory,
        }

        interface GameObjectCreator {
            rexPerspectiveImage: typeof PerspectiveImageCreator,
            rexPerspectiveRenderTexture: typeof PerspectiveRenderTextureCreator,
            rexPerspectiveCard: typeof PerspectiveCardCreator,
        }
    }
}