import Copy from '../../../utils/array/Copy.js';

const DistanceBetween = Phaser.Math.Distance.Between;
const Wrap = Phaser.Math.Wrap;
const Linear = Phaser.Math.Linear;

var AddDisplayPathSegment = function (startT, endT) {
    var startL = this.totalPathLength * startT;
    var endL = this.totalPathLength * endT;

    var pathData = this.pathData,
        pathDataRef = this.pathDataSave;
    var accumulationLengths = this.accumulationLengths, d;
    var skipState = (startL > 0);
    var pIdx;
    for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
        pIdx = i * 2;
        d = accumulationLengths[i];

        if (skipState) {
            if (d < startL) {
                continue;
            } else if (d == startL) {
                skipState = false;
            } else { // d > startL
                var deltaD = d - accumulationLengths[i - 1];
                var t = 1 - ((d - startL) / deltaD);
                pathData.push(GetInterpolation(pathDataRef, pIdx - 2, pIdx, t));
                pathData.push(GetInterpolation(pathDataRef, pIdx - 1, pIdx + 1, t));
                skipState = false;
            }
        }

        if (d <= endL) {
            pathData.push(pathDataRef[pIdx]);
            pathData.push(pathDataRef[pIdx + 1]);
            if (d === endL) {
                break;
            }
        } else { // d > endL
            var deltaD = d - accumulationLengths[i - 1];
            var t = 1 - ((d - endL) / deltaD);
            pathData.push(GetInterpolation(pathDataRef, pIdx - 2, pIdx, t));
            pathData.push(GetInterpolation(pathDataRef, pIdx - 1, pIdx + 1, t));
            break;
        }
    }
}

var GetInterpolation = function (pathData, i0, i1, t) {
    var p0 = pathData[i0], p1 = pathData[i1];
    return Linear(p0, p1, t);
}

var WrapT = function (t) {
    if ((t % 1) === 0) {
        return 1;
    }
    return Wrap(t, 0, 1);
}

export default {
    updateAccumulationLengths() {
        if (this.accumulationLengths == null) {
            this.accumulationLengths = [];
        } else if (this.accumulationLengths.length === (this.pathData.length / 2)) {
            return this;
        }

        var accumulationLengths = this.accumulationLengths;
        var pathData = this.pathData;
        var prevX, prevY, x, y;
        var d, accumulationLength = 0;
        for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
            x = pathData[i];
            y = pathData[i + 1];

            d = (prevX === undefined) ? 0 : DistanceBetween(prevX, prevY, x, y);
            accumulationLength += d;
            accumulationLengths.push(accumulationLength);

            prevX = x;
            prevY = y;
        }

        this.totalPathLength = accumulationLength;

        return this;
    },

    savePathData() {
        if (this.pathDataSaved) {
            return this;
        }

        this.pathDataSave = [...this.pathData];
        this.pathData.length = 0;
        this.pathDataSaved = true;
        return this;
    },

    restorePathData() {
        if (!this.pathDataSaved) {
            return this;
        }

        Copy(this.pathData, this.pathDataSave);
        this.pathDataSave = undefined;
        this.pathDataSaved = false;
        return this;
    },

    setDisplayPathSegment(startT, endT) {
        if (endT === undefined) {
            endT = startT;
            startT = 0;
        }

        startT = WrapT(startT);
        endT = WrapT(endT);

        if (!this.pathDataSaved) {
            this.updateAccumulationLengths();
            this.savePathData();
        }

        this.pathData.length = 0;

        if (startT === endT) {
            // Do nothing
        } else if (startT < endT) {
            AddDisplayPathSegment.call(this, startT, endT);
        } else {
            AddDisplayPathSegment.call(this, startT, 1);
            AddDisplayPathSegment.call(this, 0, endT);
        }

        return this;
    }
}