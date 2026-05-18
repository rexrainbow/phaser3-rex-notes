import PerspectiveImageFactory from './gameobjects/mesh/perspective/image/Factory';
import PerspectiveImageCreator from './gameobjects/mesh/perspective/image/Creator';
import PerspectiveImage from './gameobjects/mesh/perspective/image/Image';

import PerspectiveRenderTextureFactory from './gameobjects/mesh/perspective/rendertexture/Factory';
import PerspectiveRenderTextureCreator from './gameobjects/mesh/perspective/rendertexture/Creator';
import PerspectiveRenderTexture from './gameobjects/mesh/perspective/rendertexture/RenderTexture';

import PerspectiveCardFactory from './gameobjects/mesh/perspective/card/Factory';
import PerspectiveCardCreator from './gameobjects/mesh/perspective/card/Creator';
import PerspectiveCard from './gameobjects/mesh/perspective/card/Card';

import ContainerPerspective from './behaviors/containerperspective/ContainerPerspective';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class PerspectiveImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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

    addContainerPerspective(parentContainer?: any, config?: any) {
        return new ContainerPerspective(parentContainer, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', PerspectiveImage);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', PerspectiveRenderTexture);
SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', PerspectiveCard);

SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

export default PerspectiveImagePlugin;