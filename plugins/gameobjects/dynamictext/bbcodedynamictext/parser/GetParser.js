import BracketParser from '../../../../logic/bracketparser/BracketParser.js';
import ParseColorTag from './OnParseColorTag.js';
import ParseStrokeColorTag from './OnParseStrokeColorTag.js';
import ParseBoldTag from './OnParseBoldTag.js';
import ParseItalicTag from './OnParseItalicTag.js';
import ParseFontSizeTag from './OnParseFontSizeTag.js';
import ParseContent from './OnParseContent.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const ParseCallbacks = [
    ParseColorTag, ParseStrokeColorTag,
    ParseBoldTag, ParseItalicTag,
    ParseFontSizeTag,
    ParseContent
];
var GetParser = function (dynamicText, config) {
    var delimiters = GetValue(config, 'delimiters', '[]');
    var parser = new BracketParser({
        delimiters: delimiters
    });

    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](dynamicText, parser);
    }

    return parser;
}

export default GetParser;