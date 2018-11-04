const Linear = Phaser.Math.Linear;

var UpdateThumb = function (t) {
    if (t === undefined) {
        t = this.value;
    }
    var startPoint = this.getStartPoint();
    var endPoint = this.getEndPoint();
    var thumb = this.childrenMap.thumb;
    thumb.x = Linear(startPoint.x, endPoint.x, t);
    thumb.y = Linear(startPoint.y, endPoint.y, t);
    this.resetChildState(thumb);
    return this;
}

export default UpdateThumb;