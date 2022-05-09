var LocalXYToModelMatrixXY = function (localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobMatrixXY;
    }

    //debugger
    out.x = this.pixelTransformMatrix.invertTransformX(localX);
    out.y = this.pixelTransformMatrix.invertTransformY(localY);

    return out;
}

var GlobMatrixXY = {};

export default LocalXYToModelMatrixXY;