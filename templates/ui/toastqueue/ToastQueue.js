import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';
import DefaultTransitionCallbacks from './methods/DefaultTransitionMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ToastQueue extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1;
        }
        super(scene, config);
        this.type = 'rexToastQueue';

        this.setCreateMessageLabelCallback(GetValue(config, 'createMessageLabelCallback'));
        this.setQueueDirection(GetValue(config, 'queueDirection', 1));        
        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setDisplayTime(GetValue(config, 'duration.hold', 2000));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn', DefaultTransitionCallbacks.transitIn));
        this.setTransitOutCallback(GetValue(config, 'transitOut', DefaultTransitionCallbacks.transitOut));
    }
}

Object.assign(
    ToastQueue.prototype,
    Methods
)

export default ToastQueue;