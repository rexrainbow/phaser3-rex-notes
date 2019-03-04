var ForEachTileXY = function (callback, scope, order) {
    if (order === undefined) {
        order = 0;
    }
    switch (order) {
        case 0: // x+,y+
            for (var tileY = 0; tileY < this.height; tileY++) {
                for (var tileX = 0; tileX < this.width; tileX++) {
                    globTileXY.x = tileX;
                    globTileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, globTileXY, this);
                    } else {
                        callback(globTileXY, this);
                    }
                }
            }
            break;

        case 1: // x-,y+
            for (var tileY = 0; tileY < this.height; tileY++) {
                for (var tileX = this.width - 1; tileX >= 0; tileX--) {
                    globTileXY.x = tileX;
                    globTileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, globTileXY, this);
                    } else {
                        callback(globTileXY, this);
                    }
                }
            }
            break;

        case 2: // y+,x+
            for (var tileX = 0; tileX < this.width; tileX++) {
                for (var tileY = 0; tileY < this.height; tileY++) {
                    globTileXY.x = tileX;
                    globTileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, globTileXY, this);
                    } else {
                        callback(globTileXY, this);
                    }
                }
            }
            break;

        case 3: // y-,x+
            for (var tileX = 0; tileX < this.width; tileX++) {
                for (var tileY = this.height - 1; tileY >= 0; tileY--) {
                    globTileXY.x = tileX;
                    globTileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, globTileXY, this);
                    } else {
                        callback(globTileXY, this);
                    }
                }
            }
    }
    return this;
};

var globTileXY = {
    x: 0,
    y: 0
}

export default ForEachTileXY;