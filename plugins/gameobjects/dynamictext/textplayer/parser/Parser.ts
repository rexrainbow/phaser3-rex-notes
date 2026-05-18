import BracketParser from '../../../../bracketparser';
import AddParseCallbacks from './AddParseCallbacks';
import PreProcessSource from './PreProcessSource';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Parser extends BracketParser {
    commentLineStart: any;
    contentOutputEnable: any;

    constructor(textPlayer?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('delimiters')) {
            config.delimiters = '[]';
        }
        super(config);

        AddParseCallbacks(textPlayer, this, config);

        this.setCommentLineStartSymbol(GetValue(config, 'comment', '//'));
        this.setContentOutputEnable();
    }

    setCommentLineStartSymbol(symbol?: any) {
        this.commentLineStart = symbol;
        return this;
    }

    setContentOutputEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.contentOutputEnable = enable;
        return this;
    }

    start(source?: any) {
        super.start(PreProcessSource(this, source));
        return this;
    }
}

export default Parser;