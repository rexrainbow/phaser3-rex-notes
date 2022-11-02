import Copy from '../../../utils/array/Copy.js';

const DistanceBetween = Phaser.Math.Distance.Between;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;

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

        return this;
    },

    getLength() {
        this.updateAccumulationLengths();
        return this.accumulationLengths[this.accumulationLengths.length - 1];
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

    setDisplayPathLength(t) {
        t = Clamp(t, 0, 1);

        if (!this.pathDataSaved) {
            this.updateAccumulationLengths();
            this.savePathData();
        }

        this.pathData.length = 0;
        if (t === 1) {
            this.pathData.push(...this.pathDataSave);
        } else {
            var l = this.getLength() * t;
            var accumulationLengths = this.accumulationLengths, d;
            for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
                d = accumulationLengths[i];
                if (d <= l) {
                    this.pathData.push(this.pathDataSave[i * 2]);
                    this.pathData.push(this.pathDataSave[i * 2 + 1]);
                    if (d === l) {
                        break;
                    }
                } else {
                    var deltaD = d - accumulationLengths[i - 1];
                    t = 1 - ((d - l) / deltaD); // TODO: Bug
                    var x0 = this.pathDataSave[(i - 1) * 2];
                    var y0 = this.pathDataSave[(i - 1) * 2 + 1];
                    var x1 = this.pathDataSave[i * 2];
                    var y1 = this.pathDataSave[i * 2 + 1];
                    this.pathData.push(Linear(x0, x1, t));
                    this.pathData.push(Linear(y0, y1, t));
                    break;
                }
            }
        }

        return this;
    }
}