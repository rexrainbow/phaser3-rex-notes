import PointerTest from '../../../utils/input/PointerTest';

var IsInTouching = function(pointer?: any) {
    if (!this.visible) {
        return false;
    }

    return PointerTest(this, pointer, MainTest);
}

var MainTest = function(miniboard?: any, x?: any, y?: any) {
    miniboard.worldXYToChess(x, y, globChessArray);
    var isHit = (globChessArray.length > 0);
    globChessArray.length = 0;
    return isHit;
}

var globChessArray = [];

export default IsInTouching;