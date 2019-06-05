import InputText from './gameobjects/inputtext/InputText.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class InputTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexInputText', this.addInputText, this.makeInputText);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addInputText(x, y, width, height, config) {
        var gameObject = new InputText(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    makeInputText(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new InputText(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }
}

SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

export default InputTextPlugin;