import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseFlashCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.flash';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                       // name
                PlayFlashEffect,               // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFlashEffect = function(params?: any) {
    // this: textPlayer
    this.cameraTarget.flash(...params);
}

export default OnParseFlashCameraTag;