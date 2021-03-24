import PathBase from './PathBase.js';

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
}

export default Lines;