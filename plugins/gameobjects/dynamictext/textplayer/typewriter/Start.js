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
    var delay = this.typingSpeed + offsetTime;
    var child = this.getNextChild();
    while (true) {
        if (!child) {
            if (this.timeline.isRunning) {
                // Wait until last animation is end
                this.timeline.once('complete', function () {
                    this.emit('complete');
                }, this);
            } else {
                this.emit('complete');
            }
            break;
        } else if (IsTypeable(child)) {
            // Typing this child
            var animation = this.typingAnimation;
            if (animation.duration > 0) {
                this.timeline.addTimer({
                    target: child,
                    duration: animation.duration,
                    onStart: animation.onStart,
                    onProgress: animation.onProgress,
                    onComplete: animation.onComplete,
                })
            } else {  // No animation, only invoke onStart callback
                animation.onStart(child, 0);
            }

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
                delay += this.typingSpeed;
            }
        } else if (IsCommand(child)) {
            child.exec();
        }

        child = this.getNextChild();
    }
}

export default Start;