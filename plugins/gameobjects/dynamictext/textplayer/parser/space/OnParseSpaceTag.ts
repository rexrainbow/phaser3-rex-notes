import AppendSpaceBase from '../../../dynamictext/methods/AppendSpace';

var OnParseImageTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'space';
    parser
        .on(`+${tagName}`, function(width?: any) {
            AppendSpaceBase.call(textPlayer,
                width
            )
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseImageTag;