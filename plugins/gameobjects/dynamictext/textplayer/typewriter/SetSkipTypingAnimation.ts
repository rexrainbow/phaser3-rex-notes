import { TypingAnimationTimerType, } from './TimerTypes';

var SetSkipTypingAnimation = function(value?: any) {
    if (value === undefined) {
        value = true;
    }
    this.skipTypingAnimation = value;

    if (value?: any) {
        // Skip current playing typing-animation
        var timers = this.timeline.getTimers(TypingAnimationTimerType);
        for (var i = 0, cnt = timers.length; i < cnt; i++) {
            timers[i].seek(1);
        }
    }
    return this;
}

export default SetSkipTypingAnimation;