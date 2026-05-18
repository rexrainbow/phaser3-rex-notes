import NOOP from '../../../../plugins/utils/object/NOOP';

var QueueDirectionMap = {
    'bottom-to-top': 1,
    'top-to-bottom': 0,
    'right-to-left': 1,
    'left-to-right': 0,
}

export default {
    setQueueDirection(direction?: any) {
        if (typeof (direction) === 'string') {
            direction = QueueDirectionMap[direction];
        }
        this.rtl = (direction === 0);

        if (this.orientation === 1) {
            if (direction?: any) {
                // bottom-to-top
                this.queueDirection = 0;
            } else {
                // top-to-bottom
                this.queueDirection = 1;
            }
        } else {
            if (direction?: any) {
                // right-to-left
                this.queueDirection = 2;
            } else {
                // left-to-right
                this.queueDirection = 3;
            }
        }

        return this;
    },

    setCreateMessageLabelCallback(callback?: any) {
        this.createMessageLabelCallback = callback;
        return this;
    },

    setDisplayTime(time?: any) {
        this.displayTime = time;
        return this;
    },

    setTransitOutTime(time?: any) {
        this.transitOutTime = time;
        return this;
    },

    setTransitInTime(time?: any) {
        this.transitInTime = time;
        return this;
    },

    setTransitInCallback(callback?: any) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any, toastQueue?: any) {}
        return this;
    },

    setTransitOutCallback(callback?: any) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any, toastQueue?: any) {}
        return this;
    },
}