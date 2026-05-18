import SplitText from './SplitText';
import TagTextToProp from './TagTextToProp';
import PropToContextStyle from './PropToContextStyle'
import PropToTagText from './PropToTagText';
import { GetTagRegex, SetDelimiters } from './TagRegex';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Parser {
    delimiters: any;
    tagRegex: any;

    constructor(style?: any) {
        var delimiters = GetValue(style, 'delimiters', '[]');
        this.tagRegex = GetTagRegex(delimiters);
        this.delimiters = delimiters;
    }

    getStrokeThinkness(defaultStyle?: any, prop?: any) {
        var strokeThickness;
        if (prop.hasOwnProperty('stroke')) {
            strokeThickness = defaultStyle.strokeThickness;
        } else {
            strokeThickness = 0;
        }
        return strokeThickness;
    }

    getLetterSpacing(defaultStyle?: any, prop?: any) {
        var letterSpacing;
        if (prop.hasOwnProperty('spacing')) {
            letterSpacing = prop.spacing;
        } else {
            letterSpacing = defaultStyle.letterSpacing;
        }
        return letterSpacing;
    }

    setDelimiters(delimiterLeft?: any, delimiterRight?: any) {
        if (SetDelimiters(delimiterLeft, delimiterRight)) {
            this.tagRegex = GetTagRegex();
        }
        return this;
    }

}

var methods = {
    splitText: SplitText,
    tagTextToProp: TagTextToProp,
    propToContextStyle: PropToContextStyle,
    propToTagText: PropToTagText,
}

Object.assign(
    Parser.prototype,
    methods
);

export default Parser;