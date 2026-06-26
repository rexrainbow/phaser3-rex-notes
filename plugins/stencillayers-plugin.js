import Factory from './gameobjects/layer/stencillayers/Factory.js';
import Creator from './gameobjects/layer/stencillayers/Creator.js';
import StencilLayers from './gameobjects/layer/stencillayers/StencilLayers.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class StencilLayersPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilLayers', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilLayers', StencilLayers);

export default StencilLayersPlugin;
