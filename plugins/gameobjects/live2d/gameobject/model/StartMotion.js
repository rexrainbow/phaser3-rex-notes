import * as Const from './Const.js';

var StartMotion = function (group, no, priority, onComplete) {
    if (priority === Const.PriorityForce) {
        this._motionManager.setReservePriority(priority);
    } else if (!this._motionManager.reserveMotion(priority)) {
        // Error
        return this;
    }

    var name = `${group}_${no}`;
    var motion = this._motions.getValue(name);
    motion.setFinishedMotionHandler(onComplete);

    this._motionManager.startMotionPriority(
        motion,
        false,
        priority
    );

    return this;
}

export default StartMotion;