import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var IsChainAnimationTag = function(tags?: any, goType?: any) {
    // goType.name.chain 
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'chain');
}

var OnParseChainAnimationTag = function(textPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    parser
        .on('+', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsChainAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }

            var keys = Array.prototype.slice.call(arguments, 1);
            AppendCommandBase.call(textPlayer,
                `${goType}.chain`,     // name
                ChainAnimation,        // callback
                [goType, name, keys],  // params
                textPlayer,            // scope
            );

            parser.skipEvent();
        })
}

var ChainAnimation = function(params?: any) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.chainAnimation(...args);
}

export default OnParseChainAnimationTag;