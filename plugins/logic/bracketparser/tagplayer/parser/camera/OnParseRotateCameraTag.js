const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

var OnParseRotateCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.rotate', 'camera.rotate');
    parser
        .on(`+${tagName}`, function (value) {
            tagPlayer.camera.setRotation(DegToRad(value));

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            value = DegToRad(value);
            tagPlayer.camera.rotateTo(DegToRad(value), false, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseRotateCameraTag;