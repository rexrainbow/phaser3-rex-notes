import LoadScript from './LoadScript';

var LoadScriptPromise = function(url?: any) {
    return new Promise(function(resolve?: any, reject?: any) {
        LoadScript(url, resolve);
    });
};

export default LoadScriptPromise;