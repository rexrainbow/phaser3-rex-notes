import AppendImageBase from '../../../dynamictext/methods/AppendImage';

var OnParseImageTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'img';
    parser
        .on(`+${tagName}`, function(name?: any) {
            var imgData = textPlayer.imageManager.get(name);
            if (imgData?: any) {
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
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseImageTag;