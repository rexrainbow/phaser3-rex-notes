import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Play = function (content) {
    this.removeChildren();
    this.content = content;
    this.parser.start(content); // Parse bbcode-content

    var wrapCallback = GetValue(this.wrapConfig, 'callback', this.runWordWrap);
    if (typeof (wrapCallback) === 'string') {
        wrapCallback = this[wrapCallback];
    }
    TypingNextPage(this, wrapCallback);
    return WaitComplete(this);  // Promise
}

var TypingNextPage = function (textPlayer, wrapCallback, result) {
    result = wrapCallback.call(textPlayer, result);
    textPlayer.typeWriter
        .start(result.children)
        .then(function () {
            if (result.isLastPage) {
                textPlayer.emit('complete');
            } else {
                // TODO: wait click -- continue
                TypingNextPage(textPlayer, wrapCallback, result);
            }
        })
}

export default Play;