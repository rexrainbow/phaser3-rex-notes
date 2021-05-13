import AppendImageBase from '../../../dynamictext/methods/AppendImage.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseImageTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.img', 'img');
    parser
        .on(`+${tagName}`, function (name) {
            var imgData = textPlayer.imageManager.get(name);
            AppendImageBase.call(textPlayer,
                imgData.key, imgData.frame,
                {
                    width: imgData.width,
                    hieght: imgData.height,
                    leftSpace: imgData.left,
                    rightSpace: imgData.right
                }
            )
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {

            parser.skipEvent();
        })
}

export default OnParseImageTag;