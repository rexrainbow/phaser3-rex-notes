import Factory from './gameobjects/dynamictext/dynamictext/Factory';
import Creator from './gameobjects/dynamictext/dynamictext/Creator';
import DynamicText from './gameobjects/dynamictext/dynamictext/DynamicText';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class DynamicTextPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexDynamicText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.DynamicText', DynamicText);

export default DynamicTextPlugin;