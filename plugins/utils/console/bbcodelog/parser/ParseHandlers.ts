import ParseColorTag from './OnParseColorTag';
import OnParseBackgroundColorTag from './OnParseBackgroundColorTag';
import OnParseBoldTag from './OnParseBoldTag';
import OnParseItalicTag from './OnParseItalicTag';
import OnParseSizeTag from './OnParseSizeTag';
import OnParseUnderlineTag from './OnParseUnderlineTag';
import OnParseShadowTag from './OnParseShadowTag';
import OnParseRoundBlockTag from './OnParseRoundBlockTag';
import OnParseFontFamilyTag from './OnParseFontFamilyTag';
import OnParseContent from './OnParseContent';

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