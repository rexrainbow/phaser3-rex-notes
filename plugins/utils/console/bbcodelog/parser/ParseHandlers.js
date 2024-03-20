import ParseColorTag from './ParseColorTag.js';
import ParseBackgroundColorTag from './ParseBackgroundColorTag.js';
import ParseBoldTag from './ParseBoldTag.js';
import ParseItalicTag from './ParseItalicTag.js';
import ParseSizeTag from './ParseSizeTag.js';
import ParseUnderlineTag from './ParseUnderlineTag.js';
import ParseContent from './ParseContent.js';

var ParseHandlers = [
    ParseColorTag,
    ParseBackgroundColorTag,
    ParseBoldTag,
    ParseItalicTag,
    ParseSizeTag,
    ParseUnderlineTag,
    ParseContent
]

export default ParseHandlers;