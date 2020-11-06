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

import SetValue from './utils/object/SetValue.js';

class PerspectiveImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
        pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);
        pluginManager.registerGameObject('rexPerspectiveCard', PerspectiveCardFactory, PerspectiveCardCreator);
        pluginManager.registerGameObject('rexPerspectiveCarousel', PerspectiveCarouselFactory, PerspectiveCarouselCreator);
        pluginManager.registerGameObject('rexPerspectiveImageCarousel', PerspectiveImageCarouselFactory, PerspectiveImageCarouselCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addContainerPerspective(parentContainer, config) {
        return new ContainerPerspective(parentContainer, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', PerspectiveImage);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', PerspectiveRenderTexture);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', PerspectiveCard);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveCarousel', PerspectiveCarousel);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveImageCarousel', PerspectiveImageCarousel);

SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

export default PerspectiveImagePlugin;