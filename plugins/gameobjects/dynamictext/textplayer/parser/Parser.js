import BracketParser from '../../../../logic/bracketparser/BracketParser.js';
import AddParseCallbacks from './AddParseCallbacks.js';

class Parser extends BracketParser {
    constructor(textPlayer, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('delimiters')) {
            config.delimiters = '[]';
        }
        super(config);

        AddParseCallbacks(textPlayer, this, config);
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