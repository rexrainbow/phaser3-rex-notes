const GetValue = Phaser.Utils.Objects.GetValue;

var Play = function (content) {
    this.removeChildren();
    this.content = text;
    this.parser.start(text); // Parse bbcode-content

    var wrapCallback = GetValue(this.wrapConfig, 'callback', this.runWordWrap);
    if (typeof (wrapCallback) === 'string') {
        wrapCallback = this[wrapCallback];
    }
    TypingNextPage.call(this, wrapCallback);
    return this;
}

var TypingNextPage = function (wrapCallback) {
    var result = wrapCallback.call(this);
    this.typeWriter
        .start(result.children)
        .then(function () {
            if (result.isLastPage) {
                this.emit('complete');
            } else {
                // TODO: wait click -- continue
                TypingNextPage(wrapCallback);
            }
        })
}

export default Play;