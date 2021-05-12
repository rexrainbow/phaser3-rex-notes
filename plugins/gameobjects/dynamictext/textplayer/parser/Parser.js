import BracketParser from '../../../../logic/bracketparser/BracketParser.js';
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

const GetValue = Phaser.Utils.Objects.GetValue;
const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag, ParseOffsetYTag, ParseShadowColorTag,
    ParseTypingSpeedTag, ParseSoundEffectTag, ParseWaitTag, ParseCustomTag,
    ParseNewLineTag, ParseContent
];

class Parser extends BracketParser {
    constructor(textPlayer, config) {
        var delimiters = GetValue(config, 'delimiters', '[]');
        super({
            delimiters: delimiters
        });

        for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
            ParseCallbacks[i](textPlayer, this, config);
        }
    }

    start(source) {        
        // Replace \n to ''
        source = source.replace(/\n/g, '');
        // Use [r] to put \n
        super.start(source);
        return this;
    }
}

export default Parser;