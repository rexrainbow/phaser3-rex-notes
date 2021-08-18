import EaseValueTask from '../../utils/ease/EaseValueTask.js'

export default {
    setNextTexture(texture, frame) {
        this.backImage.setTexture(texture, frame);
        return this;
    },

    transit(texture, frame, duration) {
        if (typeof (frame) === 'number') {
            duration = frame;
            frame = undefined;
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }

        this.setNextTexture(texture, frame);

        this.start();
        return this;
    },

    start() {
        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }
        this.easeValueTask.restart({
            key: 't', from: 0, to: 1,
            duration: this.duration
        });
        return this;
    },

    pause() {
        if (this.easeValueTask) {
            this.easeValueTask.pause();
        }
        return this;
    },

    resume() {
        if (this.easeValueTask) {
            this.easeValueTask.resume();
        }
        return this;
    },

    stop() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        this.setT(1);
        return this;
    },
}