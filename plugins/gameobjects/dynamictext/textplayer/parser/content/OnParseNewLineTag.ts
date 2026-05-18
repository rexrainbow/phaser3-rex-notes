import AppendTextBase from '../../../dynamictext/methods/AppendText';

var OnParseNewLineTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'r';
    parser
        .on(`+${tagName}`, function() {
            AppendTextBase.call(textPlayer, '\n');
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseNewLineTag;