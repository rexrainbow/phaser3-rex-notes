import Factory from './gameobjects/shape/shapes/Factory.js';
import Creator from './gameobjects/shape/shapes/Creator.js';
import Shapes from './gameobjects/shape/shapes/Shapes.js';
import SetValue from './utils/object/SetValue.js';

class ShapesPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexShapes', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Shapes', Shapes);

export default ShapesPlugin;