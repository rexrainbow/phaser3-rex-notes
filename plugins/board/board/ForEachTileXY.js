var ForEachTileXY = function (callback, scope) {
    for (var tileX = 0; tileX < this.width; tileX++) {
        for (var tileY = 0; tileY < this.height; tileY++) {
            tmp.x = tileX;
            tmp.y = tileY;
            if (scope) {
                callback.call(scope, tmp, this);
            } else {
                callback(tmp, this);
            }
        }
    }
};
var tmp = {
    x: 0,
    y: 0
}

export default ForEachTileXY;