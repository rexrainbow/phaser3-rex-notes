var ShowPage = function () {
    // Only can work after playing, and before processing last child
    if (!this.isPlaying || this.typeWriter.isLastChild()) {
        return this;
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
        .setSpeed(0)
        .skipCurrentTypingDelay()
        .setIgnoreWait(true)
        .setSkipTypingAnimation(true)

    return this;
}

export default ShowPage;