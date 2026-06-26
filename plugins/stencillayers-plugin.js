import StencilLayersFactory from './gameobjects/stencil/stencillayers/Factory.js';
import StencilLayersCreator from './gameobjects/stencil/stencillayers/Creator.js';
import StencilLayers from './gameobjects/stencil/stencillayers/StencilLayers.js';
import StencilContainersFactory from './gameobjects/stencil/stencilcontainers/Factory.js';
import StencilContainersCreator from './gameobjects/stencil/stencilcontainers/Creator.js';
import StencilContainers from './gameobjects/stencil/stencilcontainers/StencilContainers.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class StencilLayersPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilLayers', StencilLayersFactory, StencilLayersCreator);
        pluginManager.registerGameObject('rexStencilContainers', StencilContainersFactory, StencilContainersCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilLayers', StencilLayers);
SetValue(window, 'RexPlugins.GameObjects.StencilContainers', StencilContainers);

export default StencilLayersPlugin;
