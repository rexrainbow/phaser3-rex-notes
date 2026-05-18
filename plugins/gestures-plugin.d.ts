import TapFactory from './input/gestures/tap/Factory';
import PressFactory from './input/gestures/press/Factory';
import PanFactory from './input/gestures/pan/Factory';
import SwipeFactory from './input/gestures/swipe/Factory';
import PinchFactory from './input/gestures/pinch/Factory';
import RotateFactory from './input/gestures/rotate/Factory';

export default GesturesPlugin;

declare class Factories {
    tap: typeof TapFactory;
    press: typeof PressFactory;
    pan: typeof PanFactory;
    swipe: typeof SwipeFactory;
    pinch: typeof PinchFactory;
    rotate: typeof RotateFactory;
}

declare class GesturesPlugin extends Phaser.Plugins.BasePlugin {
    add: Factories;
}

import TapClass from './input/gestures/tap/Tap';
import PressClass from './input/gestures/press/Press';
import PanClass from './input/gestures/pan/Pan';
import SwipeClass from './input/gestures/swipe/Swipe';
import PinchClass from './input/gestures/pinch/Pinch';
import RotateClass from './input/gestures/rotate/Rotate';

declare namespace GesturesPlugin {
    type Tap = TapClass;
    type Press = PressClass;
    type Pan = PanClass;
    type Swipe = SwipeClass;
    type Pinch = PinchClass;
    type Rotate = RotateClass;

}
