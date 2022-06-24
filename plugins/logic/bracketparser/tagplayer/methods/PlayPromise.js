import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

var PlayPromise = function (content) {
    var promise = WaitComplete(this);
    this.play(content);
    return promise;
}

export default PlayPromise;