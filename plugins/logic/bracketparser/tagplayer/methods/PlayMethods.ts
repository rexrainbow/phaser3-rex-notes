import { WaitComplete } from '../../../../utils/promise/WaitEvent';

export default {
    play(content?: any) {
        this.parser.start(content);
        return this;
    },

    playPromise(content?: any) {
        var promise = WaitComplete(this);
        this.play(content);
        return promise;
    },

}