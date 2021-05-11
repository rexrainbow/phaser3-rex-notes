var ShowPage = function (speed) {
    // Only can work after playing, and before processing last child
    if (!this.isPlaying || this.typeWriter.isLastChild()) {
        return this;
    }
    if (speed === undefined) {
        speed = 0;
    }

    // Save parameters
    var typingSpeedSave = this.typeWriter.speed;
    var ignoreWaitSave = this.typeWriter.ignoreWait;
    var skipTypingAnimationSave = this.typeWriter.skipTypingAnimation;

    this.typeWriter
        .once('complete', function () {
            // Recover parameters
            this.typeWriter
                .setSpeed(typingSpeedSave)
                .setIgnoreWait(ignoreWaitSave)
                .setSkipTypingAnimation(skipTypingAnimationSave)

        }, this)
        .setSpeed(speed)
        .skipCurrentTypingDelay()
        .setIgnoreWait(true)
        .setSkipTypingAnimation(true)

    return this;
}

export default ShowPage;