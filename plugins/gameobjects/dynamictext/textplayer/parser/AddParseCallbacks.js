import ParseColorTag from './OnParseColorTag.js';
import ParseStrokeColorTag from './OnParseStrokeColorTag.js';
import ParseBoldTag from './OnParseBoldTag.js';
import ParseItalicTag from './OnParseItalicTag.js';
import ParseFontSizeTag from './OnParseFontSizeTag.js';
import ParseOffsetYTag from './OnParseOffsetYTag.js';
import ParseShadowColorTag from './OnParseShadowColorTag.js';
import ParseTypingSpeedTag from './OnParseTypingSpeedTag.js';
import ParseSoundEffectTag from './OnParseSoundEffectTag.js';
import ParseWaitTag from './OnParseWaitTag.js';
import ParseCustomTag from './OnParseCustomTag.js';
import ParseNewLineTag from './OnParseNewLineTag.js';
import ParseContent from './OnParseContent.js';

const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseOffsetYTag, ParseShadowColorTag,
    ParseTypingSpeedTag, ParseSoundEffectTag, ParseWaitTag, ParseCustomTag,
    ParseNewLineTag, ParseContent
];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;