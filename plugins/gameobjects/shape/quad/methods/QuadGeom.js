class QuadGeom {
    constructor(x, y, width, height) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }

        this.setTo(x, y, width, height);

        this.tlx = 0;
        this.tly = 0;
        this.trx = 0;
        this.try = 0;
        this.blx = 0;
        this.bly = 0;
        this.brx = 0;
        this.bry = 0;
        this.topSidePoints = [];
        this.rightSidePoints = [];
        this.bottomSidePoints = [];
        this.leftSidePoints = [];
    }

    setTo(x, y, width, height) {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    setTLPosition(x, y) {
        this.tlx = x;
        this.tly = y;
        return this;
    }

    setTRPosition(x, y) {
        this.trx = x;
        this.try = y;
        return this;
    }

    setBLPosition(x, y) {
        this.blx = x;
        this.bly = y;
        return this;
    }

    setBRPosition(x, y) {
        this.brx = x;
        this.bry = y;
        return this;
    }

    resetCornerPosition() {
        this
            .setTLPosition(0, 0)
            .setTRPosition(0, 0)
            .setBLPosition(0, 0)
            .setBRPosition(0, 0);

        return this;
    }

    setTopSidePoint(t, x, y) {
        AddPoint(this.topSidePoints, t, x, y);
        return this;
    }

    setRightSidePoint(t, x, y) {
        AddPoint(this.rightSidePoints, t, x, y);
        return this;
    }

    setBottomSidePoint(t, x, y) {
        AddPoint(this.bottomSidePoints, t, x, y);
        return this;
    }

    setLeftSidePoint(t, x, y) {
        AddPoint(this.leftSidePoints, t, x, y);
        return this;
    }

    clearTopSidePoints() {
        this.topSidePoints.length = 0;
        return this;
    }

    clearRightSidePoints() {
        this.rightSidePoints.length = 0;
        return this;
    }

    clearBottomSidePoints() {
        this.bottomSidePoints.length = 0;
        return this;
    }

    clearLeftSidePoints() {
        this.leftSidePoints.length = 0;
        return this;
    }

    clearAllSidesPoints() {
        this
            .clearTopSidePoints()
            .clearRightSidePoints()
            .clearBottomSidePoints()
            .clearLeftSidePoints();

        return this;

    }
}

var GetPoint = function (points, t) {
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        if (points[i].t === t) {
            return points[i];
        }
    }

    return null;
}

var SortPoints = function (points) {
    points.sort(function (pointA, pointB) {
        return pointA.t - pointB.t;
    })
}

var AddPoint = function (points, t, x, y) {
    var point = GetPoint(points);
    if (point) {
        point.x = x;
        point.y = y;
    } else {
        points.push({ t: t, x: x, y: y });
        if (points.length > 1) {
            SortPoints(points);
        }
    }
}

export default QuadGeom;