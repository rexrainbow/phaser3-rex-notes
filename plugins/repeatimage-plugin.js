import Factory from './gameobjects/canvas/repeatimage/Factory.js';
import Creator from './gameobjects/canvas/repeatimage/Creator.js';
import RepeatImage from './gameobjects/canvas/repeatimage/RepeatImage.js';
import SetValue from './utils/object/SetValue.js';

class RepeatImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRepeatImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RepeatImage', RepeatImage);

export default RepeatImagePlugin;