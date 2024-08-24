import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import Methods from './method/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextTruncator extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._text = undefined;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setSymbol(GetValue(o, 'symbol', '...'));
        this.setMaxWidth(GetValue(o, 'maxWidth'));
        this.setMaxHeight(GetValue(o, 'maxHeight'));
        this.setText(GetValue(o, 'text'))
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
        return this;
    }

    setMaxWidth(width) {
        this.maxWidth = width;
        return this;
    }

    setMaxHeight(height) {
        this.maxHeight = height;
        return this;
    }

    set text(value) {
        this.setText(value);
    }

    get text() {
        return this._text;
    }

}

Object.assign(
    TextTruncator.prototype,
    Methods
)

export default TextTruncator;