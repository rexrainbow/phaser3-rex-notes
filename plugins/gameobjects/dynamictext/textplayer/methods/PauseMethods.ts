export default {
    pauseTyping() {
        // Pause typing
        this.typeWriter.pauseTyping();

        return this;
    },

    pause() {
        this.pauseTyping();
        
        // Pause typing, typing timer and animation progresses
        this.timeline.pause();

        return this;
    },

};