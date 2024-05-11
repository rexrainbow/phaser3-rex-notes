import NOOP from '../../../../plugins/utils/object/NOOP.js';

var QueueDirectionMap = {
    'bottom-to-top': 1,
    'top-to-bottom': 0,
    'right-to-left': 1,
    'left-to-right': 0,
}

export default {
    setQueueDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = QueueDirectionMap[direction];
        }
        this.rtl = (direction === 0);

        if (this.orientation === 1) {
            if (direction) {
                // bottom-to-top
                this.queueDirection = 0;
            } else {
                // top-to-bottom
                this.queueDirection = 1;
            }
        } else {
            if (direction) {
                // right-to-left
                this.queueDirection = 2;
            } else {
                // left-to-right
                this.queueDirection = 3;
            }
        }

        return this;
    },

    setCreateMessageLabelCallback(callback) {
        this.createMessageLabelCallback = callback;
        return this;
    },

    setDisplayTime(time) {
        this.displayTime = time;
        return this;
    },

    setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
    },

    setTransitInTime(time) {
        this.transitInTime = time;
        return this;
    },

    setTransitInCallback(callback) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject, duration, toastQueue) {}
        return this;
    },

    setTransitOutCallback(callback) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject, duration, toastQueue) {}
        return this;
    },
}