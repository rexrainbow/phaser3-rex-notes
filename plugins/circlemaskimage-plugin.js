import Factory from './gameobjects/circlemaskimage/Factory.js';
import Creator from './gameobjects/circlemaskimage/Creator.js';
import CircleMaskImage from './gameobjects/circlemaskimage/CircleMaskImage.js';
import SetValue from './utils/object/SetValue.js';

class CircleMaskImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCircleMaskImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CircleMaskImage', CircleMaskImage);

export default CircleMaskImagePlugin;