import Delay from '../../utils/promise/Delay.js';

var AvailableTestPromise = async function (config) {
    while (!AvailableTest(config)) {
        await Delay(10);
    }
    return Promise.resolve();
}

var AvailableTest = function (config) {
    var testCallback;
    for (var k in config) {
        if (!config[k]) {
            continue;
        }
        testCallback = TestCallbacks[k];
        if (testCallback && !testCallback()) {
            return false;
        }
    }
    return true;
}

var TestCallbacks = {
    database: function () {
        return (firebase.database !== undefined);
    }
}

export default AvailableTestPromise;