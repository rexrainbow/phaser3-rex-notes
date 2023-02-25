import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import TextTranslation from './texttranslation.js';

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        TextTranslation.setI18Next(i18next);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initI18Next(config) {
        i18next.use(Backend).init(config);
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