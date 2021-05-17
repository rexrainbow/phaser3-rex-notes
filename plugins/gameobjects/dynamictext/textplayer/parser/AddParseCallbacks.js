import ParseColorTag from './textstyle/OnParseColorTag.js';
import ParseStrokeColorTag from './textstyle/OnParseStrokeColorTag.js';
import ParseBoldTag from './textstyle/OnParseBoldTag.js';
import ParseItalicTag from './textstyle/OnParseItalicTag.js';
import ParseFontSizeTag from './textstyle/OnParseFontSizeTag.js';
import ParseOffsetYTag from './textstyle/OnParseOffsetYTag.js';
import ParseShadowColorTag from './textstyle/OnParseShadowColorTag.js';
import ParseImageTag from './image/OnParseImageTag.js';
import ParseTypingSpeedTag from './typing/OnParseTypingSpeedTag.js';
import ParsePlaySoundEffectTag from './soundeffect/OnParsePlaySoundEffectTag.js';
import ParseFadeInSoundEffectTag from './soundeffect/OnParseFadeInSoundEffectTag.js';
import ParseFadeOutSoundEffectTag from './soundeffect/OnParseFadeOutSoundEffectTag.js';
import ParseSetSoundEffectVolumeTag from './soundeffect/OnParseSetSoundEffectVolumeTag.js';
import ParsePlayBackgroundMusicTag from './backgroundmusic/OnParsePlayBackgroundMusicTag.js';
import ParseFadeInBackgroundMusicTag from './backgroundmusic/OnParseFadeInBackgroundMusicTag.js';
import ParseFadeOutBackgroundMusicTag from './backgroundmusic/OnParseFadeOutBackgroundMusicTag.js';
import ParseCrossFadeBackgroundMusicTag from './backgroundmusic/OnParseCrossFadeBackgroundMusicTag.js';
import ParsePauseBackgroundMusicTag from './backgroundmusic/OnParsePauseBackgroundMusicTag.js';
import ParseWaitTag from './wait/OnParseWaitTag.js';
import ParseAddSpriteTag from './sprites/OnParseAddSpriteTag.js';
import ParseSetSpritePropertyTag from './sprites/OnParseSetSpritePropertyTag.js';
import ParseEaseSpritePropertyTag from './sprites/OnParseEaseSpritePropertyTag.js';
import ParseCustomTag from './custom/OnParseCustomTag.js';
import ParseNewLineTag from './content/OnParseNewLineTag.js';
import ParseContent from './content/OnParseContent.js';

const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseOffsetYTag, ParseShadowColorTag, ParseImageTag,
    ParseTypingSpeedTag,
    ParsePlaySoundEffectTag, ParseFadeInSoundEffectTag, ParseFadeOutSoundEffectTag, ParseSetSoundEffectVolumeTag,
    ParsePlayBackgroundMusicTag, ParseFadeInBackgroundMusicTag, ParseFadeOutBackgroundMusicTag, ParseCrossFadeBackgroundMusicTag, ParsePauseBackgroundMusicTag,
    ParseWaitTag,
    ParseAddSpriteTag, ParseSetSpritePropertyTag, ParseEaseSpritePropertyTag,
    ParseCustomTag,
    ParseNewLineTag, ParseContent
];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;