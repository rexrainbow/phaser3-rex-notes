import GetLoader from '../system/GetLoader';

var GetProgress = function(loader?: any, ignoreTaskCount?: any) {
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