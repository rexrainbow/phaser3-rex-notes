import DynamicText from '../dynamictext/DynamicText.js';
import GetParser from './parser/GetParser.js';
import TypeWriter from './typewriter/TypeWriter.js';
import Methods from './methods/Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextPlayer extends DynamicText {
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
        this.typeWriter = new TypeWriter(this, GetValue(config, 'type', undefined));
        this.setDefaultTypingSpeed(GetValue(config, 'type.speed', 250));

        if (content) {
            this.setText(content);
        }
    }

    setDefaultTypingSpeed(speed) {
        this.defaultTypingSpeed = speed;  // ms
        return this;
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;