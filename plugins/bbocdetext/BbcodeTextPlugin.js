import Text from './../utils/text/Text.js';
import Parser from './Parser.js';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'BBCodeText', Parser);
    }
}

export default BBCodeText;