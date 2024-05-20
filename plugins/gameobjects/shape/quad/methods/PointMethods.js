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

    setTopSidePoint(t, x, y) {
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.setTopSidePoint(point.t, point.x, point.y);
            }
        } else {
            this.geom.setTopSidePoint(t, x, y);
        }
        this.dirty = true;
        return this;
    },

    setRightSidePoint(t, x, y) {
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.setRightSidePoint(point.t, point.x, point.y);
            }
        } else {
            this.geom.setRightSidePoint(t, x, y);
        }
        this.dirty = true;
        return this;
    },

    setBottomSidePoint(t, x, y) {
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.setBottomSidePoint(point.t, point.x, point.y);
            }
        } else {
            this.geom.setBottomSidePoint(t, x, y);
        }
        this.dirty = true;
        return this;
    },

    setLeftSidePoint(t, x, y) {
        if (Array.isArray(t)) {
            var points = t, point;
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                point = points[i];
                this.geom.setLeftSidePoint(point.t, point.x, point.y);
            }
        } else {
            this.geom.setLeftSidePoint(t, x, y);
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