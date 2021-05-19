import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsSetPropertyTag = function (tags, prefix) {
    // sprite.name.prop
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseSetSpritePropertyTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    parser
        .on(`+`, function (tag, value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if (IsSetPropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.set',                   // name
                SetProperty,                    // callback
                [name, property, value],        // params
                textPlayer,                     // scope
            );
            parser.skipEvent();
        })
}

var SetProperty = function (params) {
    var name = params[0];
    var property = params[1];
    var value = params[2];
    this.spriteManager.setProperty(name, property, value);  // this: textPlayer
}

export default OnParseSetSpritePropertyTag;