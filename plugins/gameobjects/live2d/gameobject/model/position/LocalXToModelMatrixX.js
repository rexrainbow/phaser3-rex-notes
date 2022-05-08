var LocalXYToModelMatrixXY = function (localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobMatrixXY;
    }

    // -0.5(left) ~ 0.5(right)
    out.x = ((localX / this._modelWidth) - 0.5) * 2;

    // 1(top) ~ -1(bottom)
    out.y = (0.5 - (localY / this._modelHeight)) * 2;

    return out;
}

var GlobMatrixXY = {};

export default LocalXYToModelMatrixXY;