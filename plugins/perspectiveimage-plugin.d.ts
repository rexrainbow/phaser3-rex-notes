import PerspectiveImageFactory from './gameobjects/mesh/perspective/image/Factory';
import PerspectiveImageCreator from './gameobjects/mesh/perspective/image/Creator';

import PerspectiveRenderTextureFactory from './gameobjects/mesh/perspective/rendertexture/Factory';
import PerspectiveRenderTextureCreator from './gameobjects/mesh/perspective/rendertexture/Creator';

import PerspectiveSpriteFactory from './gameobjects/mesh/perspective/sprite/Factory';
import PerspectiveSpriteCreator from './gameobjects/mesh/perspective/sprite/Creator';

import PerspectiveCardFactory from './gameobjects/mesh/perspective/card/Factory';
import PerspectiveCardCreator from './gameobjects/mesh/perspective/card/Creator';

import PerspectiveCarouselFactory from './gameobjects/mesh/perspective/carousel/Factory';
import PerspectiveCarouselCreator from './gameobjects/mesh/perspective/carousel/Creator';

import PerspectiveImageCarouselFactory from './gameobjects/mesh/perspective/imagecarousel/Factory';
import PerspectiveImageCarouselCreator from './gameobjects/mesh/perspective/imagecarousel/Creator';

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
            rexPerspectiveSprite: typeof PerspectiveSpriteFactory,
            rexPerspectiveCard: typeof PerspectiveCardFactory,
            rexPerspectiveCarousel: typeof PerspectiveCarouselFactory,
            rexPerspectiveImageCarousel: typeof PerspectiveImageCarouselFactory,
        }

        interface GameObjectCreator {
            rexPerspectiveImage: typeof PerspectiveImageCreator,
            rexPerspectiveRenderTexture: typeof PerspectiveRenderTextureCreator,
            rexPerspectiveSprite: typeof PerspectiveSpriteCreator,
            rexPerspectiveCard: typeof PerspectiveCardCreator,
            rexPerspectiveCarousel: typeof PerspectiveCarouselCreator,
            rexPerspectiveImageCarousel: typeof PerspectiveImageCarouselCreator,
        }
    }
}