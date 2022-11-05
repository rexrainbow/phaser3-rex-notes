import Factory from './gameobjects/shape/checkbox/Factory.js';
import Creator from './gameobjects/shape/checkbox/Creator.js';
import Checkbox from './gameobjects/shape/checkbox/Checkbox.js';
import SetValue from './utils/object/SetValue.js';

class CheckboxPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCheckbox', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Checkbox', Checkbox);

export default CheckboxPlugin;