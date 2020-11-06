import PerspectiveImageFactory from './gameobjects/perspective/image/Factory.js';
import PerspectiveImageCreator from './gameobjects/perspective/image/Creator.js';
import PerspectiveImage from './gameobjects/perspective/image/Image.js';

import PerspectiveRenderTextureFactory from './gameobjects/perspective/rendertexture/Factory.js';
import PerspectiveRenderTextureCreator from './gameobjects/perspective/rendertexture/Creator.js';
import PerspectiveRenderTexture from './gameobjects/perspective/rendertexture/RenderTexture.js';

import PerspectiveCardFactory from './gameobjects/perspective/card/Factory.js';
import PerspectiveCardCreator from './gameobjects/perspective/card/Creator.js';
import PerspectiveCard from './gameobjects/perspective/card/Card.js';

import PerspectiveCarouselFactory from './gameobjects/perspective/carousel/Factory.js';
import PerspectiveCarouselCreator from './gameobjects/perspective/carousel/Creator.js';
import PerspectiveCarousel from './gameobjects/perspective/carousel/Carousel.js';

import PerspectiveImageCarouselFactory from './gameobjects/perspective/imagecarousel/Factory';
import PerspectiveImageCarouselCreator from './gameobjects/perspective/imagecarousel/Creator.js';
import PerspectiveImageCarousel from './gameobjects/perspective/imagecarousel/ImageCarousel.js';

import ContainerPerspective from './behaviors/containerperspective/ContainerPerspective.js';


Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveImage', PerspectiveImageFactory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveImage', PerspectiveImageCreator);

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveRenderTexture', PerspectiveRenderTextureCreator);

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveCard', PerspectiveCardFactory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveCard', PerspectiveCardCreator);

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveCarousel', PerspectiveCarouselFactory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveCarousel', PerspectiveCarouselCreator);

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveImageCarousel', PerspectiveImageCarouselFactory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveImageCarousel', PerspectiveImageCarouselCreator);

export default {
    PerspectiveImage: PerspectiveImage,
    PerspectiveRenderTexture: PerspectiveRenderTexture,
    PerspectiveCard: PerspectiveCard,
    PerspectiveCarousel: PerspectiveCarousel,
    PerspectiveImageCarousel: PerspectiveImageCarousel,

    ContainerPerspective: ContainerPerspective
}