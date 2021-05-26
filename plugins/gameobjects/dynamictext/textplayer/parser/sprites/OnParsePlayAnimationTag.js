import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsPlayAnimationTag = function (tags, prefix) {
    // sprite.name.play 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'play');
}

var IsStopAnimationTag = function (tags, prefix) {
    // sprite.name.stop 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'stop');
}

var OnParsePlayAnimationTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.play=key], or [sprite.name.play=key0,key1,...]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            AppendCommandBase.call(textPlayer,
                'sprite.play',   // name
                PlayAnimation,   // callback
                [name, keys],     // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.stop]
            var tags = tag.split('.');
            var name;
            if (IsStopAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.stop',   // name
                StopAnimation,   // callback
                name,            // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite.name.play]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.stop',    // name
                StopAnimation,      // callback
                name,              // params
                textPlayer,        // scope
            );
            parser.skipEvent();
        })
}

var PlayAnimation = function (params) {
    var name = params[0];
    var keys = params[1];
    var key = keys.shift();

    // this: textPlayer
    this.spriteManager.playAnimation(name, key);
    if (keys.length > 0) {
        this.spriteManager.chainAnimation(name, keys);
    }
}

var StopAnimation = function (name) {
    // this: textPlayer
    this.spriteManager.stopAnimation(name);
}

export default OnParsePlayAnimationTag;