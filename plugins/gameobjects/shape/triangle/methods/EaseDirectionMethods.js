import EaseValueTask from '../../../../utils/ease/EaseValueTask.js';

export default {
    setEaseDirectionDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.easeDirectionDuration = duration;
        return this;
    },

    playEaseDirectionation() {
        if (this.easeDirectionProgressTask === undefined) {
            this.easeDirectionProgressTask = new EaseValueTask(this, { eventEmitter: null });
        }

        this.easeDirectionProgressTask.restart({
            key: 'easeDirectionProgress',
            from: 0,
            to: 1,
            duration: this.easeDirectionDuration,
        });

        return this;
    },

    stopEaseDirection() {
        if (this.easeDirectionProgressTask === undefined) {
            return this;
        }

        this.easeDirectionProgressTask.stop();
        return this;
    },

}