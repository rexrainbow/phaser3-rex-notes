import i18next from 'i18next';
import TextTranslation from './texttranslation.js';

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initI18Next(config) {
        i18next.init(config);
        return this;
    }

    changeLanguage(lng) {
        i18next.changeLanguage(lng);
        return this;
    }

    add(gameObject, config) {
        return new TextTranslation(gameObject, config);
    }

}

export default TextTranslationPlugin;