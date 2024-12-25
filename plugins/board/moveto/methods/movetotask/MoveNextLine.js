import MoveAloneLine from './MoveAloneLine.js';

var MoveNextLine = function () {
    var nextlines = this.moveToTask.nextlines;
    if (!nextlines) {
        return false;
    }
    if (nextlines.length === 0) {
        return false;
    }
    // has next line
    MoveAloneLine.apply(this, nextlines[0]);
    nextlines.length = 0;
    return true;
}

export default MoveNextLine;