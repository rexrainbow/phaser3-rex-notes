import Blitter from '../../blitter/Blitter.js';
import Methods from './methods/Methods.js';
import CharacterDataManager from './chardatamanager/CharacterDataManager.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Text extends Blitter {
    constructor(scene, x, y, font, text, config, type, parser) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            font = GetValue(config, 'font', '');
            text = GetValue(config, 'text', '');
        }

        super(scene, x, y);
        this.type = type;

        this._text = '';
        this.characterDataManager = new CharacterDataManager();

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
    Text.prototype,
    Methods
);

export default Text;