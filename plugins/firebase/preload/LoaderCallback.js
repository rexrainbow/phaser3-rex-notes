import Preload from './Preload.js';
import AwaitFile from '../../loader/awaitloader/awaitFile.js';


const LoaderCallback = function (config) {
    var callback = function (successCallback, failureCallback) {
        return Preload(config)
            .then(function () {
                setTimeout(successCallback, 0);
            })
            .catch(failureCallback)
    }

    this.addFile(new AwaitFile(this, {
        config: { callback: callback }
    }));
    return this;
}

export default LoaderCallback;