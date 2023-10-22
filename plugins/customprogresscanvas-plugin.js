import Factory from './gameobjects/canvas/customprogress/Factory.js';
import Creator from './gameobjects/canvas/customprogress/Creator.js';
import CustomProgressCanvas from './gameobjects/canvas/customprogress/CustomProgress.js';
import SetValue from './utils/object/SetValue.js';

class CustomProgressPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCustomProgressCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CustomProgressCanvas', CustomProgressCanvas);

export default CustomProgressPlugin;