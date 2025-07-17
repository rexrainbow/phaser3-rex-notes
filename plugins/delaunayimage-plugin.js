import DelaunayImageFactory from './gameobjects/mesh/delaunay/image/Factory.js';
import DelaunayImageCreator from './gameobjects/mesh/delaunay/image/Creator.js';
import DelaunayImage from './gameobjects/mesh/delaunay/image/Image.js';

import DelaunayRenderTextureFactory from './gameobjects/mesh/delaunay/rendertexture/Factory.js';
import DelaunayRenderTextureCreator from './gameobjects/mesh/delaunay/rendertexture/Creator.js';
import DelaunayRenderTexture from './gameobjects/mesh/delaunay/rendertexture/RenderTexture.js';

import SetValue from './utils/object/SetValue.js';

class DelaunayImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexDelaunayImage', DelaunayImageFactory, DelaunayImageCreator);
        pluginManager.registerGameObject('rexDelaunayRenderTexture', DelaunayRenderTextureFactory, DelaunayRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.DelaunayImage', DelaunayImage);
SetValue(window, 'RexPlugins.GameObjects.DelaunayRenderTexture', DelaunayRenderTexture);

export default DelaunayImagePlugin;