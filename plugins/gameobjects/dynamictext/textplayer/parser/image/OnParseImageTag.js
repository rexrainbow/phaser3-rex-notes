import AppendImageBase from '../../../dynamictext/methods/AppendImage.js';

var OnParseImageTag = function (textPlayer, parser, config) {
    var tagName = 'img';
    parser
        .on(`+${tagName}`, function (name) {
            var imgData = textPlayer.imageManager.get(name);
            if (imgData) {
                AppendImageBase.call(textPlayer,
                    imgData.key, imgData.frame,
                    {
                        width: imgData.width,
                        hieght: imgData.height,
                        leftSpace: imgData.left,
                        rightSpace: imgData.right,
                        color: (imgData.tintFill) ? textPlayer.textStyle.color : undefined,
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