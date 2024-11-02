import DrawShape from './DrawShape.js';

var SetOrigin = function (originX, originY) {
    if (originY === undefined) {
        originY = originX;
    }

    var parent = this.parent;
    if (originX === undefined) {
        originX = parent.originX;
    }
    if (originY === undefined) {
        originY = parent.originY;
    }
    if ((this.originX === originX) && (this.originY === originY)) {
        return this;
    }

    this.originX = originX;
    this.originY = originY;

    DrawShape.call(this,
        this.width, this.height, this.padding,
        originX, originY,
    );
    return this;
}

export default SetOrigin;