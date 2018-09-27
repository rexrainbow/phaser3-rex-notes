import {
    xyz2q,
    xyz2r
} from 'rexPlugins/utils/grid/hexagon/CubeTransfer.js';

var GetTriangleMap = function (board, type, height, out) {
    if (out === undefined) {
        out = [];
    }
    var mode = board.grid.mode;
    var rStart, rEnd
    for (var q = 0; q <= height; q++) {
        if (type === 0) {
            rStart = 0;
            rEnd = height - q;
        } else {
            rStart = height - q;
            rEnd = height;
        }

        for (var r = rStart; r <= rEnd; r++) {
            out.push({
                x: xyz2q(mode, q, r, -q - r),
                y: xyz2r(mode, q, r, -q - r)
            });
        }
    }
    return board.offset(out);
}

export default GetTriangleMap