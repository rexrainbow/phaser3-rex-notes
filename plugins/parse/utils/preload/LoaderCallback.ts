import Preload from './Preload';
import AwaitFile from '../../../loader/awaitloader/AwaitFile';

const LoaderCallback = function(url?: any) {
    var callback = function(successCallback?: any, failureCallback?: any) {
        return Preload(url)
            .then(function() {
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