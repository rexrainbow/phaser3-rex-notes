import QuadImageFactory from './gameobjects/mesh/quad/image/Factory.js';
import QuadImageCreator from './gameobjects/mesh/quad/image/Creator.js';
import QuadImage from './gameobjects/mesh/quad/image/Image.js';

import QuadRenderTextureFactory from './gameobjects/mesh/quad/rendertexture/Factory.js';
import QuadRenderTextureCreator from './gameobjects/mesh/quad/rendertexture/Creator.js';
import QuadRenderTexture from './gameobjects/mesh/quad/rendertexture/RenderTexture.js';

import SetValue from './utils/object/SetValue.js';

class QuadImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexQuadImage', QuadImageFactory, QuadImageCreator);
        pluginManager.registerGameObject('rexQuadRenderTexture', QuadRenderTextureFactory, QuadRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.QuadImage', QuadImage);
SetValue(window, 'RexPlugins.GameObjects.QuadRenderTexture', QuadRenderTexture);

export default QuadImagePlugin;