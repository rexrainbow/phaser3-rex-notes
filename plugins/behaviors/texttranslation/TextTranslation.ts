import ComponentBase from '../../utils/componentbase/ComponentBase';

import { Utils as PhaserUtils } from 'phaser';
var i18next;
const GetValue = PhaserUtils.Objects.GetValue;

class TextTranslation extends ComponentBase {
    interpolation: any;
    isShutdown: any;
    onLanguageChanged: any;
    parent: any;
    setTextCallback: any;
    translationKey: any;

    static setI18Next(obj?: any) {
        i18next = obj;
    }

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);

        this.onLanguageChanged = this.updateText.bind(this);
        i18next.on('languageChanged', this.onLanguageChanged);
    }

    resetFromJSON(o?: any) {
        this.setSetTextCallback(GetValue(o, 'setText', DefaultSetTextCallback));
        this.setInterpolation(GetValue(o, 'interpolation'));
        this.setTranslationKey(GetValue(o, 'translationKey', ''));
        if (GetValue(o, 'updateText', true)) {
            this.updateText();
        }
        return this;
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        i18next.off('languageChanged', this.onLanguageChanged);
        this.interpolation = null;

        super.shutdown(fromScene);
    }

    setSetTextCallback(callback?: any) {
        this.setTextCallback = callback;
        return this;
    }

    setInterpolation(interpolation?: any) {
        this.interpolation = interpolation;
        return this;
    }

    updateInterpolation(key?: any, value?: any) {
        if (!this.interpolation) {
            this.interpolation = {};
        }

        if (typeof (key) === 'string') {
            this.interpolation[key] = value;
        } else {
            var data = key;
            for (key in data) {
                this.interpolation[key] = data[key];
            }
        }
        return this;
    }

    setTranslationKey(key?: any) {
        this.translationKey = key;
        return this;
    }

    updateText() {
        var text = i18next.t(this.translationKey, this.interpolation);
        this.setTextCallback(this.parent, text);
        return this;
    }

}

var DefaultSetTextCallback = function(gameObject?: any, text?: any) {
    gameObject.setText(text);
}

export default TextTranslation;