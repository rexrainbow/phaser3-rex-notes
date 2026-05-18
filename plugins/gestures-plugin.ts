import ObjectFactory from './input/gestures/ObjectFactory';

import TapFactory from './input/gestures/tap/Factory';
import PressFactory from './input/gestures/press/Factory';
import PanFactory from './input/gestures/pan/Factory';
import SwipeFactory from './input/gestures/swipe/Factory';
import PinchFactory from './input/gestures/pinch/Factory';
import RotateFactory from './input/gestures/rotate/Factory';

import { Plugins as PhaserPlugins } from 'phaser';
class GesturesPlugin extends PhaserPlugins.ScenePlugin {
    add: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    boot() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }
}

export default GesturesPlugin;