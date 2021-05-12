import { StopPlayEvent } from './utils/Events.js';

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
    return this;
}

var TypingNextPage = function (textPlayer, wrapCallback, result) {
    result = wrapCallback.call(textPlayer, result);

    textPlayer.emit('page.start');

    var OnTypingPageComplete = function () {
        textPlayer.emit(StopPlayEvent);  // Clear registed StopPlayEvent
        if (result.isLastPage) {
            textPlayer.emit('complete');
        } else {
            textPlayer.emit('page.complete');
            if (textPlayer.nextPageInput) {
                textPlayer.nextPageInput(TypingNextPage, [textPlayer, wrapCallback, result]);
            }

        }
    }

    // Remove event when typing pages has been canceled
    textPlayer.once(StopPlayEvent, function () {
        textPlayer.typeWriter.off('complete', OnTypingPageComplete, textPlayer);
    })

    textPlayer.typeWriter
        .once('complete', OnTypingPageComplete, textPlayer)
        .start(result.children);
}

export default Play;