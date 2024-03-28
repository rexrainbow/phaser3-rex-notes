import GetLoader from '../system/GetLoader.js';

var GetProgress = function (loader, ignoreTaskCount) {
    if (ignoreTaskCount === undefined) {
        ignoreTaskCount = 0;
    }

    loader = GetLoader(loader);
    var total = loader.totalToLoad - ignoreTaskCount;
    var remainder = loader.list.size + loader.inflight.size - ignoreTaskCount;
    var progress = 1 - (remainder / total);
    return progress;
}

export default GetProgress;
