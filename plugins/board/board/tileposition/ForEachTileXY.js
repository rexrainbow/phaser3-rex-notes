var ForEachTileXY = function (callback, scope, order) {
    if (order === undefined) {
        order = 0;
    }
    switch (order) {
        case 0: // x+,y+
            for (var tileY = 0; tileY < this.height; tileY++) {
                for (var tileX = 0; tileX < this.width; tileX++) {
                    tmp.x = tileX;
                    tmp.y = tileY;
                    if (scope) {
                        callback.call(scope, tmp, this);
                    } else {
                        callback(tmp, this);
                    }
                }
            }
            break;

        case 1: // x-,y+
            for (var tileY = 0; tileY < this.height; tileY++) {
                for (var tileX = this.width - 1; tileX >= 0; tileX--) {
                    tmp.x = tileX;
                    tmp.y = tileY;
                    if (scope) {
                        callback.call(scope, tmp, this);
                    } else {
                        callback(tmp, this);
                    }
                }
            }
            break;

        case 2: // y+,x+
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
            break;

        case 3: // y-,x+
            for (var tileX = 0; tileX < this.width; tileX++) {
                for (var tileY = this.height - 1; tileY >= 0; tileY--) {
                    tmp.x = tileX;
                    tmp.y = tileY;
                    if (scope) {
                        callback.call(scope, tmp, this);
                    } else {
                        callback(tmp, this);
                    }
                }
            }
    }
    return this;
};

var tmp = {
    x: 0,
    y: 0
}

var ORDERTYPE = {
    'x+': 0,
    'x-': 1,
    'y+': 2,
    'y-': 3
}

export default ForEachTileXY;