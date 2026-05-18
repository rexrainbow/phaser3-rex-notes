import AppendTextBase from '../../../dynamictext/methods/AppendText';

var OnParseContent = function(textPlayer?: any, parser?: any, config?: any) {
    parser
        .on('content', function(content?: any) {
            if (parser.contentOutputEnable) {
                AppendTextBase.call(textPlayer, content);
            } else {
                var startTag = `+${parser.lastTagStart}`;
                textPlayer.emit(`parser.${startTag}#content`, parser, content);
            }
        })
}

export default OnParseContent;