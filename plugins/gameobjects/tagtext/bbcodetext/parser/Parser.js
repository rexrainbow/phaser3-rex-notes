import SplitText from './SplitText.js';
import TagTextToProp from './TagTextToProp.js';
import PropToContextStyle from './PropToContextStyle.js'
import PropToTagText from './PropToTagText.js';

class Parser {
    getStrokeThinkness(defaultStyle, prop) {
        var strokeThickness;
        if (prop.hasOwnProperty('stroke')) {
            strokeThickness = defaultStyle.strokeThickness;
        } else {
            strokeThickness = 0;
        }
        return strokeThickness;
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