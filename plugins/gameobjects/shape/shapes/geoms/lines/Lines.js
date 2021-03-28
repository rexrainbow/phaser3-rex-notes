import PathBase from './PathBase.js';

const RotateAround = Phaser.Math.RotateAround;

class Lines extends PathBase {
    startAt(x, y) {
        this.dirty = true;
        this.pathData.length = 0;
        this.pathData.push(x, y);
        return this;
    }

    lineTo(x, y) {
        this.dirty = true;
        this.pathData.push(x, y);
        return this;
    }

    close() {
        this.dirty = true;
        this.closePath = true;
        return this;
    }

    rotateAround(x, y, angle) {
        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = this.pathData.length - 1; i < cnt; i += 2) {
            point.x = this.pathData[i];
            point.y = this.pathData[i + 1];
            RotateAround(point, x, y, angle);
            this.pathData[i] = point.x;
            this.pathData[i + 1] = point.y;
        }
        return this;
    }
}

export default Lines;