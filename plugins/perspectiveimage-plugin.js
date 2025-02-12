import PerspectiveImageFactory from './gameobjects/mesh/perspective/image/Factory.js';
import PerspectiveImageCreator from './gameobjects/mesh/perspective/image/Creator.js';
import PerspectiveImage from './gameobjects/mesh/perspective/image/Image.js';

import PerspectiveRenderTextureFactory from './gameobjects/mesh/perspective/rendertexture/Factory.js';
import PerspectiveRenderTextureCreator from './gameobjects/mesh/perspective/rendertexture/Creator.js';
import PerspectiveRenderTexture from './gameobjects/mesh/perspective/rendertexture/RenderTexture.js';

import PerspectiveCardFactory from './gameobjects/mesh/perspective/card/Factory.js';
import PerspectiveCardCreator from './gameobjects/mesh/perspective/card/Creator.js';
import PerspectiveCard from './gameobjects/mesh/perspective/card/Card.js';

import ContainerPerspective from './behaviors/containerperspective/ContainerPerspective.js';

import SetValue from './utils/object/SetValue.js';

class PerspectiveImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
        pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);        
        pluginManager.registerGameObject('rexPerspectiveCard', PerspectiveCardFactory, PerspectiveCardCreator);
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

SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

export default PerspectiveImagePlugin;