import AppendTextBase from '../../dynamictext/methods/AppendText.js';

var OnParseContent = function (dynamicText, parser) {
    parser
        .on('content', function (content) {
            AppendTextBase.call(dynamicText, content);
            parser.emit('post-content');
        })
}

export default OnParseContent;