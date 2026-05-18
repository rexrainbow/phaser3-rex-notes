import {
    cube2cr
} from '../../utils/grid/hexagon/CubeTransfer';

var GetParallelogramMap = function(board?: any, type?: any, width?: any, height?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }
    var mode = board.grid.mode;
    switch (type?: any) {
        case 1:
            for (var s = 0; s <= width; s++) {
                for (var q = 0; q <= height; q++) {
                    out.push(cube2cr(mode, q, -q - s, s));
                }
            }
            break;
        case 2:
            for (var r = 0; r <= width; r++) {
                for (var s = 0; s <= height; s++) {
                    out.push(cube2cr(mode, -r - s, r, s));
                }
            }
            break;
        default: // case 0
            for (var q = 0; q <= width; q++) {
                for (var r = 0; r <= height; r++) {
                    out.push(cube2cr(mode, q, r, -q - r));
                }
            }
            break;
    }

    return out;
}
export default GetParallelogramMap;