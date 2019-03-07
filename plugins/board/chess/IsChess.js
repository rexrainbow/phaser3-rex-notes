import IsUID from './IsUID.js'

var IsChess = function (chess) {
    if (IsUID(chess)) { // number or string
        return false;
    } else {
        return chess && (!!chess.rexChess);
    }
}

export default IsChess;