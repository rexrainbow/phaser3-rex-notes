import IsUID from './IsUID'

var IsChess = function(chess?: any) {
    if (IsUID(chess)) { // Number or string
        return false;
    } else {
        return chess && (!!chess.rexChess);
    }
}

export default IsChess;