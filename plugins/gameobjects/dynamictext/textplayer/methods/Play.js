var Play = function (content) {
    if (this.isPlaying) {
        return this;
    }

    this.removeChildren();
    this.parser.start(content); // Parse bbcode-content

    this.isPlaying = true;
    this.once('complete', function () {
        this.isPlaying = false;
    }, this);

    this.lastWrapResult = undefined;
    this.typingNextPage();
    return this;
}

export default Play;