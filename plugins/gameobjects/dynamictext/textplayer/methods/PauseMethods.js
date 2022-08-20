export default {
    pause() {
        // Pause typing, typing timer and animation progresses
        this.typeWriter.pauseTyping().pause();

        return this;
    },

    pauseTyping() {
        // Pause typing
        this.typeWriter.pauseTyping();

        return this;
    }
};