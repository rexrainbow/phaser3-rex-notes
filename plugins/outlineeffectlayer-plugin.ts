import Factory from './gameobjects/shader/effectlayer/outline/Factory';
import Creator from './gameobjects/shader/effectlayer/outline/Creator';
import OutlineEffectLayer from './gameobjects/shader/effectlayer/outline/OutlineEffectLayer';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class OutlineEffectLayerPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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