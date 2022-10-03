import Factory from './gameobjects/shape/simplelineprogress/Factory.js';
import Creator from './gameobjects/shape/simplelineprogress/Creator.js';
import SimpleLineProgress from './gameobjects/shape/simplelineprogress/SimpleLineProgress.js';
import SetValue from './utils/object/SetValue.js';

class SimpleLineProgressPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexSimpleLineProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.SimpleLineProgress', SimpleLineProgress);

export default SimpleLineProgressPlugin;