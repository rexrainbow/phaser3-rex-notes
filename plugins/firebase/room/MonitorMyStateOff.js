var MonitorMyStateOff = function () {
    var paths = this.monitorRefPaths;
    for (var i = 0, cnt = paths.length; i < cnt; i++) {
        this.getRootRef(paths[i]).off();
    }
    paths.length = 0;
    return this;
}

export default MonitorMyStateOff;