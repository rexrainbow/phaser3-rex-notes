export default {
    play(key, ignoreIfPlaying) {
        return this.anims.play(key, ignoreIfPlaying);
    },

    playReverse(key, ignoreIfPlaying) {
        return this.anims.playReverse(key, ignoreIfPlaying);
    },

    playAfterDelay(key, delay) {
        return this.anims.playAfterDelay(key, delay);
    },

    playAfterRepeat(key, repeatCount) {
        return this.anims.playAfterRepeat(key, repeatCount);
    },

    chain(key) {
        return this.anims.chain(key);
    },

    stop() {
        return this.anims.stop();
    },

    stopAfterDelay(delay) {
        return this.anims.stopAfterDelay(delay);
    },

    stopAfterRepeat(repeatCount) {
        return this.anims.stopAfterRepeat(repeatCount);
    },

    stopOnFrame(frame) {
        return this.anims.stopOnFrame(frame);
    },
}