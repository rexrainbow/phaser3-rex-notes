import BracketParser from '../../bracketparser/BracketParser';
import AddParseCallbacks from './AddParseCallbacks';
import PreProcessSource from './PreProcessSource';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Parser extends BracketParser {
    commentLineStart: any;

    constructor(tagPlayer?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('delimiters')) {
            config.delimiters = '[]';
        }
        super(config);

        AddParseCallbacks(tagPlayer, this, config);

        this.setCommentLineStartSymbol(GetValue(config, 'comment', '//'));
    }

    setCommentLineStartSymbol(symbol?: any) {
        this.commentLineStart = symbol;
        return this;
    }

    start(source?: any) {
        super.start(PreProcessSource(this, source));
        return this;
    }
}

export default Parser;