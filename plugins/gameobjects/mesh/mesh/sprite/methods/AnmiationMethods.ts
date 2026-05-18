export default {
    play(key?: any, ignoreIfPlaying?: any) {
        return this.anims.play(key, ignoreIfPlaying);
    },

    playReverse(key?: any, ignoreIfPlaying?: any) {
        return this.anims.playReverse(key, ignoreIfPlaying);
    },

    playAfterDelay(key?: any, delay?: any) {
        return this.anims.playAfterDelay(key, delay);
    },

    playAfterRepeat(key?: any, repeatCount?: any) {
        return this.anims.playAfterRepeat(key, repeatCount);
    },

    chain(key?: any) {
        return this.anims.chain(key);
    },

    stop() {
        return this.anims.stop();
    },

    stopAfterDelay(delay?: any) {
        return this.anims.stopAfterDelay(delay);
    },

    stopAfterRepeat(repeatCount?: any) {
        return this.anims.stopAfterRepeat(repeatCount);
    },

    stopOnFrame(frame?: any) {
        return this.anims.stopOnFrame(frame);
    },
}