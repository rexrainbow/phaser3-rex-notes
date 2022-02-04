import Factory from './gameobjects/dom/hiddeninputtext/Factory.js';
import Creator from './gameobjects/dom/hiddeninputtext/Creator.js';
import HiddenInputText from './gameobjects/dom/hiddeninputtext/HiddenInputText.js';
import SetValue from './utils/object/SetValue.js';

class HiddenInputTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexHiddenInputText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(textObject, config) {
        return new HiddenInputText(textObject, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.HiddenInputText', HiddenInputText);

export default HiddenInputTextPlugin;