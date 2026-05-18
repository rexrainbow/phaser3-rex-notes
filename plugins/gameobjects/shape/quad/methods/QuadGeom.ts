class QuadGeom {
    blx: any;
    bly: any;
    bottomSidePoints: any;
    brx: any;
    bry: any;
    height: any;
    leftSidePoints: any;
    rightSidePoints: any;
    tlx: any;
    tly: any;
    topSidePoints: any;
    trx: any;
    try: any;
    width: any;
    x: any;
    y: any;

    constructor(x?: any, y?: any, width?: any, height?: any) {
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

    setTo(x?: any, y?: any, width?: any, height?: any) {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
    }

    setPosition(x?: any, y?: any) {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width?: any, height?: any) {
        this.width = width;
        this.height = height;
        return this;
    }

    setTLPosition(x?: any, y?: any) {
        this.tlx = x;
        this.tly = y;
        return this;
    }

    setTRPosition(x?: any, y?: any) {
        this.trx = x;
        this.try = y;
        return this;
    }

    setBLPosition(x?: any, y?: any) {
        this.blx = x;
        this.bly = y;
        return this;
    }

    setBRPosition(x?: any, y?: any) {
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

    insertTopSidePoint(t?: any, x?: any, y?: any) {
        AddPoint(this.topSidePoints, t, x, y);
        return this;
    }

    insertRightSidePoint(t?: any, x?: any, y?: any) {
        AddPoint(this.rightSidePoints, t, x, y);
        return this;
    }

    insertBottomSidePoint(t?: any, x?: any, y?: any) {
        AddPoint(this.bottomSidePoints, t, x, y);
        return this;
    }

    insertLeftSidePoint(t?: any, x?: any, y?: any) {
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

var AddPoint = function(points?: any, t?: any, x?: any, y?: any) {
    if (typeof (t) !== 'number') {
        var config = t;
        t = config.t;
        x = config.x;
        y = config.y;
    }
    points.push({ t: t, x: x, y: y });
}

export default QuadGeom;