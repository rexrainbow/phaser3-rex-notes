import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsChainAnimationTag = function (tags, prefix) {
    // sprite.name.chain 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'chain');
}

var OnParseChainAnimationTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsChainAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            AppendCommandBase.call(textPlayer,
                'sprite.chain',   // name
                ChainAnimation,   // callback
                [name, keys],     // params
                textPlayer,       // scope
            );
            parser.skipEvent();
        })
}

var ChainAnimation = function (params) {
    // this: textPlayer
    this.spriteManager.chainAnimation(...params);
}

export default OnParseChainAnimationTag;