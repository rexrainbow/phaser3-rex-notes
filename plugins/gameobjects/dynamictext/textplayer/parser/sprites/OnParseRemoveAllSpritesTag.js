import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseRemoveAllSpritesTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite]
            if (tag === prefix) {
                AppendCommandBase.call(textPlayer,
                    'sprite.removeall',    // name
                    RemoveAllSprites,      // callback
                    undefined,             // params
                    textPlayer,            // scope
                );
            } else {
                return;
            }

            parser.skipEvent();
        })
}

var RemoveAllSprites = function () {
    // this: textPlayer
    this.spriteManager.removeAll();
}

export default OnParseRemoveAllSpritesTag;