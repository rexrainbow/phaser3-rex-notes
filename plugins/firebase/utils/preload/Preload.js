import DefaultConfig from './DefaultConfig.js';
import MergeRight from '../../../utils/object/MergeRight.js';
import LoadScript from '../../../utils/loader/LoadScript.js';
import AvailableTest from './AvailableTest.js';

var Preload = function (urlConfig, firebaseConfig) {
    urlConfig = MergeRight(DefaultConfig, urlConfig);

    return LoadScriptPromise(urlConfig.app)  // Load firebase-app
        .then(function () { // Load other SDK
            var count = 0;
            var url;
            for (var k in urlConfig) {
                if (k === 'app') {
                    continue;
                }
                url = urlConfig[k];
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
            return AvailableTest(urlConfig);
        })
        .then(function(){
            if (firebaseConfig !== undefined) {
                firebase.initializeApp(firebaseConfig);
            }
            return Promise.resolve();
        })
}

var LoadScriptPromise = function (url) {
    return new Promise(function (resolve, reject) {
        LoadScript(url, resolve);
    });
};

export default Preload;