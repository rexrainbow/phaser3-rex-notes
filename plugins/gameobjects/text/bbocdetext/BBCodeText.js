import Text from '../textbase/Text.js'
import parser from './Parser.js';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'rexBBCodeText', parser);
    }
}

export default BBCodeText;