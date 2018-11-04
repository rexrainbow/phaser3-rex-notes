const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;
const Percent = Phaser.Math.Percent;

var OnDragThumb = function (pointer, dragX, dragY) {
    var startPoint = this.getStartPoint();
    var endPoint = this.getEndPoint();
    var newValue;
    if (startPoint.y === endPoint.y) {
        var min = Math.min(startPoint.x, endPoint.x);
        var max = Math.max(startPoint.x, endPoint.x);
        newValue = Percent(dragX, min, max);
    } else if (startPoint.x === endPoint.x) {
        var min = Math.min(startPoint.y, endPoint.y);
        var max = Math.max(startPoint.y, endPoint.y);
        newValue = Percent(dragY, min, max);
    } else {
        var thumb = this.childrenMap.thumb;
        var dist;
        P1.x = dragX;
        P1.y = dragY;

        dist = DistanceBetween(P1.x, P1.y, thumb.x, thumb.y);
        P1 = RotateAroundDistance(P1, thumb.x, thumb.y, -this.axisRotation, dist);
        P1.y = thumb.y;
        dist = DistanceBetween(P1.x, P1.y, thumb.x, thumb.y);
        P1 = RotateAroundDistance(P1, thumb.x, thumb.y, this.axisRotation, dist);

        var min = Math.min(startPoint.x, endPoint.x);
        var max = Math.max(startPoint.x, endPoint.x);
        newValue = Percent(P1.x, min, max);
    }

    this.value = newValue;
}
export default OnDragThumb;