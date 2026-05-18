import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseShakeCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.shake';
    parser
        .on(`+${tagName}`, function(duration?: any, intensity?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                // name
                PlayShakeEffect,        // callback
                [duration, intensity],  // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PlayShakeEffect = function(params?: any) {
    // this: textPlayer
    this.cameraTarget.shake(...params);
}

export default OnParseShakeCameraTag;