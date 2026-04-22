import AppendImageBase from '../../../dynamictext/methods/AppendImage.js';

var OnParseImageTag = function (textPlayer, parser, config) {
    var tagName = 'img';
    parser
        .on(`+${tagName}`, function (name) {
            var imgData = textPlayer.imageManager.get(name);
            if (imgData) {
                var tintMode = imgData.tintMode;
                AppendImageBase.call(textPlayer,
                    imgData.key, imgData.frame,
                    {
                        width: imgData.width,
                        hieght: imgData.height,
                        leftSpace: imgData.left,
                        rightSpace: imgData.right,
                        color: (tintMode !== undefined) ? textPlayer.textStyle.color : undefined,
                        tintMode: tintMode,
                    }
                )
            }
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseImageTag;
