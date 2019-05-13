import ObjectFactory from './input/gestures/ObjectFactory.js';

import TapFactory from './input/gestures/tap/TapFactory.js';
import PressFactory from './input/gestures/press/PressFactory.js';
import PanFactory from './input/gestures/pan/PanFactory.js';
import SwipeFactory from './input/gestures/swipe/SwipeFactory.js';
import PinchFactory from './input/gestures/pinch/PinchFactory.js';
import RotateFactory from './input/gestures/rotate/RotateFactory.js';

import EventEmitterMethods from './utils/eventemitter/EventEmitterMethods.js';

class GesturesPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
        // Event emitter
        this.setEventEmitter();

        var config = {
            eventEmitter: this.getEventEmitter()
        }
        this.tap = this.add.tap(config);
        this.press = this.add.press(config);
        this.pan = this.add.pan(config);
        this.swipe = this.add.swipe(config);
        this.pinch = this.add.pinch(config);
        this.rotate = this.add.rotate(config);
    }
}

Object.assign(
    GesturesPlugin.prototype,
    EventEmitterMethods
);

export default GesturesPlugin;