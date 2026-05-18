import SpiralCurve from './spiralcurve';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class SpiralCurvePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x?: any, y?: any, startRadius?: any, endRadius?: any, startAngle?: any, endAngle?: any, rotation?: any) {
        return new SpiralCurve(x, y, startRadius, endRadius, startAngle, endAngle, rotation);
    }
}

SetValue(window, 'RexPlugins.Curve.SpiralCurve', SpiralCurve);

export default SpiralCurvePlugin;