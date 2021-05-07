import Factory from './gameobjects/dynamictext/bbcodedynamictext/Factory';
import Creator from './gameobjects/dynamictext/bbcodedynamictext/Creator.js';
import BBCodeDynamicText from './gameobjects/dynamictext/bbcodedynamictext/BBCodeDynamicText.js';
import SetValue from './utils/object/SetValue.js';

class DynamicTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBBCodeDynamicText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.BBCodeDynamicText', BBCodeDynamicText);

export default DynamicTextPlugin;