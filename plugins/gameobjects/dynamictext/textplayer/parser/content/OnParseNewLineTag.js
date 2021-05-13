import AppendTextBase from '../../../dynamictext/methods/AppendText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseBoldTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.r', 'r');
    parser
        .on(`+${tagName}`, function () {
            AppendTextBase.call(textPlayer, '\n');
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {            
            parser.skipEvent();
        })
}

export default OnParseBoldTag;