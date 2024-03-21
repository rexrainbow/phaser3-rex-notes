import ParseColorTag from './OnParseColorTag.js';
import OnParseBackgroundColorTag from './OnParseBackgroundColorTag.js';
import OnParseBoldTag from './OnParseBoldTag.js';
import OnParseItalicTag from './OnParseItalicTag.js';
import OnParseSizeTag from './OnParseSizeTag.js';
import OnParseUnderlineTag from './OnParseUnderlineTag.js';
import OnParseContent from './OnParseContent.js';

var ParseHandlers = [
    ParseColorTag,
    OnParseBackgroundColorTag,
    OnParseBoldTag,
    OnParseItalicTag,
    OnParseSizeTag,
    OnParseUnderlineTag,
    OnParseContent
]

export default ParseHandlers;