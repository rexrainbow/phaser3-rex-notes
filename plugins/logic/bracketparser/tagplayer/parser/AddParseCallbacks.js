import ParseAddSpriteTag from './sprites/OnParseAddSpriteTag.js';
import ParseRemoveAllSpriteTag from './sprites/OnParseRemoveAllSpritesTag.js';
import ParseSetTextureTag from './sprites/OnParseSetTextureTag.js';
import ParsePlayAnimationTag from './sprites/OnParsePlayAnimationTag.js';
import ParseChainAnimationTag from './sprites/OnParseChainAnimationTag.js';
import ParsePauseAnimationTag from './sprites/OnParsePauseAnimationTag.js';
import ParseSetSpritePropertyTag from './sprites/OnParseSetSpritePropertyTag.js';
import ParseEaseSpritePropertyTag from './sprites/OnParseEaseSpritePropertyTag.js';

const ParseCallbacks = [

    ParseAddSpriteTag, ParseRemoveAllSpriteTag,
    ParseSetTextureTag, ParsePlayAnimationTag, ParseChainAnimationTag, ParsePauseAnimationTag,
    ParseSetSpritePropertyTag, ParseEaseSpritePropertyTag,   

];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;