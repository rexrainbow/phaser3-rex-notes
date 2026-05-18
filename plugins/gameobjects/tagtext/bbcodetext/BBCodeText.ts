import Text from '../textbase/Text';
import ParserClass from './parser/Parser';

class BBCodeText extends Text {
    parser: any;

    constructor(scene?: any, x?: any, y?: any, text?: any, style?: any) {
        var parser = new ParserClass(style);
        super(scene, x, y, text, style, 'rexBBCodeText', parser);
    }

    setDelimiters(delimiterLeft?: any, delimiterRight?: any) {
        this.parser.setDelimiters(delimiterLeft, delimiterRight);
        return this;
    }
}

export default BBCodeText;