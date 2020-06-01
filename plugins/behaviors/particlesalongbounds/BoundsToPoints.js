const Rectangle = Phaser.Geom.Rectangle;
const GetValue = Phaser.Utils.Objects.GetValue;

var BoundsToPoints = function (gameObject, config) {
    if (globRect === undefined) {
        globRect = new Rectangle();
    }
    var w = gameObject.width,
        h = gameObject.height;
    globRect.setTo((-w / 2), (-h / 2), w, h);
    var stepRate = GetValue(config, 'stepRate', 10);
    var points = globRect.getPoints(0, stepRate);
    return points; // Return new point array
}

var globRect;

export default BoundsToPoints;
