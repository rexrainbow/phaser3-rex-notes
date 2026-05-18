import QuadImageFactory from './gameobjects/mesh/quad/image/Factory';
import QuadImageCreator from './gameobjects/mesh/quad/image/Creator';
import QuadImage from './gameobjects/mesh/quad/image/Image';

import QuadRenderTextureFactory from './gameobjects/mesh/quad/rendertexture/Factory';
import QuadRenderTextureCreator from './gameobjects/mesh/quad/rendertexture/Creator';
import QuadRenderTexture from './gameobjects/mesh/quad/rendertexture/RenderTexture';

import SkewImageFactory from './gameobjects/mesh/quad/skewimage/Factory';
import SkewImageCreator from './gameobjects/mesh/quad/skewimage/Creator';
import SkewImage from './gameobjects/mesh/quad/skewimage/SkewImage';

import SkewRenderTextureFactory from './gameobjects/mesh/quad/skewrendertexture/Factory';
import SkewRenderTextureCreator from './gameobjects/mesh/quad/skewrendertexture/Creator';
import SkewRenderTexture from './gameobjects/mesh/quad/skewrendertexture/SkewRenderTexture';

import ContainerSkew from './behaviors/containerskew/ContainerSkew';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class QuadImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexQuadImage', QuadImageFactory, QuadImageCreator);
        pluginManager.registerGameObject('rexQuadRenderTexture', QuadRenderTextureFactory, QuadRenderTextureCreator);

        pluginManager.registerGameObject('rexSkewImage', SkewImageFactory, SkewImageCreator);
        pluginManager.registerGameObject('rexSkewRenderTexture', SkewRenderTextureFactory, SkewRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addContainerSkew(parentContainer?: any, config?: any) {
        return new ContainerSkew(parentContainer, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.QuadImage', QuadImage);
SetValue(window, 'RexPlugins.GameObjects.QuadRenderTexture', QuadRenderTexture);
SetValue(window, 'RexPlugins.GameObjects.SkewImage', SkewImage);
SetValue(window, 'RexPlugins.GameObjects.SkewRenderTexture', SkewRenderTexture);

SetValue(window, 'RexPlugins.GameObjects.ContainerSkew', ContainerSkew);

export default QuadImagePlugin;