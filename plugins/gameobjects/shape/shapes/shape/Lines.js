import PathBase from './PathBase.js';

class Lines extends PathBase {
    startAt(x, y) {
        this.isDirty = true;
        this.pathData.length = 0;
        this.pathData.push(x, y);
        return this;
    }

    lineTo(x, y) {
        this.isDirty = true;
        this.pathData.push(x, y);
        return this;
    }

    close() {
        this.isDirty = true;
        this.closePath = true;
        return this;
    }
}

export default Lines;