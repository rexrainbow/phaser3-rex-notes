import Factory from './gameobjects/inputtext/Factory.js';
import Creator from './gameobjects/inputtext/Creator.js';
import InputText from './gameobjects/inputtext/InputText.js';
import SetValue from './utils/object/SetValue.js';

class InputTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexInputText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

export default InputTextPlugin;