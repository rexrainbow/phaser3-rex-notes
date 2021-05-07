import BracketParser from '../../../../logic/bracketparser/BracketParser.js';
import ParseColorTag from './OnParseColorTag.js';
import ParseContent from './OnParseContent.js';

var GetParser = function (dynamicText, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.hasOwnProperty('delimiters')) {
        config.delimiters = '[]'
    }
    var parser = new BracketParser(config);

    ParseColorTag(dynamicText, parser);
    ParseContent(dynamicText, parser);

    return parser;
}

export default GetParser;