import StencilMaskLayerFactory from './gameobjects/stencil/stencilmasklayer/Factory.js';
import StencilMaskLayerCreator from './gameobjects/stencil/stencilmasklayer/Creator.js';
import StencilMaskLayer from './gameobjects/stencil/stencilmasklayer/StencilMaskLayer.js';
import StencilMaskContainerFactory from './gameobjects/stencil/stencilmaskcontainer/Factory.js';
import StencilMaskContainerCreator from './gameobjects/stencil/stencilmaskcontainer/Creator.js';
import StencilMaskContainer from './gameobjects/stencil/stencilmaskcontainer/StencilMaskContainer.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class StencilMaskLayerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilMaskLayer', StencilMaskLayerFactory, StencilMaskLayerCreator);
        pluginManager.registerGameObject('rexStencilMaskContainer', StencilMaskContainerFactory, StencilMaskContainerCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilMaskLayer', StencilMaskLayer);
SetValue(window, 'RexPlugins.GameObjects.StencilMaskContainer', StencilMaskContainer);

export default StencilMaskLayerPlugin;
