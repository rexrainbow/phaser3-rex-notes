var IsInside = function (tileX, tileY) {
    var result;
    if (this.infinityMode) {
        result = true;
    } else {
        result = (tileX >= 0) && (tileX < this.width) && (tileY >= 0) && (tileY < this.height);
    }
    return result;
}
export default IsInside;