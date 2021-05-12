import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Play = function (content) {
    if (this.isPlaying) {
        return Promise.resolve();
    }

    this.removeChildren();
    this.content = content;
    this.parser.start(content); // Parse bbcode-content

    var wrapCallback = GetValue(this.wrapConfig, 'callback', this.runWordWrap);
    if (typeof (wrapCallback) === 'string') {
        wrapCallback = this[wrapCallback];
    }

    this.isPlaying = true;
    this.once('complete', function () {
        this.isPlaying = false;
    }, this);

    TypingNextPage(this, wrapCallback);
    return WaitComplete(this);  // Promise
}

var TypingNextPage = function (textPlayer, wrapCallback, result) {
    result = wrapCallback.call(textPlayer, result);

    textPlayer.emit('page.start');

    textPlayer.typeWriter
        .once('complete', function () {
            if (result.isLastPage) {
                textPlayer.emit('complete');
            } else {
                textPlayer.emit('page.complete');
                if (textPlayer.nextPageInput) {
                    textPlayer.nextPageInput(TypingNextPage, [textPlayer, wrapCallback, result]);
                }

            }
        })
        .start(result.children)
        // TODO: If page typing is canceled?
}

export default Play;