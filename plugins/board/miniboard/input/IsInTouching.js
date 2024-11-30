import PointerTest from '../../../utils/input/PointerTest.js';

var IsInTouching = function (pointer) {
    if (!this.visible) {
        return false;
    }

    return PointerTest(this, pointer, MainTest);
}

var MainTest = function (miniboard, x, y) {
    miniboard.worldXYToChess(x, y, globChessArray);
    var isHit = (globChessArray.length > 0);
    globChessArray.length = 0;
    return isHit;
}

var globChessArray = [];

export default IsInTouching;