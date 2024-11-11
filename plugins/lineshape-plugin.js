import Factory from './gameobjects/shape/line/Factory.js';
import Creator from './gameobjects/shape/line/Creator.js';
import Line from './gameobjects/shape/line/Line.js';
import SetValue from './utils/object/SetValue.js';

class LinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLineShape', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.LineShape', Line);

export default LinePlugin;