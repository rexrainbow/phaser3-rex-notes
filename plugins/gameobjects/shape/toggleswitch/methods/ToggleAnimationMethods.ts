import EaseValueTask from '../../../../utils/ease/EaseValueTask';

export default {
    setToggleAnimationDuration(duration?: any) {
        if (duration === undefined) {
            duration = 0;
        }
        this.toggleAnimDuration = duration;
        return this;
    },

    playToggleAnimation() {
        if (this.toggleAnimProgressTask === undefined) {
            this.toggleAnimProgressTask = new EaseValueTask(this, { eventEmitter: null });
        }

        this.toggleAnimProgressTask.restart({
            key: 'toggleAnimProgress',
            from: 0,
            to: 1,
            duration: this.toggleAnimDuration,
        });

        return this;
    },

    stopToggleAnimation() {
        if (this.toggleAnimProgressTask === undefined) {
            return this;
        }

        this.toggleAnimProgressTask.stop();
        return this;
    },

}