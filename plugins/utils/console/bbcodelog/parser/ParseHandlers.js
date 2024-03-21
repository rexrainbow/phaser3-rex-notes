import ParseColorTag from './OnParseColorTag.js';
import OnParseBackgroundColorTag from './OnParseBackgroundColorTag.js';
import OnParseBoldTag from './OnParseBoldTag.js';
import OnParseItalicTag from './OnParseItalicTag.js';
import OnParseSizeTag from './OnParseSizeTag.js';
import OnParseUnderlineTag from './OnParseUnderlineTag.js';
import OnParseShadowTag from './OnParseShadowTag.js';
import OnParseRoundBlockTag from './OnParseRoundBlockTag.js';
import OnParseFontFamilyTag from './OnParseFontFamilyTag.js';
import OnParseContent from './OnParseContent.js';

var ParseHandlers = [
    ParseColorTag,
    OnParseBackgroundColorTag,
    OnParseBoldTag,
    OnParseItalicTag,
    OnParseSizeTag,
    OnParseUnderlineTag,
    OnParseShadowTag,
    OnParseRoundBlockTag,
    OnParseFontFamilyTag,
    OnParseContent
]

export default ParseHandlers;