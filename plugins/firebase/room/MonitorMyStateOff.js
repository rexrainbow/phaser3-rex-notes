import GetRef from '../utils/GetRef.js';

var MonitorMyStateOff = function () {
    var paths = this.monitorRefPaths;
    for (var i = 0, cnt = paths.length; i < cnt; i++) {
        GetRef(this.database, this.rootPath, paths[i]).off();
    }
    paths.length = 0;
    return this;
}

export default MonitorMyStateOff;