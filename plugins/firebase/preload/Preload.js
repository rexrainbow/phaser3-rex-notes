import DefaultConfig from './DefaultConfig.js';
import MergeRight from '../../utils/object/MergeRight.js';
import LoadScript from '../../utils/loader/LoadScript.js';
import AvailableTest from './AvailableTest.js';

var Preload = function (config) {
    config = MergeRight(DefaultConfig, config);

    return LoadScriptPromise(config.app)  // Load firebase-app
        .then(function () { // Load other SDK
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
        })
        .then(function () { // Wait until all vairalbe are available
            return AvailableTest(config);
        })
}

var LoadScriptPromise = function (url) {
    return new Promise(function (resolve, reject) {
        LoadScript(url, resolve);
    });
};

export default Preload;