import Factory from './gameobjects/layer/stencillayer/Factory.js';
import Creator from './gameobjects/layer/stencillayer/Creator.js';
import StencilLayer from './gameobjects/layer/stencillayer/StencilLayer.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class StencilLayerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilLayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilLayer', StencilLayer);

export default StencilLayerPlugin;