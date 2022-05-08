var LocalXYToModelMatrixXY = function (localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobMatrixXY;
    }

    // -1(left) ~ 1(right)
    out.x = ((localX / this._modelWidth) - 0.5) * 2;

    // 1(top) ~ -1(bottom)
    out.y = (0.5 - (localY / this._modelHeight)) * 2;

    return out;
}

var GlobMatrixXY = {};

export default LocalXYToModelMatrixXY;