import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseScrollCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.scroll', 'camera.scroll');
    parser
        .on(`+${tagName}`, function (x, y) {
            AppendCommandBase.call(textPlayer,
                'camera.scroll',  // name
                ScrollCamera,     // callback
                [x, y],           // params
                textPlayer,       // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (x, y, duration, ease) {
            AppendCommandBase.call(textPlayer,
                'camera.scroll.to',       // name
                ScrollToCamera,           // callback
                [x, y, duration, ease],   // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var ScrollCamera = function (params) {
    var x = params[0];
    var y = params[1];
    this.camera.setScroll(x, y);  // this: textPlayer
}

var ScrollToCamera = function (params) {
    var camera = this.camera;    // this: textPlayer
    var xSave = camera.scrollX;
    var ySave = camera.scrollY;

    var x = params[0];
    var y = params[1];
    camera.setScroll(x, y);
    x += camera.centerX;
    y += camera.centerY;
    camera.setScroll(xSave, ySave);

    var duration = params[2];
    var ease = params[3];
    // x,y in pan() is the centerX, centerY
    camera.pan(x, y, duration, ease);
}

export default OnParseScrollCameraTag;