import ComponentBase from '../../utils/componentbase/ComponentBase';
import Methods from './method/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TextTruncator extends ComponentBase {
    enable: any;

    _text: any;
    maxHeight: any;
    maxWidth: any;
    parent: any;
    setText: any;
    symbol: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._text = undefined;

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setSymbol(GetValue(o, 'symbol', '...'));
        this.setMaxWidth(GetValue(o, 'maxWidth'));
        this.setMaxHeight(GetValue(o, 'maxHeight'));
        this.setText(GetValue(o, 'text'))
    }

    setEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setSymbol(symbol?: any) {
        this.symbol = symbol;
        return this;
    }

    setMaxWidth(width?: any) {
        this.maxWidth = width;
        return this;
    }

    setMaxHeight(height?: any) {
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