import AppendTextBase from '../../../dynamictext/methods/AppendText.js';

var OnParseContent = function (textPlayer, parser, config) {
    parser
        .on('content', function (content) {
            AppendTextBase.call(textPlayer, content);
        })
}

export default OnParseContent;