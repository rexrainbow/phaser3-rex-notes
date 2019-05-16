import ObjectFactory from './input/gestures/ObjectFactory.js';

import TapFactory from './input/gestures/tap/TapFactory.js';
import PressFactory from './input/gestures/press/PressFactory.js';
import PanFactory from './input/gestures/pan/PanFactory.js';
import SwipeFactory from './input/gestures/swipe/SwipeFactory.js';
import PinchFactory from './input/gestures/pinch/PinchFactory.js';
import RotateFactory from './input/gestures/rotate/RotateFactory.js';

class GesturesPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

export default GesturesPlugin;