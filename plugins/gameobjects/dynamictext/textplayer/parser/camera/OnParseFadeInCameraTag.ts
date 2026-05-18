import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseFadeInCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.fadein';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                       // name
                PlayFadeInEffect,              // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeInEffect = function(params?: any) {
    // this: textPlayer
    this.cameraTarget.fadeIn(...params);
}

export default OnParseFadeInCameraTag;