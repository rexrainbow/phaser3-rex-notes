import Factory from './gameobjects/shader/effectlayer/outline/Factory.js';
import Creator from './gameobjects/shader/effectlayer/outline/Creator.js';
import OutlineEffectLayer from './gameobjects/shader/effectlayer/outline/OutlineEffectLayer.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class OutlineEffectLayerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexOutlineEffectLayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.OutlineEffectLayer', OutlineEffectLayer);

export default OutlineEffectLayerPlugin;