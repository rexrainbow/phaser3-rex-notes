import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';
import { IsTypeable, IsCommand } from '../../dynamictext/bob/Types.js';

var Start = function (children) {
    this.children = children;
    this.index = 0;
    this.onTypeStart(children);
    Typing.call(this);
    return WaitComplete(this);  // Promise
}

var Typing = function (offsetTime) {
    if (offsetTime === undefined) {
        offsetTime = 0;
    }

    var child = this.getNextChild();
    while (true) {
        if (!child) {
            if (this.timeline.isRunning) {
                // Wait until last animationConfig is end
                this.timeline.once('complete', function () {
                    this.emit('complete');
                }, this);
            } else {
                this.emit('complete');
            }
            break;
        } else if (IsTypeable(child)) {
            // Typing this child
            var animationConfig = this.animationConfig;
            if (animationConfig.duration > 0) {
                this.timeline.addTimer({
                    target: child,
                    duration: animationConfig.duration,
                    yoyo: animationConfig.yoyo,
                    onStart: animationConfig.onStart,
                    onProgress: animationConfig.onProgress,
                    onComplete: animationConfig.onComplete,
                })
            } else {  // No animationConfig, only invoke onStart callback
                if (animationConfig.onStart) {
                    animationConfig.onStart(child, 0);
                }
            }

            var delay = this.speed + offsetTime;
            if (delay > 0) {
                // Typing next character later
                this.timeline.addTimer({
                    target: this,
                    duration: delay,
                    onComplete: function (target, t, timer) {
                        Typing.call(target, timer.remainder);
                    }
                })
                break;
            } else {
                delay += this.speed;
            }
        } else if (IsCommand(child)) {
            child.exec();
        }

        child = this.getNextChild();
    }
}

export default Start;