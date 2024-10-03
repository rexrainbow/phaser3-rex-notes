import Factory from './gameobjects/shape/roundrectangleprogress/Factory.js';
import Creator from './gameobjects/shape/roundrectangleprogress/Creator.js';
import RoundRectangleProgress from './gameobjects/shape/roundrectangleprogress/RoundRectangleProgress.js';
import SetValue from './utils/object/SetValue.js';

class RoundRectangleProgressPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangleProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangleProgress', RoundRectangleProgress);

export default RoundRectangleProgressPlugin;