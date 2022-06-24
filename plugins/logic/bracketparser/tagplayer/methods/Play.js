var Play = function (content) {
    this.parser
        .once('complete', function () {
            this.emit('complete');
        }, this)
        .start(content);
    return this;
}

export default Play;