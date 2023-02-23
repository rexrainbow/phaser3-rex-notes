import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import i18next from 'i18next';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextTranslation extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._source = '';
        this.resetFromJSON(config);

        this.onLanguageChanged = this.updateText.bind(this);
        i18next.on('languageChanged', this.onLanguageChanged);
    }

    resetFromJSON(o) {
        this.setSetTextCallback(GetValue(o, 'setText', DefaultSetTextCallback));
        this.setInterpolation(GetValue(o, 'interpolations'));
        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        i18next.off('languageChanged', this.onLanguageChanged);

        super.shutdown(fromScene);
    }

    setSetTextCallback(callback) {
        this.setTextCallback = callback;
        return this;
    }

    setInterpolation(interpolations) {
        if (interpolations === undefined) {
            interpolations = {};
        }

        this.interpolations = interpolations;
        return this;
    }

    updateInterpolation(key, value) {
        if (typeof (key) === 'string') {
            this.interpolations[key] = value;
        } else {
            Object.assign(this.interpolations, key);
        }
        return this;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        value = value.toString() || ''
        this._source = value;

        var text = i18next.t(value, this.interpolations);
        this.setTextCallback(this.parent, text);
    }

    setText(txt) {
        this.source = txt;
        return this;
    }

    updateText() {
        this.setText(this.source);
        return this;
    }

}

var DefaultSetTextCallback = function (gameObject, text) {
    gameObject.setText(text);
}

export default TextTranslation;