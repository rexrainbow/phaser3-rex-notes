import Sizer from '../sizer/Sizer';
import Methods from './methods/Methods';
import DefaultTransitionCallbacks from './methods/DefaultTransitionMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ToastQueue extends Sizer {
    setCreateMessageLabelCallback: any;
    setDisplayTime: any;
    setQueueDirection: any;
    setTransitInCallback: any;
    setTransitInTime: any;
    setTransitOutCallback: any;
    setTransitOutTime: any;
    type: any;

    constructor(scene?: any, config?: any) {
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