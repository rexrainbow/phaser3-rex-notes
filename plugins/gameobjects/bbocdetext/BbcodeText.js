import Text from '../../utils/text/Text';
import parser from './Parser.js';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'rexBBCodeText', parser);
    }
}

export default BBCodeText;