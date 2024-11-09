import Factory from './gameobjects/shape/curve/Factory.js';
import Creator from './gameobjects/shape/curve/Creator.js';
import Curve from './gameobjects/shape/curve/Curve.js';
import SetValue from './utils/object/SetValue.js';

class CurvePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCurveShape', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CurveShape', Curve);

export default CurvePlugin;