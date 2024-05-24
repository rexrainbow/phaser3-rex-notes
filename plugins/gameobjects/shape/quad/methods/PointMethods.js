import HasProperty from '../../../../utils/object/HasProperty.js';

var InjectPointAccessProperties = function (gameObject, key, point) {
    if (!key || HasProperty(gameObject, `${key}X`)) {
        return;
    }
    Object.defineProperty(gameObject, `${key}X`, {
        get: function () {
            return point.x;
        },
        set: function (value) {
            point.x = value;
            gameObject.dirty = true;
        },
    });
    Object.defineProperty(gameObject, `${key}Y`, {
        get: function () {
            return point.y;
        },
        set: function (value) {
            point.y = value;
            gameObject.dirty = true;
        },
    });
    Object.defineProperty(gameObject, `${key}T`, {
        get: function () {
            return point.t;
        },
        set: function (value) {
            point.t = value;
            gameObject.dirty = true;
        },
    });
}

export default {
    setTLPosition(x, y) {
        this.geom.setTLPosition(x, y);
        this.dirty = true;
        return this;
    },

    setTRPosition(x, y) {
        this.geom.setTRPosition(x, y);
        this.dirty = true;
        return this;
    },

    setBLPosition(x, y) {
        this.geom.setBLPosition(x, y);
        this.dirty = true;
        return this;
    },

    setBRPosition(x, y) {
        this.geom.setBRPosition(x, y);
        this.dirty = true;
        return this;
    },

    resetCornerPosition() {
        this.geom.resetCornerPosition();
        this.dirty = true;
        return this;
    },

    insertTopSidePoint(t, x, y, key) {
        var points = this.geom.topSidePoints;
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.insertTopSidePoint(point.t, point.x, point.y);
                InjectPointAccessProperties(this, point.key, points[points.length - 1]);
            }
        } else {
            this.geom.insertTopSidePoint(t, x, y);
            InjectPointAccessProperties(this, key, points[points.length - 1]);
        }
        this.dirty = true;
        return this;
    },

    insertRightSidePoint(t, x, y, key) {
        var points = this.geom.rightSidePoints;
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.insertRightSidePoint(point.t, point.x, point.y);
                InjectPointAccessProperties(this, point.key, points[points.length - 1]);
            }
        } else {
            this.geom.insertRightSidePoint(t, x, y);
            InjectPointAccessProperties(this, key, points[points.length - 1]);
        }
        this.dirty = true;
        return this;
    },

    insertBottomSidePoint(t, x, y, key) {
        var points = this.geom.bottomSidePoints;
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.insertBottomSidePoint(point.t, point.x, point.y);
                InjectPointAccessProperties(this, point.key, points[points.length - 1]);
            }
        } else {
            this.geom.insertBottomSidePoint(t, x, y);
            InjectPointAccessProperties(this, key, points[points.length - 1]);
        }
        this.dirty = true;
        return this;
    },

    insertLeftSidePoint(t, x, y, key) {
        var points = this.geom.leftSidePoints;
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.insertLeftSidePoint(point.t, point.x, point.y);
                InjectPointAccessProperties(this, point.key, points[points.length - 1]);
            }
        } else {
            this.geom.insertLeftSidePoint(t, x, y);
            InjectPointAccessProperties(this, key, points[points.length - 1]);
        }
        this.dirty = true;
        return this;
    },

    clearTopSidePoints() {
        this.geom.clearTopSidePoints();
        this.dirty = true;
        return this;
    },

    clearRightSidePoints() {
        this.geom.clearRightSidePoints();
        this.dirty = true;
        return this;
    },

    clearBottomSidePoints() {
        this.geom.clearBottomSidePoints();
        this.dirty = true;
        return this;
    },

    clearLeftSidePoints() {
        this.geom.clearLeftSidePoints();
        this.dirty = true;
        return this;
    },

    clearAllSidesPoints() {
        this.geom.clearAllSidesPoints();
        this.dirty = true;
        return this;
    },

}