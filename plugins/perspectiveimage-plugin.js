import PerspectiveImageFactory from './gameobjects/perspective/image/Factory.js';
import PerspectiveImageCreator from './gameobjects/perspective/image/Creator.js';
import PerspectiveImage from './gameobjects/perspective/image/Image.js';

import PerspectiveImageCardFactory from './gameobjects/perspective/imagecard/Factory.js';
import PerspectiveImageCardCreator from './gameobjects/perspective/imagecard/Creator.js';
import PerspectiveImageCard from './gameobjects/perspective/imagecard/ImageCard.js';

import PerspectiveRenderTextureFactory from './gameobjects/perspective/rendertexture/Factory.js';
import PerspectiveRenderTextureCreator from './gameobjects/perspective/rendertexture/Creator.js';
import PerspectiveRenderTexture from './gameobjects/perspective/rendertexture/RenderTexture.js';
import SetValue from './utils/object/SetValue.js';

class PerspectiveImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
        pluginManager.registerGameObject('rexPerspectiveImageCard', PerspectiveImageCardFactory, PerspectiveImageCardCreator);
        pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', PerspectiveImage);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveImageCard', PerspectiveImageCard);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', PerspectiveRenderTexture);

export default PerspectiveImagePlugin;