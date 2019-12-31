import LoadScript from '../../utils/loader/LoadScript.js';
import AwaitFile from '../awaitloader/AwaitFile.js';


const loaderCallback = function (url) {
    if (Array.isArray(url)) {
        for (var i = 0, cnt = url.length; i < cnt; i++) {
            this.addFile(CreateAwiatFile(this, url[i]));
        }
    } else {
        this.addFile(CreateAwiatFile(this, url));
    }
    return this;
}

var CreateAwiatFile = function (loader, url) {
    var callback = function (successCallback, failureCallback) {
        LoadScript(url, successCallback);
    }

    return new AwaitFile(loader, {
        type: 'scriptTag',
        config: { callback: callback }
    });
}

export default loaderCallback;