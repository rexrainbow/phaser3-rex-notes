import Preload from './Preload.js';
import AwaitFile from '../../loader/awaitloader/awaitFile.js';
import Delay from '../../utils/promise/Delay.js'


const LoaderCallback = function (config) {
    var callback = function (successCallback, failureCallback) {
        Preload(config)
            .then(function () {
                return Delay(10);
            })
            .then(successCallback)
            .catch(failureCallback);
    }

    this.addFile(new AwaitFile(this, {
        type: 'firebaseScriptTag',
        url: '',
        key: (new Date()).getTime().toString(),
        config: { callback: callback }
    }));
    return this;
}

export default LoaderCallback;