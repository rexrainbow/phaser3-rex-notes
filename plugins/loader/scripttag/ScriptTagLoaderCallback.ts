import AwaitFile from '../awaitloader/AwaitFile';
import LoadScriptPromise from '../../utils/loader/LoadScriptPromise';
import Delay from '../../utils/promise/Delay';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetFastValue = PhaserUtils.Objects.GetFastValue;

const LoaderCallback = function(url?: any) {
    if (Array.isArray(url)) {
        for (var i = 0, cnt = url.length; i < cnt; i++) {
            this.addFile(CreateAwiatFile(this, url[i]));
        }
    } else {
        this.addFile(CreateAwiatFile(this, url));
    }
    return this;
}

var CreateAwiatFile = function(loader?: any, url?: any, availableTest?: any) {
    if (IsPlainObject(url)) {
        var config = url;
        url = GetFastValue(config, 'url');
        availableTest = GetFastValue(config, 'availableTest');
    }

    var callback = function(successCallback?: any, failureCallback?: any) {

        LoadScriptPromise(url)
            .then(function() {
                if (!availableTest) {
                    return Promise.resolve();
                }

                var AvailableTestPromise = function() {
                    if (availableTest()) {
                        return Promise.resolve();
                    }

                    return Delay(10)
                        .then(function() {
                            return AvailableTestPromise();
                        });
                }
                return AvailableTestPromise();
            })
            .then(function() {
                successCallback()
            })
    }

    return new AwaitFile(loader, {
        type: 'scriptTag',
        config: { callback: callback }
    });
}

export default LoaderCallback;