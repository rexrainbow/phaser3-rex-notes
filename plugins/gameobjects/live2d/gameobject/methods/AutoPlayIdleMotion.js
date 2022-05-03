import * as Const from '../model/Const.js';

var AutoPlayIdleMotion = function (motionName) {
    // Not regiester 'motions.complete' event, but also disable auto-play-idle-motion
    if (!this.autoPlayIdleMotionCallback && !motionName) {
        return this;
    }

    // Register 'motions.complete' event one time
    if (!this.autoPlayIdleMotionCallback) {
        this.autoPlayIdleMotionCallback = function () {
            if (!this.idleMotionName) {
                return;
            }
            this.startMotion(this.idleMotionName, undefined, Const.PriorityIdle);
        }
        this.on('motions.complete', this.autoPlayIdleMotionCallback, this);
    }
    this.idleMotionName = motionName;

    return this;
}

export default AutoPlayIdleMotion;