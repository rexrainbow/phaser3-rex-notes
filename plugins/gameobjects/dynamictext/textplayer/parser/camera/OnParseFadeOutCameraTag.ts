import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseFadeOutCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.fadeout';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                       // name
                PlayFadeOutEffect,             // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeOutEffect = function(params?: any) {
    // this: textPlayer
    this.cameraTarget.fadeOut(...params);
}

export default OnParseFadeOutCameraTag;