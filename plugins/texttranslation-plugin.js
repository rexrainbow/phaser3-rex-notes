import Awaitloader from './awaitloader.js';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import TextTranslation from './texttranslation.js';

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        this.i18next = i18next;
        TextTranslation.setI18Next(i18next);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initI18Next(scene, config) {
        Awaitloader.call(scene.load, function (successCallback, failureCallback) {
            i18next.use(Backend).init(config, successCallback);
        })
        return this;
    }


    add(gameObject, config) {
        return new TextTranslation(gameObject, config);
    }

    changeLanguage(lng, onComplete) {
        i18next.changeLanguage(lng, onComplete);
        return this;
    }

    t(translationKey, interpolations) {
        return i18next.t(translationKey, interpolations);
    }
}

export default TextTranslationPlugin;