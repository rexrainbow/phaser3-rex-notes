import ParseWaitTag from './wait/OnParseWaitTag.js';
import ParseAddSpriteTag from './sprites/OnParseAddSpriteTag.js';
import ParseRemoveAllSpriteTag from './sprites/OnParseRemoveAllSpritesTag.js';
import ParseSetTextureTag from './sprites/OnParseSetTextureTag.js';
import ParsePlayAnimationTag from './sprites/OnParsePlayAnimationTag.js';
import ParseChainAnimationTag from './sprites/OnParseChainAnimationTag.js';
import ParsePauseAnimationTag from './sprites/OnParsePauseAnimationTag.js';
import ParseSetSpritePropertyTag from './sprites/OnParseSetSpritePropertyTag.js';
import ParseEaseSpritePropertyTag from './sprites/OnParseEaseSpritePropertyTag.js';

const ParseCallbacks = [

    ParseWaitTag,

    ParseAddSpriteTag, ParseRemoveAllSpriteTag,
    ParseSetTextureTag, ParsePlayAnimationTag, ParseChainAnimationTag, ParsePauseAnimationTag,
    ParseSetSpritePropertyTag, ParseEaseSpritePropertyTag,   

];

var AddParseCallbacks = function (tagPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](tagPlayer, parser, config);
    }
}

export default AddParseCallbacks;