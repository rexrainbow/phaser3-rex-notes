import DelaunayImageFactory from './gameobjects/mesh/delaunay/image/Factory';
import DelaunayImageCreator from './gameobjects/mesh/delaunay/image/Creator';
import DelaunayImage from './gameobjects/mesh/delaunay/image/Image';

import DelaunayRenderTextureFactory from './gameobjects/mesh/delaunay/rendertexture/Factory';
import DelaunayRenderTextureCreator from './gameobjects/mesh/delaunay/rendertexture/Creator';
import DelaunayRenderTexture from './gameobjects/mesh/delaunay/rendertexture/RenderTexture';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class DelaunayImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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