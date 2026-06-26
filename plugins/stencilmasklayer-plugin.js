import Factory from './gameobjects/layer/stencilmasklayer/Factory.js';
import Creator from './gameobjects/layer/stencilmasklayer/Creator.js';
import StencilMaskLayer from './gameobjects/layer/stencilmasklayer/StencilMaskLayer.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class StencilMaskLayerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilMaskLayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilMaskLayer', StencilMaskLayer);

export default StencilMaskLayerPlugin;
