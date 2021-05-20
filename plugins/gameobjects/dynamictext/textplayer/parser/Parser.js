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
        var lines = source.split('\n');
        for (var i = 0, cnt = lines.length; i < cnt; i++) {
            lines[i] = lines[i].replace(/^ */g, '');
            // Replace line only has space to empty line
        }
        source = lines.join('');
        
        // Use [r] to put \n
        super.start(source);
        return this;
    }
}

export default Parser;