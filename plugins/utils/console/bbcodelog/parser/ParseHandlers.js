import ParseColorTag from './ParseColorTag.js';
import ParseSizeTag from './ParseSizeTag.js';
import ParseContent from './ParseContent.js';

var ParseHandlers = [
    ParseColorTag,
    ParseSizeTag,
    ParseContent
]

export default ParseHandlers;