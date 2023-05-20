import { RemoveWaitEvents } from './const.js';

export default {
    waitTime(duration) {
        var timeline = this.parent.timeline
        timeline.delayEvent(duration, 'delay');

        // Clear delay event on timeline manually
        this.parent.once(RemoveWaitEvents, function () {
            timeline.removeDelayEvent('delay');
        });
        return this.waitEvent(timeline, 'delay');
    },
}