var GetProgress = function (scene, execludeCount) {
    if (execludeCount === undefined) {
        execludeCount = 0;
    }
    var loader = scene.load;
    var total = loader.totalToLoad - execludeCount;
    var remainder = loader.list.size + loader.inflight.size - execludeCount;
    var progress = 1 - (remainder / total);
    return progress;
}

export default GetProgress;