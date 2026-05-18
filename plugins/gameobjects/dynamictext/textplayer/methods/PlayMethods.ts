import { WaitComplete } from '../../../../utils/promise/WaitEvent';

export default {
    play(content?: any) {
        if (this.isPlaying) {
            return this;
        }

        this.removeChildren();
        this.parser.start(content); // Parse bbcode-content

        this.isPlaying = true;
        this.once('complete', function() {
            this.isPlaying = false;
        }, this);

        this.lastWrapResult = undefined;
        this.typingNextPage();
        return this;
    },

    playPromise(content?: any) {
        var promise = WaitComplete(this);
        this.play(content);
        return promise;
    }
}