import { Math as PhaserMath } from 'phaser';
const DegToRad = PhaserMath.DegToRad;

var OnParseRotateCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.rotate';
    parser
        .on(`+${tagName}`, function(value?: any) {
            tagPlayer.cameraTarget.setRotation(DegToRad(value));

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function(value?: any, duration?: any, ease?: any) {
            value = DegToRad(value);
            tagPlayer.cameraTarget.rotateTo(DegToRad(value), false, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseRotateCameraTag;