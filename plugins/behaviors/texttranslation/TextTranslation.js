import ComponentBase from '../../utils/componentbase/ComponentBase.js';

var i18next;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextTranslation extends ComponentBase {
    static setI18Next(obj) {
        i18next = obj;
    }

    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);

        this.onLanguageChanged = this.updateText.bind(this);
        i18next.on('languageChanged', this.onLanguageChanged);
    }

    resetFromJSON(o) {
        this.setSetTextCallback(GetValue(o, 'setText', DefaultSetTextCallback));
        this.setInterpolations(GetValue(o, 'interpolations'));
        this.setTranslationKey(GetValue(o, 'translationKey', ''));
        if (GetValue(o, 'updateText', true)) {
            this.updateText();
        }
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

    setInterpolations(interpolations) {
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
            var data = key;
            for (key in data) {
                this.interpolations[key] = data[key];
            }
        }
        return this;
    }

    setTranslationKey(key) {
        this.translationKey = key;
        return this;
    }

    updateText() {
        var text = i18next.t(this.translationKey, this.interpolations);
        this.setTextCallback(this.parent, text);
        return this;
    }

}

var DefaultSetTextCallback = function (gameObject, text) {
    gameObject.setText(text);
}

export default TextTranslation;