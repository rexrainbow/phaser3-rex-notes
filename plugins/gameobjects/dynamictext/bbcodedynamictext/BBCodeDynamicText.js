import DynamicText from '../dynamictext/DynamicText.js';
import GetParser from './parser/GetParser.js';
import Methods from './methods/Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class BBCodeDynamicText extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }
        if (config === undefined) {
            config = {};
        }

        // Don't set text in DynamicText's constructor
        var content = config.text;
        delete config.text;

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexBBCodeDynamicText'
        this.parser = GetParser(this, config);

        if (content) {
            this.setText(content);
        }
    }
}

Object.assign(
    BBCodeDynamicText.prototype,
    Methods
);

export default BBCodeDynamicText;