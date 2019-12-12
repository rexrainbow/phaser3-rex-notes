import DefaultConfig from './DefaultConfig.js'
import MergeRight from '../../utils/object/MergeRight.js';
import LoadScript from '../../utils/loader/LoadScript.js';

var Preload = function (config) {
    config = MergeRight(DefaultConfig, config);
    return LoadScriptPromise(config.app)
        .then(function () {
            var count = 0;
            var url;
            for (var k in config) {
                if (k === 'app') {
                    continue;
                }
                url = config[k];
                if (!url) {
                    continue;
                }
                count++;
                LoadScript(url, function () {
                    count--;
                    if (count === 0) {
                        return Promise.resolve();
                    }
                })
            }

            if (count === 0) {
                return Promise.resolve();
            }
        }); // Promise
}

var LoadScriptPromise = function (url) {
    return new Promise(function (resolve, reject) {
        // Load firebase-app
        LoadScript(url, resolve);
    });
};

export default Preload;