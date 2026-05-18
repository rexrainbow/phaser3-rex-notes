import Blitter from '../blitterbase/BlitterBase';
import Methods from './methods/Methods';
import PenManager from './penmanager/PenManager';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class BitmapText extends Blitter {
    _fontSize: any;
    _text: any;
    fontData: any;
    fromAtlas: any;
    penManager: any;
    setFixedSize: any;
    setFont: any;
    setLetterSpacing: any;
    setPadding: any;
    setText: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, font?: any, text?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            font = GetValue(config, 'font', '');
            text = GetValue(config, 'text', '');
        }

        super(scene, x, y);
        this.type = 'rexBitmapText';

        this.fontData = undefined;
        this.fromAtlas = undefined;
        this._fontSize = 0;
        this._text = '';
        this.penManager = new PenManager(this, config);

        this.setFixedSize(GetValue(config, 'fixedWidth', 0), GetValue(config, 'fixedHeight', 0));
        this.setPadding(GetValue(config, 'padding', 0));
        this.setLetterSpacing(GetValue(config, 'letterSpacing', 0));


        this.setFont(font);

        this.setText(text);
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this.setText(text);
    }
}

Object.assign(
    BitmapText.prototype,
    Methods
);

export default BitmapText;