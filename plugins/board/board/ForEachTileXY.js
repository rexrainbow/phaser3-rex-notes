'use strict'

var ForEachTileXY = function (callback, scope) {
    for (var tileX = 0; tileX < this.width; tileX++) {
        for (var tileY = 0; tileY < this.height; tileY++) {
            if (scope) {
                callback.call(scope, this, tileX, tileY);
            } else {
                callback(this, tileX, tileY);
            }
        }
    }
};

export default ForEachTileXY;