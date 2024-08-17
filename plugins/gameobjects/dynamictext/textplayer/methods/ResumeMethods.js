export default {
    resumeTyping(offsetTime) {
        // Resume typing
        this.typeWriter.resumeTyping(offsetTime);

        return this;
    },

    resume() {
        this.resumeTyping();

        // Resume typing timer, animation progresses and typing
        this.timeline.resume();

        return this;
    },

}